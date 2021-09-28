from django.dispatch import receiver
from django.db.models.signals import post_save
from .models import CustomUser
from chat.models import Contact

@receiver(post_save, sender=CustomUser)
def createContact(sender, instance, created, **kwargs):
    if created:
        Contact.objects.create(user=instance)