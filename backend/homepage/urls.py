from django.urls import path
from . import views

urlpatterns = [
    path('hero/', views.get_hero),
    path('stats/', views.get_stats),
]
