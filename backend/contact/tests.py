from django.test import TestCase
from rest_framework.test import APIClient


class ContactAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_submit_contact(self):
        data = {
            "name": "John Doe",
            "email": "john@example.com",
            "message": "Hello!",
        }
        res = self.client.post("/api/contact/", data, format="json")
        self.assertEqual(res.status_code, 201)
        self.assertIn("message", res.data)

    def test_submit_contact_missing_fields(self):
        res = self.client.post("/api/contact/", {"name": "John"}, format="json")
        self.assertEqual(res.status_code, 400)
