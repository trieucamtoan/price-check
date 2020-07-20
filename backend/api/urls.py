from django.urls import path
from .views import (
    registration_view
)

app_name = "api"

urlpatterns = [
    path('account/register', registration_view, name='register')
]