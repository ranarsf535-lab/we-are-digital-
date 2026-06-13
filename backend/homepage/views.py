from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import HeroContent, Stat
from .serializers import HeroContentSerializer, StatSerializer

@api_view(['GET'])
def get_hero(request):
    hero = HeroContent.objects.last()
    if not hero:
        return Response([])
    serializer = HeroContentSerializer(hero)
    return Response(serializer.data)

@api_view(['GET'])
def get_stats(request):
    stats = Stat.objects.all()
    serializer = StatSerializer(stats, many=True)
    return Response(serializer.data)
