from django.db import models

class HeroContent(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.TextField()
    images = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.title

class Stat(models.Model):
    key = models.SlugField(unique=True)
    label = models.CharField(max_length=100)
    target = models.IntegerField()
    suffix = models.CharField(max_length=10, default="+")
    color = models.CharField(max_length=50, default="text-blue-400")

    def __str__(self):
        return self.label
