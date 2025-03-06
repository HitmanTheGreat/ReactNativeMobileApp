from rest_framework import viewsets
from .models import Crop, Farmer, FarmType, CustomUser
from .serializers import (
    CropGetSerializer, CropPostSerializer,
    FarmerGetSerializer, FarmerPostSerializer,
    FarmTypeGetSerializer,
    UserGetSerializer
)
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import InvalidToken
from django.shortcuts import render

def landing_page(request):
    return render(request, 'index.html')
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        # Retrieve the token pair from the response
        access_token = response.data.get('access')
        refresh_token = response.data.get('refresh')

        try:
            # Decode the access token to get user info using AccessToken
            decoded = AccessToken(access_token).payload  # Use AccessToken for the access token
            user = CustomUser.objects.get(id=decoded['user_id'])  # Fetch user based on the decoded ID

            # Add user info to the response
            # Add user info to the response
            role = getattr(user, 'role', None)

            # If the role is None, determine it based on whether the user is a superuser
            if role is None:
                role = 'admin' if user.is_superuser else 'clerk'
                            
            response.data['user'] = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
                'is_staff': user.is_staff,
                'role': role 
            }

            return response
        except InvalidToken:
            return Response(
                {"detail": "Token is invalid or expired."},
                status=status.HTTP_400_BAD_REQUEST
            )



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
    queryset = CustomUser.objects.all()

    def get_serializer_class(self):
        # Determine serializer class based on the HTTP method
        if self.request.method == "GET":
            return UserGetSerializer
        return UserGetSerializer  # Serializer for POST/PUT requests

    def perform_create(self, serializer):
        # Manually hash the password before saving
        password = serializer.validated_data.get('password')
        if password:
            user = serializer.save()
            user.set_password(password)  # Hash the password
            user.save()

    def perform_update(self, serializer):
        # If the password is updated, hash it before saving
        password = serializer.validated_data.get('password')
        if password:
            user = serializer.save()
            user.set_password(password)  # Hash the password
            user.save()
    


@api_view(['POST'])
def current_user(request):
    try:
        # JWT Authentication
        user = request.user
        
        # If the user is not authenticated, return an error
        if not user.is_authenticated:
            raise NotFound("CustomUser not found")
        
        # Return the current user details (e.g., username, email)
        return Response({
            'username': user.username,
            'email': user.email,
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name
        }, status=200)
    
    except InvalidToken:
        return Response({"detail": "Invalid token."}, status=401)
    except Exception as e:
        return Response({"detail": f"Error: {str(e)}"}, status=400)


class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def post(self, request, *args, **kwargs):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        
        if not old_password or not new_password:
            return Response({"detail": "Old password and new password are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate user using token
        user = request.user

        # Check if the old password is correct
        if not user.check_password(old_password):
            raise AuthenticationFailed("Old password is incorrect")

        # Change password
        user.set_password(new_password)
        user.save()

        return Response({"detail": "Password successfully updated."}, status=status.HTTP_200_OK)
