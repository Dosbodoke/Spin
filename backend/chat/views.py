from rest_framework import generics
from .serializers import MessageSerializer, RoomSerializer
from .models import Message, Room
from rest_framework.response import Response

class RoomList(generics.ListAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        return Room.objects.filter(participants__username=self.kwargs['username'])

class MessageList(generics.ListAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        return Room.objects.get(pk=self.kwargs['chat_id']).messages.order_by('-created_at')