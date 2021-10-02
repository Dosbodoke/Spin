from rest_framework import generics
from .serializers import ContactSerializer
from .models import Contact

class ContactAPIView(generics.RetrieveAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    lookup_field = 'user__username'
