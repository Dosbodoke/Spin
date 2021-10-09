import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer
from .models import Room
from channels.db import database_sync_to_async

class ChatConsumer(AsyncJsonWebsocketConsumer):

    room_name = None
    room_group_name = None

    @database_sync_to_async
    def get_room_participants(self, room_id):
        room = Room.objects.get(pk=room_id)
        return list(room.participants.values('username'))

    async def notify_participants(self, room_id):
        participants = await self.get_room_participants(room_id)
        for object in participants:
            await self.channel_layer.group_send(
                'chat_' + object['username'],
                {
                    'type': 'sidebar_notification',
                    'message': 'sss',
                    'room_id': room_id
                }
            )

    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        if self.room_group_name and self.channel_name:
                self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name
            )

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        sender = data['sender']
        room_id = data['roomId']
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender": sender,
            }
        )

        await self.notify_participants(room_id)

    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        await self.send(text_data=json.dumps({
            'message': message,
            'sender': sender
        }))

    async def sidebar_notification(self, event):
        await self.send(text_data=json.dumps({
            'message': event['message'][:30],
            'room_id': event['room_id']
        }))
