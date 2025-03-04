from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FarmTypeViewSet, CropViewSet, FarmerViewSet, UserViewSet

router = DefaultRouter()
router.register(r'farm-types', FarmTypeViewSet)
router.register(r'crops', CropViewSet)
router.register(r'farmers', FarmerViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
