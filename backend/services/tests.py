from django.test import TestCase
from rest_framework.test import APIClient
from .models import Service


class ServiceAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.service = Service.objects.create(
            title="Test Service",
            description="Test description",
            icon="🚀",
        )

    def test_list_services(self):
        res = self.client.get("/api/services/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]["title"], "Test Service")
