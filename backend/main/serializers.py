from rest_framework import serializers
from .models import CustomUser, Farmer, FarmType, Crop
from rest_framework import serializers
from .models import Crop
from django.core.files.base import ContentFile
import base64
import imghdr
from io import BytesIO
from PIL import Image


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


class CropPostSerializer(serializers.ModelSerializer):
    image = serializers.CharField(write_only=True)

    class Meta:
        model = Crop
        fields = ['name', 'description', 'image']

    def validate_image(self, value):
        # Extract base64 data from 'data:image/webp;base64,...'
        if not value.startswith('data:image'):
            raise serializers.ValidationError("Invalid image format.")
        
        # Split base64 string into header and data
        format, imgstr = value.split(';base64,')  # Split into format and base64 string
        byte_data = base64.b64decode(imgstr)  # Decode base64 data

        # Check image type
        image_type = imghdr.what(None, byte_data)
        if image_type not in ['jpeg', 'png', 'webp']:
            raise serializers.ValidationError("Unsupported image type.")

        # Create a file-like object from the byte data
        image_file = ContentFile(byte_data, name="uploaded_image." + image_type)
        return image_file

    def create(self, validated_data):
        image = validated_data.pop('image')  # Extract image data
        crop = Crop.objects.create(**validated_data)
        crop.image.save(image.name, image, save=True)  # Save the image
        return crop


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
