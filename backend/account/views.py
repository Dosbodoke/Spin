from .serializers import CustomUserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny
from chat.models import Contact

class CustomUserCreateAPIView(generics.CreateAPIView):
    """
        Concrete APIView to create account
        On save(), a signal is dispatched to create a Contact instance
    """
    permission_classes = (AllowAny,)
    serializer_class = CustomUserSerializer

    # hash password
    def perform_create(self, serializer):
        instance = serializer.save()
        instance.set_password(instance.password)
        instance.save()
        Contact.objects.create(user=instance)