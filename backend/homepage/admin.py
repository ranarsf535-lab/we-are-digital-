from django.contrib import admin
from .models import HeroContent, Stat

@admin.register(HeroContent)
class HeroContentAdmin(admin.ModelAdmin):
    list_display = ["title", "created_at"]

@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ["key", "label", "target"]
    search_fields = ["key", "label"]
