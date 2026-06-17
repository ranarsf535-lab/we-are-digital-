import uuid
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from drf_spectacular.utils import extend_schema
from .models import ChatSession, ChatMessage
from .serializers import ChatMessageSerializer, ChatRequestSerializer, LeadSerializer
from .llm import get_ai_response

@extend_schema(request=ChatRequestSerializer)
@api_view(['POST'])
def chat(request):
    serializer = ChatRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    message = serializer.validated_data['message']
    session_id = serializer.validated_data.get('session_id')

    if not session_id:
        session_id = str(uuid.uuid4())
        session = ChatSession.objects.create(session_id=session_id)
    else:
        session, _ = ChatSession.objects.get_or_create(session_id=session_id)

    ChatMessage.objects.create(session=session, role='user', content=message)

    history = list(
        session.messages.values('role', 'content')
    )
    ai_reply = get_ai_response(message, history[:-1])

    ChatMessage.objects.create(session=session, role='assistant', content=ai_reply)

    return Response({
        'session_id': session_id,
        'reply': ai_reply,
        'lead_captured': session.lead_captured,
    })

@extend_schema(request=LeadSerializer)
@api_view(['POST'])
def capture_lead(request):
    serializer = LeadSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    session_id = serializer.validated_data['session_id']
    try:
        session = ChatSession.objects.get(session_id=session_id)
    except ChatSession.DoesNotExist:
        return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

    session.lead_name = serializer.validated_data['name']
    session.lead_email = serializer.validated_data['email']
    session.lead_phone = serializer.validated_data.get('phone', '')
    session.lead_captured = True
    session.save()

    return Response({'message': 'Lead captured successfully'})

@extend_schema(responses=ChatMessageSerializer(many=True))
@api_view(['GET'])
def chat_history(request, session_id):
    try:
        session = ChatSession.objects.get(session_id=session_id)
    except ChatSession.DoesNotExist:
        return Response({'error': 'Session not found'}, status=status.HTTP_404_NOT_FOUND)

    messages = session.messages.all()
    serializer = ChatMessageSerializer(messages, many=True)
    return Response(serializer.data)
