from multiprocessing.spawn import prepare
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from rest_framework.response import Response
from base.models import Product,Order,OrderItem,ShippingAddress,OfficeProduct,OfficeOrder,OfficeOrderItem
from base.serializer import ProductSerializer,OrderSerializer,OfficeOrderSerializer,OfficeProductSerializer
from datetime import datetime
import csv
from django.http import HttpResponse
from django.utils import timezone
from base.admin import IsAdminOrWorker

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
            user = user,
            totalPrice=data['totalPrice']
        )
        
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url,
            )

            product.countInStock -= item.qty
            product.save()

        serializer = OrderSerializer(order,many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serialaizer = OrderSerializer(orders,many=True)
    return Response(serialaizer.data)

@api_view(['GET'])
@permission_classes([IsAdminOrWorker])
def getOrders(request):
    orders = Order.objects.all()
    serialaizer = OrderSerializer(orders,many=True)
    return Response(serialaizer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if IsAdminOrWorker or order.user == user :
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this order'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderItems(request, pk):
    data = request.data
    order = Order.objects.get(_id=pk)

    orderItems = data['orderItems']

    for item in orderItems:
        orderItem = OrderItem.objects.get(_id=item['orderItemId'])
        originalQTY = orderItem.qty 
        orderItem.qty = item['qty']
        orderItem.save()

        product = orderItem.product
        product.countInStock -= (orderItem.qty - originalQTY)
        product.save()

    # Recalculate the total price of the order based on the updated quantities
    order.totalPrice = sum(order_item.price * order_item.qty for order_item in order.orderItems)
    order.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminOrWorker])
def updateOrderToPaid(request,pk):
    order = Order.objects.get(_id=pk)
    order.isPaid = True
    order.paidAt = timezone.now()
    order.save()
    
    return Response('Order was Paid')

@api_view(['PUT'])
@permission_classes([IsAdminOrWorker])
def updateOrderToDelivered(request,pk):
    order = Order.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = timezone.now()
    order.save()
    
    return Response('Order was Delivered')

#Office

@api_view(['POST'])
@permission_classes([IsAdminUser])
def addOfficeOrderItems(request):
    user = request.user
    data = request.data
    
    orderItems = data['officeOrderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail':'No Order Items'},status=status.HTTP_400_BAD_REQUEST)
    else:
        order = OfficeOrder.objects.create(
            user = user,
        )

        for i in orderItems:
            product = OfficeProduct.objects.get(_id=i['officeProduct'])
            item = OfficeOrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                image=product.image.url,
            )

            product.countInStock -= item.qty
            product.save()

        serializer = OfficeOrderSerializer(order,many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getMyOfficeOrders(request):
    user = request.user
    orders = user.officeorder_set.all()
    serialaizer = OfficeOrderSerializer(orders,many=True)
    return Response(serialaizer.data)

@api_view(['GET'])
@permission_classes([IsAdminUser])
def getOfficeOrderById(request,pk):
    user = request.user
    try:
        order = OfficeOrder.objects.get(_id=pk)
        if user.is_staff:
            serializer = OfficeOrderSerializer(order,many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not authorized to view this order'},status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'},status=status.HTTP_400_BAD_REQUEST)

# Fix
def exportOrders(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="orders.csv"'
    writer = csv.writer(response)
    writer.writerow(['ID', 'Ordered At', 'Total Price', 'Is Paid',])
    orders = Order.objects.all().values_list('_id', 'createAt', 'totalPrice', 'isPaid')
    for order in orders:
        writer.writerow(order)
    return response

# Fix
def exportOrderItems(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="ordered_items.csv"'
    writer = csv.writer(response)
    writer.writerow(['Order ID', 'Product Name','QTY','Price'])
    orders = OrderItem.objects.all().values_list('order', 'name','qty','price')
    for order in orders:
        writer.writerow(order)
    return Response(writer)
