from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('',views.getOfficeProducts, name="office-products"),
    path('create/',views.createOfficeProduct, name="create-office-product"),
    
    path('<str:pk>',views.getOfficeProduct, name="office-product"),
    path('update/<str:pk>/',views.updateOfficeProduct, name="update-office-product"),
    path('delete/<str:pk>/',views.deleteOfficeProduct, name="delete-office-product"),
]
