from rest_framework import serializers
from .models import Donor, PersonalInformation

class PersonalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInformation
        fields = (
            'pk',
            'salutation',
            'title',
            'first_name',
            'last_name')

# MAYBE-TODO: verwende HyperlinkedModelSerializer statt ModelSerializer
class DonorSerializer(serializers.ModelSerializer):
    personal_information = PersonalInformationSerializer()

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
        # depth = 1

    def create(self, validated_data):
        personal_information_data = validated_data.pop('personal_information')
        personal_information = PersonalInformation.objects.create(**personal_information_data)
        donor = Donor.objects.create(personal_information=personal_information, **validated_data)
        return donor
