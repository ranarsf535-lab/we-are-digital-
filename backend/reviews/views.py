from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import Review
from .serializers import ReviewSerializer

@extend_schema(responses=ReviewSerializer(many=True))
@api_view(['GET'])
def get_reviews(request):
    reviews = Review.objects.all().order_by("-created_at")
    serializer = ReviewSerializer(reviews, many=True, context={'request': request})
    return Response(serializer.data)
