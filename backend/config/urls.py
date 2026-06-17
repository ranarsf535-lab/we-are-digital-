from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from rest_framework.permissions import IsAdminUser
from config.forms import NoAutofillAdminAuthForm

admin.site.login_form = NoAutofillAdminAuthForm

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/services/', include('services.urls')),
    path('api/projects/', include('projects.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/contact/', include('contact.urls')),
    path('api/homepage/', include('homepage.urls')),
    path('api/blog/', include('blog.urls')),
    path('api/schema/', SpectacularAPIView.as_view(permission_classes=[IsAdminUser]), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema', permission_classes=[IsAdminUser]), name='swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
