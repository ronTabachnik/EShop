from django.urls import path
from base.views import order_views as views

urlpatterns = [
    path('add/',views.addOfficeOrderItems,name='office-orders-add'),
    path('myorders/',views.getMyOfficeOrders,name='myofficeorders'),

    path('<str:pk>/',views.getOfficeOrderById,name='user-office-order'),

]
