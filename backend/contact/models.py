from django.db import models

class Contact(models.Model):
    SERVICE_CHOICES = [
        ("meta-tiktok-ads", "Meta & TikTok Ads"),
        ("shopify", "Shopify Development"),
        ("wordpress", "WordPress Development"),
        ("social-media", "Social Media Management"),
        ("seo", "SEO & Digital Marketing"),
        ("branding", "Branding & Design"),
        ("other", "Other"),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True, default="")
    company = models.CharField(max_length=200, blank=True, default="")
    service = models.CharField(max_length=30, choices=SERVICE_CHOICES, blank=True, default="")
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} — {self.get_service_display() or 'General'}"
