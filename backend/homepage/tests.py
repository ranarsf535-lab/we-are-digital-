from django.test import TestCase
from rest_framework.test import APIClient
from .models import HeroContent, Stat


class HomepageAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_hero_empty(self):
        res = self.client.get("/api/homepage/hero/")
        self.assertEqual(res.status_code, 200)

    def test_hero_with_content(self):
        HeroContent.objects.create(title="Hero", subtitle="Sub", images=[])
        res = self.client.get("/api/homepage/hero/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.data["title"], "Hero")

    def test_stats(self):
        Stat.objects.create(key="projects", label="Projects", target=100)
        res = self.client.get("/api/homepage/stats/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
