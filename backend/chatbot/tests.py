from django.test import TestCase
from rest_framework.test import APIClient
from .models import ChatSession, ChatMessage

class ChatAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_chat_creates_session(self):
        res = self.client.post('/api/chat/', {'message': 'Hello'})
        self.assertEqual(res.status_code, 200)
        self.assertIn('session_id', res.data)
        self.assertIn('reply', res.data)

    def test_chat_reuses_session(self):
        res1 = self.client.post('/api/chat/', {'message': 'Hello'})
        sid = res1.data['session_id']
        res2 = self.client.post('/api/chat/', {'message': 'Hi again', 'session_id': sid})
        self.assertEqual(res2.status_code, 200)
        self.assertEqual(res2.data['session_id'], sid)

    def test_capture_lead(self):
        res = self.client.post('/api/chat/', {'message': 'Hello'})
        sid = res.data['session_id']
        lead_res = self.client.post('/api/chat/lead/', {
            'session_id': sid,
            'name': 'John',
            'email': 'john@example.com',
        })
        self.assertEqual(lead_res.status_code, 200)
        session = ChatSession.objects.get(session_id=sid)
        self.assertTrue(session.lead_captured)

    def test_history(self):
        res = self.client.post('/api/chat/', {'message': 'Hello'})
        sid = res.data['session_id']
        hist = self.client.get(f'/api/chat/history/{sid}/')
        self.assertEqual(hist.status_code, 200)
        self.assertEqual(len(hist.data), 2)
