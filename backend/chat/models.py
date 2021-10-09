from django.db import models
from account.models import CustomUser

# Create your models here.
class Message(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'message from {self.sender.username}'

class Room(models.Model):
    room_name = models.CharField(max_length=28, blank=True, null=True)
    participants = models.ManyToManyField(CustomUser)
    messages = models.ManyToManyField(Message, blank=True)
    is_group = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.pk)