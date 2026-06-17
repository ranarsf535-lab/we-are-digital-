from blog.models import BlogPost
from services.models import Service
from projects.models import Project

def build_context(query=None):
    parts = []

    blog_posts = BlogPost.objects.all()[:5]
    if blog_posts:
        parts.append("=== Blog Posts ===")
        for post in blog_posts:
            parts.append(f"Title: {post.title}")
            parts.append(f"Content: {post.content[:500]}")
            parts.append("")

    services = Service.objects.all()[:5]
    if services:
        parts.append("=== Services ===")
        for s in services:
            parts.append(f"Service: {s.title}")
            parts.append(f"Description: {s.description[:500]}")
            parts.append("")

    projects = Project.objects.all()[:5]
    if projects:
        parts.append("=== Projects ===")
        for p in projects:
            parts.append(f"Project: {p.title}")
            parts.append(f"Description: {p.description[:500]}")
            parts.append("")

    return "\n".join(parts) if parts else "No content available."
