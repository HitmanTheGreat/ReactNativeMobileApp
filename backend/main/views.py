from rest_framework import viewsets
from .models import Crop, Farmer
from .serializers import CropGetSerializer, CropPostSerializer, FarmerGetSerializer, FarmerPostSerializer

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


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]