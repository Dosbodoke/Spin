from .serializers import CustomUserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

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