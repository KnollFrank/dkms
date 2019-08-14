from rest_framework import serializers
from .models import Donor, PersonalInformation, PrivateAddress

class PersonalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalInformation
        fields = (
            'pk',
            'salutation',
            'title',
            'first_name',
            'last_name')

class PrivateAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrivateAddress
        fields = '__all__'

# MAYBE-TODO: verwende HyperlinkedModelSerializer statt ModelSerializer
class DonorSerializer(serializers.ModelSerializer):
    personal_information = PersonalInformationSerializer()
    private_address = PrivateAddressSerializer()

    class Meta:
        model = Donor
        fields = '__all__'

    def create(self, validated_data):
        personal_information_data = validated_data.pop('personal_information')
        personal_information = PersonalInformation.objects.create(**personal_information_data)

        private_address_data = validated_data.pop('private_address')
        private_address = PrivateAddress.objects.create(**private_address_data)

        donor = Donor.objects.create(
            personal_information=personal_information,
            private_address=private_address,
            **validated_data)
        return donor
