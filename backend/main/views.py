from rest_framework import viewsets
from .models import Crop, Farmer, FarmType, User
from .serializers import (
    CropGetSerializer, CropPostSerializer,
    FarmerGetSerializer, FarmerPostSerializer,
    FarmTypeGetSerializer,
    UserGetSerializer
)
# views.py
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Blacklist the refresh token to invalidate the token
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"detail": "Successfully logged out."}, status=200)
        except Exception as e:
            return Response({"detail": "Failed to log out."}, status=400)


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