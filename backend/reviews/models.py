from django.db import models

class Review(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    text = models.TextField()
    image = models.ImageField(upload_to='reviews/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name