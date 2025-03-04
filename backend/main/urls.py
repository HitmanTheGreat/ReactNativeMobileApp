from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import FarmTypeViewSet, CropViewSet, FarmerViewSet, UserViewSet , LogoutView

router = DefaultRouter()
router.register(r'farm-types', FarmTypeViewSet)
router.register(r'crops', CropViewSet)
router.register(r'farmers', FarmerViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/logout/', LogoutView.as_view(), name='logout'),
]
