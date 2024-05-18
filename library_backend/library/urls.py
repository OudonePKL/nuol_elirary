from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, BookViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'books', BookViewSet)
# router.register(r'uploads', UploadViewSet)
# router.register(r'downloads', DownloadViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
