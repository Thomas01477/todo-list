from django.urls import path, include
from django.http import JsonResponse


def health(request):
    return JsonResponse({"status": "ok"})


def trigger_sentry_error(request):
    raise Exception("Test Sentry Django")


urlpatterns = [
    path("health/", health, name="health"),
    path("debug-sentry/", trigger_sentry_error, name="trigger-sentry-error"),
    path("api/", include("tasks.urls")),
]
