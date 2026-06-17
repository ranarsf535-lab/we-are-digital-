from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_blog_posts),
    path('<slug:slug>/', views.get_blog_post),
]
