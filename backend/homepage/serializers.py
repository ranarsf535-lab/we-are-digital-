from rest_framework import serializers
from .models import HeroContent, Stat

class HeroContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroContent
        fields = ['id', 'title', 'subtitle', 'images']

class StatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stat
        fields = ['key', 'label', 'target', 'suffix', 'color']
