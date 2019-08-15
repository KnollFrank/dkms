from rest_framework import serializers
from .models import Donor
from .models import PersonalInformation
from .models import PrivateAddress
from .models import ContactDetails
from .models import AdditionalInformation
from .models import DeclarationOfConsent

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

class ContactDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactDetails
        fields = '__all__'

class AdditionalInformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalInformation
        fields = '__all__'

class DeclarationOfConsentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeclarationOfConsent
        fields = '__all__'

class DonorSerializer(serializers.ModelSerializer):
    personal_information = PersonalInformationSerializer()
    private_address = PrivateAddressSerializer()
    contact_details = ContactDetailsSerializer()
    additional_information = AdditionalInformationSerializer()
    declaration_of_consent = DeclarationOfConsentSerializer()

    class Meta:
        model = Donor
        fields = '__all__'

    def create(self, validated_data):
        personal_information_data = validated_data.pop('personal_information')
        personal_information = PersonalInformation.objects.create(**personal_information_data)

        private_address_data = validated_data.pop('private_address')
        private_address = PrivateAddress.objects.create(**private_address_data)

        contact_details_data = validated_data.pop('contact_details')
        contact_details = ContactDetails.objects.create(**contact_details_data)

        additional_information_data = validated_data.pop('additional_information')
        additional_information = AdditionalInformation.objects.create(**additional_information_data)

        declaration_of_consent_data = validated_data.pop('declaration_of_consent')
        declaration_of_consent = DeclarationOfConsent.objects.create(**declaration_of_consent_data)

        donor = Donor.objects.create(
            personal_information=personal_information,
            private_address=private_address,
            contact_details=contact_details,
            additional_information=additional_information,
            declaration_of_consent=declaration_of_consent,
            **validated_data)
        return donor
