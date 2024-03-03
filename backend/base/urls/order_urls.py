from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add/',views.addOrderItems,name='orders-add'),
    path('myorders/',views.getMyOrders,name='myorders'),
    path('',views.getOrders,name='orders'),
    path('export/orders',views.exportOrders,name='export-orders'),
    path('export/orderItems',views.exportOrderItems,name='export-order-items'),
    path('<str:pk>/deliver/',views.updateOrderToDelivered,name='order-deliver'),
    path('<str:pk>/pay/',views.updateOrderToPaid,name='order-pay'),
    path('<str:pk>/',views.getOrderById,name='user-order'),
    path('<str:pk>/edit',views.updateOrderItems,name='edit'),
    
    

]
