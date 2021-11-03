from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from account import serializers
from .serializers import MessageSerializer, RoomSerializer
from .models import Room
from account.models import CustomUser
from rest_framework.status import HTTP_400_BAD_REQUEST
from django.db.models import Count, When, Case

class RoomList(generics.ListCreateAPIView):
    serializer_class = RoomSerializer

    def get_queryset(self):
        return Room.objects.filter(participants__username=self.kwargs['username'])

    def perform_create(self, serializer):
        serializer.save(participants=self.request.data['participants'])

class MessageList(generics.ListCreateAPIView):
    serializer_class = MessageSerializer

    def get_queryset(self):
        return Room.objects.get(pk=self.kwargs['room_id']).messages.order_by('-created_at')

    def perform_create(self, serializer):
        """ pass room_id to create message from Room instance """
        serializer.save(room_id=self.kwargs['room_id'])