from django.urls import path
from .views import UserCreateView, BlacklistTokenUpdateView

app_name = "users"

urlpatterns = [
    path("register/", UserCreateView.as_view(), name="create_user"),
    path("logout/blacklist/", BlacklistTokenUpdateView.as_view(), name="blacklist"),
]
