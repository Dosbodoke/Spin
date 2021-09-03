from django.db import models
from account.models import CustomUser

# Create your models here.
class Message(models.Model):
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)