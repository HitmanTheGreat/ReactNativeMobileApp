from rest_framework import viewsets
from .models import Crop, Farmer, FarmType, User
from .serializers import (
    CropGetSerializer, CropPostSerializer,
    FarmerGetSerializer, FarmerPostSerializer,
    FarmTypeGetSerializer,
    UserGetSerializer
)

class CropViewSet(viewsets.ModelViewSet):
    queryset = Crop.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return CropGetSerializer
        return CropPostSerializer

class FarmerViewSet(viewsets.ModelViewSet):
    queryset = Farmer.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return FarmerGetSerializer
        return FarmerPostSerializer

class FarmTypeViewSet(viewsets.ModelViewSet):
    queryset = FarmType.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return FarmTypeGetSerializer
        return FarmTypeGetSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return UserGetSerializer
        return UserGetSerializer