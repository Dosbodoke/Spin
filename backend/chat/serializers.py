from rest_framework import serializers
from rest_framework.fields import CharField
from .models import Message, Room
from account.models import CustomUser

class MessageSerializer(serializers.ModelSerializer):
    sender = CharField(source='sender.username')

    class Meta:
        model = Message
        fields = ('id', 'message', 'sender', 'created_at')

    def create(self, validated_data):
        sender = CustomUser.objects.get(username=validated_data['sender']['username'])
        room = Room.objects.get(pk=validated_data['room_id'])
        return room.messages.create(
            message = validated_data['message'],
            sender = sender,
        )

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username', )

class RoomSerializer(serializers.ModelSerializer):
    participants = ParticipantSerializer(many=True)
    class Meta:
        model = Room
        fields = '__all__'