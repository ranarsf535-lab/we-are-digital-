from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import BlogPost
from .serializers import BlogPostSerializer

@extend_schema(responses=BlogPostSerializer(many=True))
@api_view(['GET'])
def get_blog_posts(request):
    limit = request.query_params.get("limit")
    posts = BlogPost.objects.all()
    if limit:
        try:
            posts = posts[:int(limit)]
        except ValueError:
            pass
    serializer = BlogPostSerializer(posts, many=True, context={'request': request})
    return Response(serializer.data)

@extend_schema(responses=BlogPostSerializer)
@api_view(['GET'])
def get_blog_post(request, slug):
    post = get_object_or_404(BlogPost, slug=slug)
    serializer = BlogPostSerializer(post, context={'request': request})
    return Response(serializer.data)
