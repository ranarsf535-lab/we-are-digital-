from django.contrib import admin
from .models import Contact

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "service", "created_at"]
    list_filter = ["service", "created_at"]
    search_fields = ["name", "email", "company", "message"]
    date_hierarchy = "created_at"
