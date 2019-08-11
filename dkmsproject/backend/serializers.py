from rest_framework import serializers
from .models import Donor

class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = (
            'pk',
            'salutation',
            'title',
            'first_name',
            'last_name',
            'email',
            'mobile',
            'phone',
            'address',
            'description',
            'ancestry',
            'dataprotectionprivacy')
