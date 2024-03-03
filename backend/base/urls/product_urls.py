from django.urls import path
from base.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name="products"),
    path('categories',views.getCategories, name="categories"),
    path('categories/create/<str:category>/',views.createCategories, name="crate-categories"),
    path('categories/delete/<str:category>/',views.deleteCategory, name="delete-categories"),
    path('create/', views.createProduct, name="create-product"),
    path('upload/', views.updateImage, name="image-upload"),
    path('<str:pk>', views.getProduct, name="product"),
    path('update/<str:pk>/', views.updateProduct, name="update-product"),
    path('delete/<str:pk>/', views.deleteProduct, name="delete-product"),
    path('category/<str:category>/', views.getProductsByCategory, name="products-by-category"),
]