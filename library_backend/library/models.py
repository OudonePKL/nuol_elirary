from django.db import models
from users.models import UserModel

class Category(models.Model):
    name = models.CharField(verbose_name="Category name", max_length=100)

    class Meta:
        ordering = ('-id',)
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name
    
class Book(models.Model):
    category = models.ForeignKey(
        Category, 
        verbose_name="Category", 
        on_delete=models.PROTECT, 
        default=1,
        related_name='books'
    )
    name = models.CharField(verbose_name="Book name", max_length=200)
    cover = models.FileField(
        verbose_name="Cover image", 
        null=True, 
        blank=True, 
        upload_to="media/covers/"
    )
    publication_date = models.CharField(verbose_name="Publication date", max_length=100)
    pdf = models.FileField(verbose_name="Book PDF file", upload_to='media/pdfs/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = "Book"
        verbose_name_plural = "Books"

    def __str__(self):
        return self.name
    
class Upload(models.Model):
    book = models.ForeignKey(
        Book, 
        verbose_name="Book", 
        on_delete=models.CASCADE,
        related_name='uploads'
    )
    user = models.ForeignKey(
        UserModel, 
        verbose_name="User", 
        on_delete=models.CASCADE,
        related_name='uploads'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = "Upload"
        verbose_name_plural = "Uploads"

    def __str__(self):
        return f"{self.book.name} uploaded by {self.user.name}"
    

class Download(models.Model):
    book = models.ForeignKey(Book, verbose_name="Book", on_delete=models.CASCADE, related_name='downloads')
    user = models.ForeignKey(UserModel, verbose_name="User", on_delete=models.CASCADE, related_name='downloads')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-id',)
        verbose_name = "Download"
        verbose_name_plural = "Downloads"

    def __str__(self):
        return f"{self.book.name} downloaded by {self.user.name}"