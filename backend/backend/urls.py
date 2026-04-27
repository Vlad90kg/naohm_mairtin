"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path


def root_api_status(_request):
    return JsonResponse(
        {
            "service": "naohm_mairtin_backend",
            "status": "ok",
            "message": "Django is running as the API backend. Start the Vite frontend separately for the website UI.",
            "available_routes": {
                "admin": "/admin/",
                "api": "/api/",
                "sponsors": "/api/sponsors/",
            },
            "frontend_dev_server": "http://127.0.0.1:5173/",
        }
    )

urlpatterns = [
    path('', root_api_status),
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
