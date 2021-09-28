from rest_framework import generics
from .serializers import ContactSerializer

class Contact(generics.RetrieveAPIView):
    serializer_class = ContactSerializer
