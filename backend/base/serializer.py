from dataclasses import field
import django
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from .models import Product, Order,OrderItem,ShippingAddress, OfficeProduct,OfficeOrder,OfficeOrderItem,Worker,Category
from rest_framework_simplejwt.tokens import RefreshToken

# User = get_user_model()
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    class Meta:
        model = Product
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Order
        fields = '__all__'
    
    def get_orderItems(self,obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items,many=True)
        return serializer.data

    def get_shippingAddress(self,obj):
        try:
            address = ShippingAddressSerializer(obj.shippingaddress,many=False).data
        except:
            address = False
        return address

    def get_user(self,obj):
        user = obj.user
        serializer = UserSerializer(user,many=False)
        return serializer.data

class UserSerializer(serializers.ModelSerializer):
    
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    is_worker = serializers.SerializerMethodField(read_only=True)
        
    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin', 'is_worker']
                
    def get_isAdmin(self,obj):
        return obj.is_staff   

    def get_is_worker(self, obj):
        if hasattr(obj, 'worker'):
            return obj.worker.is_worker
        return False   
    
    def get__id(self,obj):
        return obj.id    
    
    def get_name(self,obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name
    
class UserSerializerWithToken(UserSerializer): 
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id','_id','username','email','name','isAdmin','is_worker', 'token']
        
    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

#Office

class OfficeProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeProduct
        fields = '__all__'

class OfficeOrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficeOrderItem
        fields = '__all__'

class OfficeOrderSerializer(serializers.ModelSerializer):
    orderItems = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = OfficeOrder
        fields = '__all__'
    
    def get_officeOrderItems(self,obj):
        items = obj.officeorderitem_set.all()
        serializer = OfficeOrderItemSerializer(items,many=True)
        return serializer.data

    def get_officeUser(self,obj):
        user = obj.user
        serializer = UserSerializer(user,many=False)
        return serializer.data