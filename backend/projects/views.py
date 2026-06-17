from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import Project
from .serializers import ProjectSerializer

@extend_schema(responses=ProjectSerializer(many=True))
@api_view(['GET'])
def get_projects(request):
    projects = Project.objects.all().order_by("-created_at")
    serializer = ProjectSerializer(projects, many=True, context={'request': request})
    return Response(serializer.data)
