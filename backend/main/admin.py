from django.contrib import admin
from .models import FarmType, Crop, Farmer, User

@admin.register(FarmType)
class FarmTypeAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']

@admin.register(Crop)
class CropAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'description']

@admin.register(Farmer)
class FarmerAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'national_id', 'location', 'farm_type', 'crop']

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'email', 'role']
