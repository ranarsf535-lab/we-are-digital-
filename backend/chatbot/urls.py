from django.urls import path
from . import views

urlpatterns = [
    path('', views.chat),
    path('lead/', views.capture_lead),
    path('history/<str:session_id>/', views.chat_history),
]
