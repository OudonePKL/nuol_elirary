from rest_framework import serializers
from .models import Category, Book, Upload, Download
from users.models import UserModel
from users.serializers import UserSerializer

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Book
        fields = '__all__'


class ManageBookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class UploadSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    user = UserSerializer()
    class Meta:
        model = Upload
        fields = '__all__'

class ManageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Upload
        fields = '__all__'

class DownloadSerializer(serializers.ModelSerializer):
    book = BookSerializer()
    user = UserSerializer()
    class Meta:
        model = Download
        fields = '__all__'

class ManageDownloadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Download
        fields = '__all__'