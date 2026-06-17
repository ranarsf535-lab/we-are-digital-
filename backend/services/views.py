from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import Service
from .serializers import ServiceSerializer

@extend_schema(responses=ServiceSerializer(many=True))
@api_view(['GET'])
def get_services(request):
    services = Service.objects.all().order_by("created_at")
    serializer = ServiceSerializer(services, many=True)
    return Response(serializer.data)
