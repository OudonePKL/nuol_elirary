from django.urls import path
from . import views

urlpatterns = [
    path('categories', views.CategoryListCreate.as_view(), name='category-list'),
    path('categories/<int:pk>', views.CategoryRetrieveUpdateDestroy.as_view(), name='category-detail'),
    # Bool
    path('books/list', views.BookList.as_view(), name='book-list'),
    path('books/create', views.BookCreate.as_view(), name='book-create'),
    path('books/detail/<int:pk>', views.BookDetail.as_view(), name='book-detail'),
    path('books/update/<int:pk>', views.BookUpdate.as_view(), name='book-update'),
    path('books/delete/<int:pk>', views.BookDelete.as_view(), name='book-delete'),
    # Upload
    path('uploads/list', views.UploadList.as_view(), name='upload-list'),
    path('uploads/create', views.UploadCreate.as_view(), name='upload-create'),
    path('uploads/detail/<int:pk>', views.UploadDetail.as_view(), name='upload-detail'),
    path('uploads/update/<int:pk>', views.UploadUpdate.as_view(), name='upload-update'),
    path('uploads/delete/<int:pk>', views.UploadDelete.as_view(), name='upload-delete'),
    # Download
    path('downloads/list', views.DownloadList.as_view(), name='download-list'),
    path('downloads/create', views.DownloadCreate.as_view(), name='download-create'),
    path('downloads/detail/<int:pk>', views.DownloadDetail.as_view(), name='download-detail'),
    path('downloads/update/<int:pk>', views.DownloadUpdate.as_view(), name='download-update'),
    path('downloads/delete/<int:pk>', views.DownloadDelete.as_view(), name='download-delete'),
]