from django.urls import re_path, path
from .views import MessageList, RoomList

urlpatterns = [
    path('rooms/<username>/', RoomList.as_view()),
    path('rooms/<chat_id>/messages/', MessageList.as_view()),
]