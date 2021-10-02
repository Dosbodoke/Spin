from django.db import models
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from .models import Message, Contact
from .models import Contact

class FriendSerializer(serializers.ModelSerializer):
    user_id = ReadOnlyField(source='user.id')
    username = ReadOnlyField(source='user.username')
    class Meta:
        model = Contact
        fields = ['id', 'user_id', 'username',]

class ContactSerializer(serializers.ModelSerializer):
    friends = FriendSerializer(many=True, read_only=True)
    class Meta:
        model = Contact
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'