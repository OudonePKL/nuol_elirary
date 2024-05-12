from django.db import models
from django.utils import timezone
from django.conf import settings
from users.models import UserModel

class Category(models.Model):
    name = models.CharField(verbose_name="Category name", max_length=100)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.name
    
class Book(models.Model):
    category = models.ForeignKey(Category, verbose_name="Category id", on_delete=models.PROTECT, default=1)
    name = models.CharField(verbose_name="Book name", max_length=200)
    cover = models.FileField(
        verbose_name="Cover image", null=True, blank=True, upload_to="media/"
    )
    publication_date = models.CharField(verbose_name="Publication date of book", max_length=100)
    pdf = models.FileField(verbose_name="Book PDF File", upload_to='media/pdfs/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.name
    
class Upload(models.Model):
    book = models.ForeignKey(Book, verbose_name="Book id",on_delete=models.CASCADE)
    user = models.ForeignKey(UserModel, verbose_name="User id",on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.book.name
    
class Download(models.Model):
    book = models.ForeignKey(Book, verbose_name="Book id",on_delete=models.CASCADE)
    user = models.ForeignKey(UserModel, verbose_name="User id",on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-id',)

    def __str__(self):
        return self.book.name
     