from django.test import TestCase
from rest_framework.test import APIClient
from .models import Review


class ReviewAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.review = Review.objects.create(
            name="John",
            role="Client",
            text="Great work!",
            image="https://example.com/avatar.jpg",
        )

    def test_list_reviews(self):
        res = self.client.get("/api/reviews/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
