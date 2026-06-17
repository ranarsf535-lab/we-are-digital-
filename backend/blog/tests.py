from django.test import TestCase
from rest_framework.test import APIClient
from .models import BlogPost


class BlogAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.post = BlogPost.objects.create(
            title="Test Post",
            slug="test-post",
            excerpt="Excerpt",
            content="Full content",
        )

    def test_list_blog_posts(self):
        res = self.client.get("/api/blog/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)

    def test_list_blog_posts_with_limit(self):
        BlogPost.objects.create(title="Post 2", slug="post-2", excerpt="E2", content="C2")
        res = self.client.get("/api/blog/?limit=1")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(len(res.data), 1)
