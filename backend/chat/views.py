from rest_framework import generics
from .serializers import MessageSerializer, RoomSerializer
from .models import Message, Room
from rest_framework.response import Response
from account.models import CustomUser
from rest_framework import status

class RoomList(generics.ListCreateAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        return Room.objects.filter(participants__username=self.kwargs['username'])

class MessageList(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        return Room.objects.get(pk=self.kwargs['room_id']).messages.order_by('-created_at')

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)    

    def perform_create(self, serializer):
        """ pass room_id to create message from Room instance """
        serializer.save(room_id=self.kwargs['room_id'])