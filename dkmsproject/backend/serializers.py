from rest_framework import serializers
from .models import Donor

class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = ('pk', 'first_name', 'last_name', 'email', 'phone', 'address', 'description')
