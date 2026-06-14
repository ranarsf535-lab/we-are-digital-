from django.db import models

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    excerpt = models.TextField()
    image = models.URLField(blank=True, default="")
    category = models.CharField(max_length=100, blank=True, default="")
    slug = models.SlugField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-created_at"]
