from email.policy import default
from unicodedata import name
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import Group
# Create your models here.
    
class Worker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_worker = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username
    
class Category(models.Model):
    name = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.name if self.name else 'Unnamed Category'
           
class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)  
    name = models.CharField(max_length=200,null=True,blank=True)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    brand = models.CharField(max_length=200,null=True,blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    # catagory = models.CharField(max_length=200,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    rating = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    numReviews = models.IntegerField(null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return self.name
    
    @property
    def category_name(self):
        return self.category.name if self.category else 'Not available'

class Review(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    rating = models.IntegerField(null=True,blank=True,default=0)
    comment = models.TextField(null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return str(self.rating)
    
class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    paymentMethod = models.CharField(max_length=200,null=True,blank=True)
    # taxPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    # shippingPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    totalPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered = models.BooleanField(default=False) 
    deliveredAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return str(self.createAt)

class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    qty = models.DecimalField(decimal_places=2,max_digits=4,null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    image = models.CharField(max_length=200,null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return str(self.name)

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order,on_delete=models.CASCADE,null=True,blank=True)
    address = models.CharField(max_length=200,null=True,blank=True)
    city = models.CharField(max_length=200,null=True,blank=True)
    postalCode = models.CharField(max_length=200,null=True,blank=True)
    country = models.CharField(max_length=200,null=True,blank=True)
    shippingPrice = models.DecimalField(max_digits=7,decimal_places=2,null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return str(self.address)

#Office

class OfficeProduct(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)  
    name = models.CharField(max_length=200,null=True,blank=True)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    brand = models.CharField(max_length=200,null=True,blank=True)
    catagory = models.CharField(max_length=200,null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    countInStock = models.IntegerField(null=True,blank=True,default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return self.name

class OfficeOrder(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    createAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return str(self.createAt)

class OfficeOrderItem(models.Model):
    officeProduct = models.ForeignKey(OfficeProduct,on_delete=models.SET_NULL,null=True)
    officeOrder = models.ForeignKey(OfficeOrder,on_delete=models.SET_NULL,null=True)
    name = models.CharField(max_length=200,null=True,blank=True)
    qty = models.IntegerField(null=True,blank=True,default=0)
    image = models.CharField(max_length=200,null=True,blank=True)
    _id = models.AutoField(primary_key=True,editable=False)
    
    def __str__(self):
        return str(self.name)