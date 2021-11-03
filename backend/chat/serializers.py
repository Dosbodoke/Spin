from rest_framework import serializers
from rest_framework.fields import CharField
from .models import Message, Room
from account.models import CustomUser
from django.db.models import Count, When, Case

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
    participants = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Room
        fields = '__all__'

    def validate(self, data):
        request_data = self.context['request'].data
        participants_username = request_data.get('participants')
        participants = CustomUser.objects.filter(username__in=participants_username)
        if self._room_exist(participants_id=[x.pk for x in participants]):
            raise serializers.ValidationError("Room with this users already exist.")
        request_data['participants'] = participants
        return super().validate(data)

    def _room_exist(self, participants_id):
        rooms = Room.objects.annotate(
            total_participants=Count('participants'),
            matching_participants=Count(Case(
                When(participants__in=participants_id, then='participants'),
                default=None
            ))
        ).filter(
            matching_participants=len(participants_id),
            total_participants=len(participants_id)
        )
        
        return rooms.count()