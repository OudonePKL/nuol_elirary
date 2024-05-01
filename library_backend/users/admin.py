from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from users.models import UserModel

admin.site.site_header = "E-Library admin page"
admin.site.index_title = ""
admin.site.site_title = "Admin page"


class UserCreationForm(forms.ModelForm):
    """
    Form for creating a new user. Re-enter your password and include all request fields.
    """

    password1 = forms.CharField(label="password", widget=forms.PasswordInput)
    password2 = forms.CharField(label="verify password", widget=forms.PasswordInput)

    class Meta:
        model = UserModel
        fields = [
            "email",
        ]

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords do not match.")
        return password2

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()
        return user

class UserChangeForm(forms.ModelForm):
    """
     Form for updating user information. Contains all data fields of the user.
     However, the password field is replaced by a password hash field that has been disabled by the administrator.
    """

    password = ReadOnlyPasswordHashField(label="password")

    class Meta:
        model = UserModel
        fields = ["email", "password", "is_active", "is_superuser"]


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ["id", "first_name", "email", "is_active", "is_staff", "is_superuser"]
    list_display_links = ["first_name", "email"]
    list_filter = ["is_superuser", "is_active", "is_staff"]
    fieldsets = [
        (
            None,
            {
                "fields": [
                    "email",
                ]
            },
        ),
        (
            "information",
            {"fields": ["first_name", ]},
        ),
        (
            "situation",
            {
                "fields": [
                    "is_active",
                ]
            },
        ),
        ("authority", {"fields": ["is_superuser", "is_staff"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["id"]
    filter_horizontal = []

    # first_name and subscription date are set so that they cannot be modified on the admin page.
    def get_readonly_fields(self, request, obj=None):
        if obj:
            return (
                "email",
                "join_date",
            )
        else:
            return ("join_date",)
        

admin.site.register(UserModel, UserAdmin)
