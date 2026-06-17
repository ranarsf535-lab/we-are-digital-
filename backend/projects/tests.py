from django.test import TestCase
from rest_framework.test import APIClient
from .models import Project


class ProjectAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.project = Project.objects.create(
            title="Test Project",
            description="Test description",
            image="https://example.com/image.jpg",
        )

    def test_list_projects(self):
        res = self.client.get("/api/projects/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
