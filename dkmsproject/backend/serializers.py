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
            'street',
            'city',
            'houseno',
            'zipcode',
            'co',
            'description',
            'ancestry',
            'dataprotectionprivacy')
