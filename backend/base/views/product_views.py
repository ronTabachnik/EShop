from gc import get_objects
from os import access
from django.db import router
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated,IsAdminUser
from base.admin import IsAdminOrWorker
from rest_framework.response import Response
from base.models import Product,OfficeProduct,Category
from base.serializer import ProductSerializer,OfficeProductSerializer,CategorySerializer

def get_default_category():
    # Retrieve or determine the default category, for example, the first category
    # You would implement your own logic here based on your application's requirements.
    default_category = Category.objects.first()  # Assuming Category model has a 'name' field

    return default_category

@api_view(['POST'])
def createCategories(request, category):
    category_instance, created = Category.objects.get_or_create(name=category)
    if created:
        serializer = CategorySerializer(category_instance)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"detail": "Category already exists."}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.values_list('name', flat=True)
    return Response({'categories': list(categories)})

@api_view(['GET'])
def getProductsByCategory(request, category):
    try:
        products = Product.objects.filter(catagory=category)
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'message': 'Category does not exist'}, status=400)
    
@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getProduct(request,pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminOrWorker])
def createProduct(request):
    user = request.user
    category = get_default_category()
        
    product = Product.objects.create(
        user=user,
        name="Sample Name",
        price=0,
        brand="Sample",
        countInStock=0,
        category=category,
        description=""
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminOrWorker])
def updateProduct(request,pk):
    data = request.data
    product = Product.objects.get(_id=pk)
    category = get_object_or_404(Category, name=data['category'])

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    user = request.user
    if user.is_staff:
        product.countInStock = data['countInStock']
    product.category = category
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request,pk):
    productForDeletion = Product.objects.get(_id=pk)
    productForDeletion.delete()
    return Response('Product was deleted')

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCategory(request,category):
    categoryForDeletion = Category.objects.get(name=category)
    categoryForDeletion.delete()
    return Response('Product was deleted')

#Office

@api_view(['GET'])
def getOfficeProducts(request):
    products = OfficeProduct.objects.all()
    serializer = OfficeProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getOfficeProduct(request,pk):
    product = OfficeProduct.objects.get(_id=pk)
    serializer = OfficeProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminOrWorker])
def createOfficeProduct(request):
    user = request.user
    product = OfficeProduct.objects.create(
        user=user,
        name="Office product",
        brand="Office brand",
        countInStock=0,
        catagory="Office category",
        description=""
    )
    serializer = OfficeProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminOrWorker])
def updateOfficeProduct(request,pk):
    data = request.data
    product = OfficeProduct.objects.get(_id=pk)

    product.name = data['name']
    product.brand = data['brand']
    user = request.user
    if user.is_staff:
        product.countInStock = data['countInStock']
    product.catagory = data['catagory']
    product.description = data['description']

    product.save()

    serializer = OfficeProductSerializer(product,many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteOfficeProduct(request,pk):
    productForDeletion = OfficeProduct.objects.get(_id=pk)
    productForDeletion.delete()
    return Response('Office Product was deleted')

@api_view(['POST'])
def updateImage(request):
    data = request.data
    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)
    product.image = request.FILES.get('image')
    product.save()
    return Response('Image was uploaded')