from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.throttling import AnonRateThrottle
from drf_spectacular.utils import extend_schema
from .models import Contact
from .serializers import ContactSerializer

class ContactRateThrottle(AnonRateThrottle):
    rate = '5/hour'

@extend_schema(
    request=ContactSerializer,
    responses={201: ContactSerializer, 400: ContactSerializer},
)
@api_view(['POST'])
@throttle_classes([ContactRateThrottle])
def submit_contact(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Message sent successfully'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
