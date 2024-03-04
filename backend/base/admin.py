from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin
from django.contrib.auth.models import User
from .models import *
from rest_framework.permissions import BasePermission

class IsAdminOrWorker(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return user.is_authenticated and (user.is_staff or getattr(user, 'worker', None) and user.worker.is_worker)

# Register your models here.
class WorkerInline(admin.StackedInline):
    model = Worker
    can_delete = False

class UserAdmin(DefaultUserAdmin):
    inlines = (WorkerInline, )

# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Worker)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(OfficeProduct)
admin.site.register(OfficeOrder)
admin.site.register(OfficeOrderItem)

# admin.site.register(User)