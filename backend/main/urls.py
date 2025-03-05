from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FarmTypeViewSet, CropViewSet, FarmerViewSet, UserViewSet , LogoutView ,current_user , CustomTokenObtainPairView , ChangePasswordView

router = DefaultRouter()
router.register(r'farm-types', FarmTypeViewSet)
router.register(r'crops', CropViewSet)
router.register(r'farmers', FarmerViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/logout/', LogoutView.as_view(), name='logout'),
    path('api/current-user/', current_user, name='current_user'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
]
