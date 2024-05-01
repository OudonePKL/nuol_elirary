from rest_framework import generics
from .models import Category, Book, Upload, Download
from .serializers import CategorySerializer, BookSerializer, UploadSerializer, DownloadSerializer, ManageBookSerializer, ManageDownloadSerializer, ManageUploadSerializer

class CategoryListCreate(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# Book managements
class BookList(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookCreate(generics.CreateAPIView):
    queryset = Book.objects.all()
    serializer_class = ManageBookSerializer

class BookUpdate(generics.UpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = ManageBookSerializer

class BookDelete(generics.DestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = ManageBookSerializer


# Upload Mangement
class UploadList(generics.ListAPIView):
    queryset = Upload.objects.all()
    serializer_class = UploadSerializer

class UploadDetail(generics.RetrieveAPIView):
    queryset = Upload.objects.all()
    serializer_class = UploadSerializer

class UploadCreate(generics.CreateAPIView):
    queryset = Upload.objects.all()
    serializer_class = ManageUploadSerializer

class UploadUpdate(generics.UpdateAPIView):
    queryset = Upload.objects.all()
    serializer_class = ManageUploadSerializer

class UploadDelete(generics.DestroyAPIView):
    queryset = Upload.objects.all()
    serializer_class = ManageUploadSerializer


# Upload Mangement
class DownloadList(generics.ListAPIView):
    queryset = Download.objects.all()
    serializer_class = DownloadSerializer

class DownloadDetail(generics.RetrieveAPIView):
    queryset = Download.objects.all()
    serializer_class = DownloadSerializer

class DownloadCreate(generics.CreateAPIView):
    queryset = Download.objects.all()
    serializer_class = ManageDownloadSerializer

class DownloadUpdate(generics.UpdateAPIView):
    queryset = Download.objects.all()
    serializer_class = ManageDownloadSerializer

class DownloadDelete(generics.DestroyAPIView):
    queryset = Download.objects.all()
    serializer_class = ManageDownloadSerializer