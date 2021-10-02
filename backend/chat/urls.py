from django.urls import path
from .views import ContactAPIView

urlpatterns = [
    path('contact/<str:user__username>/', ContactAPIView.as_view()),
]