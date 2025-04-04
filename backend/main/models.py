from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('clerk', 'Clerk'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='admin')

    # Fix conflicts by setting related_name attributes
    groups = models.ManyToManyField(Group, related_name="custom_user_groups", blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name="custom_user_permissions", blank=True)

# Farm Type Model
class FarmType(models.Model):
    name = models.CharField(max_length=255, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name

# Crop Model
class Crop(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='crops/',null=True,blank=True)

    def __str__(self):
        return self.name

class Farmer(models.Model):
    name = models.CharField(max_length=255)
    national_id = models.CharField(max_length=20, unique=True)
    location = models.CharField(
        max_length=255,
        default='Harare'  # Default can be set to any town or leave empty
    )
    farm_type = models.ForeignKey(FarmType, on_delete=models.CASCADE)
    crop = models.ForeignKey(Crop, on_delete=models.CASCADE)

    def __str__(self):
        return self.name