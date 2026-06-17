from django.contrib import admin
from .models import Review

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "created_at"]
    search_fields = ["name", "role", "text"]
