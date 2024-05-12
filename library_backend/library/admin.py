from django.contrib import admin
from .models import Category, Book, Upload, Download



admin.site.register(Category)
# admin.site.register(Book)
# admin.site.register(Upload)
# admin.site.register(Download)
@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    """Board Admin Definition"""
    list_display = (
        "name",
        "cover",
        "publication_date",
        "created_at"
    )
    search_fields = (
        "name",
    )

@admin.register(Upload)
class UploadAdmin(admin.ModelAdmin):
    """Board Admin Definition"""
    list_display = (
        "book",
        "user",
        "created_at"
    )
    search_fields = (
        "book",
        "user"
    )

@admin.register(Download)
class DownloadAdmin(admin.ModelAdmin):
    """Board Admin Definition"""
    list_display = (
        "book",
        "user",
        "created_at"
    )
    search_fields = (
        "book",
        "user"
    )
