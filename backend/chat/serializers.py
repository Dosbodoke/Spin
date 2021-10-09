from django.db import models
from django.db.models import fields
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from .models import Message, Room
from account.models import CustomUser

class MessageSerializer(serializers.ModelSerializer):
    sender = ReadOnlyField(source='sender.username')
    class Meta:
        model = Message
        fields = ('id', 'message', 'sender', 'created_at')

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', )

class RoomSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True)
    class Meta:
        model = Room
        fields = '__all__'