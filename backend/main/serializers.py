from rest_framework import serializers
from .models import CustomUser, Farmer, FarmType, Crop


class UserGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'


class FarmerGetSerializer(serializers.ModelSerializer):
    farm_type = serializers.StringRelatedField()
    
    class Meta:
        model = Farmer
        fields = '__all__'

class FarmerPostSerializer(serializers.ModelSerializer):
    farm_type = serializers.PrimaryKeyRelatedField(queryset=FarmType.objects.all())
    
    class Meta:
        model = Farmer
        fields = '__all__'
        
        
# Serializer for FarmType
class FarmTypeGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = FarmType
        fields = '__all__'

# GET Serializer for Crop (includes related objects' details)
class CropGetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Crop
        fields = '__all__'

# POST Serializer for Crop (expects IDs for related objects)
class CropPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Crop
        fields = '__all__'

# GET Serializer for Farmer
class FarmerGetSerializer(serializers.ModelSerializer):
    farm_type = FarmTypeGetSerializer()

    class Meta:
        model = Farmer
        fields = '__all__'

# POST Serializer for Farmer
class FarmerPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'
