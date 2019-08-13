from rest_framework import serializers
from .models import Donor, PersonalInformation

# MAYBE-TODO: verwende HyperlinkedModelSerializer statt ModelSerializer
class DonorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donor
        fields = (
            'pk',
            'personal_information',
            'email',
            'mobile',
            'phone',
            'address',
            'street',
            'city',
            'houseno',
            'zipcode',
            'co',
            'apartment',
            'description',
            'ancestry',
            'dataprotectionprivacy')
        depth = 1

class PersonalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInformation
        fields = (
            'pk',
            'salutation',
            'title',
            'first_name',
            'last_name')
