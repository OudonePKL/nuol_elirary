from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import FileResponse
from .models import Category, Book, Upload, Download
from .serializers import CategorySerializer, BookSerializer, UploadSerializer, DownloadSerializer
from users.models import UserModel
from rest_framework.permissions import IsAuthenticated

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def perform_create(self, serializer):
        book = serializer.save()
        Upload.objects.create(book=book, user=self.request.user)

    @action(detail=True, methods=['get'], url_path='download-pdf')
    def download_pdf(self, request, pk=None):
        book = self.get_object()
        user = request.user

        # Create a Download record
        Download.objects.create(book=book, user=user)

        # Serve the PDF file
        pdf_path = book.pdf.path
        response = FileResponse(open(pdf_path, 'rb'), content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="{book.name}.pdf"'
        return response

# class UploadViewSet(viewsets.ModelViewSet):
#     queryset = Upload.objects.all()
#     serializer_class = UploadSerializer

# class DownloadViewSet(viewsets.ModelViewSet):
#     queryset = Download.objects.all()
#     serializer_class = DownloadSerializer
