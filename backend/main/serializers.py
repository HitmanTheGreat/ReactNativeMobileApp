from rest_framework import serializers
from .models import User, Farmer, FarmType, Crop

# GET Serializer for Crop (includes related objects' details)
class CropGetSerializer(serializers.ModelSerializer):
    farm_type = serializers.StringRelatedField()
    farmer = serializers.StringRelatedField()

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
    farm_type = serializers.StringRelatedField()

    class Meta:
        model = Farmer
        fields = '__all__'

# POST Serializer for Farmer
class FarmerPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farmer
        fields = '__all__'
