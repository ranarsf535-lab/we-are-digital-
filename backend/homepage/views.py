from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import HeroContent, Stat
from .serializers import HeroContentSerializer, StatSerializer

@extend_schema(responses=HeroContentSerializer)
@api_view(['GET'])
def get_hero(request):
    hero = HeroContent.objects.first()
    if not hero:
        return Response({})
    serializer = HeroContentSerializer(hero)
    return Response(serializer.data)

@extend_schema(responses=StatSerializer(many=True))
@api_view(['GET'])
def get_stats(request):
    stats = Stat.objects.all()
    serializer = StatSerializer(stats, many=True)
    return Response(serializer.data)
