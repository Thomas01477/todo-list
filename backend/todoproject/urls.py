from django.urls import path, include
from django.http import JsonResponse
from tasks.views import trigger_error


def health(request):
    return JsonResponse({"status": "ok"})


urlpatterns = [
    path("health/", health, name="health"),
    path("error/", trigger_error, name="trigger-error"),
    path("api/", include("tasks.urls")),
]
