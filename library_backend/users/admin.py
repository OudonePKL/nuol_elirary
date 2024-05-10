from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from users.models import UserModel

admin.site.site_header = "E-Library admin page"
admin.site.index_title = ""
admin.site.site_title = "Admin page"
 

admin.site.register(UserModel)
