from django.urls import path
from .views import get_reviews

urlpatterns = [
    path('', get_reviews),
]