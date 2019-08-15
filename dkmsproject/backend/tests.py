from django.test import TestCase
from .models import Donor
from .models import PersonalInformation
from .models import PrivateAddress
from .models import ContactDetails
from .models import AdditionalInformation
from .models import DeclarationOfConsent
from .serializers import DonorSerializer
from rest_framework.renderers import JSONRenderer
from pprint import pprint
from collections import OrderedDict

def create_donor(id=1, first_name="some first name"):
    personal_information = PersonalInformation(
            salutation=PersonalInformation.MR,
            title=PersonalInformation.PROF_DR,
            first_name=first_name,
            last_name="Donor last_name")

    private_address = PrivateAddress(
            address="Donor 000 Address",
            street="Kingersheimer Str.",
            city='Tübingen',
            houseno="4711",
            zipcode='72070',
            co='some co',
            apartment='some apartment')

    contact_details = ContactDetails(
            email="donor001@email.com",
            mobile="07471/3807",
            phone="00000000")

    additional_information = AdditionalInformation(ancestry="WS")

    declaration_of_consent = DeclarationOfConsent(dataprotectionprivacy=True)

    donor = Donor(
        id=id,
        personal_information=personal_information,
        private_address=private_address,
        contact_details=contact_details,
        additional_information=additional_information,
        declaration_of_consent=declaration_of_consent)
    return donor

def create_and_save_donor(id=1, first_name="some first name"):
    donor = create_donor(id, first_name)

    personal_information = donor.personal_information
    personal_information.save()
    donor.personal_information = personal_information

    private_address = donor.private_address
    private_address.save()
    donor.private_address = private_address

    contact_details = donor.contact_details
    contact_details.save()
    donor.contact_details = contact_details

    additional_information = donor.additional_information
    additional_information.save()
    donor.additional_information = additional_information

    declaration_of_consent = donor.declaration_of_consent
    declaration_of_consent.save()
    donor.declaration_of_consent = declaration_of_consent

    donor.save()
    return donor

class DonorTests(TestCase):

    def test_saveDonor(self):
        # Given
        first_name = 'a some first name'
        address = 'a Donor 000 Address'
        email = 'adonor001@email.com'
        ancestry = "WS"
        dataprotectionprivacy = True
        donor = {
          'personal_information': {
                'salutation':  'Mr',
                'title': 'PROF_DR',
                'first_name': first_name,
                'last_name': 'a Donor last_name'
          },
          'private_address': {
                'address': address,
                'street': 'a Kingersheimer Str.',
                'city': 'a Tübingen',
                'zipcode': '72072',
                'houseno': '4711',
                'co': 'a some co',
                'apartment': 'a some apartment'
           },
           'contact_details': {
                'email': email,
                'mobile': '07471/3807',
                'phone': '000000006'
           },
           'additional_information': {
                'ancestry': ancestry
           },
           'declaration_of_consent': {
                'dataprotectionprivacy': dataprotectionprivacy
           },
          'pk': 4712
          }

        # When
        # response = self.client.post('/api/backend/', donor, content_type='application/x-www-form-urlencoded')
        response = self.client.post('/api/backend/', donor, content_type='application/json')

        # Then
        self.assertTrue(Donor.objects.filter(pk=response.data['id']).exists())
        donorFromDb = Donor.objects.get(pk=response.data['id'])
        self.assertEquals(donorFromDb.contact_details.email, email)
        self.assertEquals(donorFromDb.personal_information.first_name, first_name)
        self.assertEquals(donorFromDb.private_address.address, address)
        self.assertEquals(donorFromDb.additional_information.ancestry, ancestry)
        self.assertEquals(donorFromDb.declaration_of_consent.dataprotectionprivacy, dataprotectionprivacy)

    def test_getDonor(self):
        # Given
        donor = create_and_save_donor(id=4711, first_name="some first name")

        # When
        response = self.client.get('/api/backend/' + str(donor.id))

        # Then
        # pprint(response.__dict__)
        self.assertEquals(response.data['id'], donor.id)

        self.assertEquals_personal_information(
            actual = response.data['personal_information'],
            expected = donor.personal_information)

        self.assertEquals_private_address(
            actual = response.data['private_address'],
            expected = donor.private_address)

        self.assertEquals_contact_details(
            actual = response.data['contact_details'],
            expected = donor.contact_details)

        self.assertEquals_additional_information(
            actual = response.data['additional_information'],
            expected = donor.additional_information)

        self.assertEquals_declaration_of_consent(
            actual = response.data['declaration_of_consent'],
            expected = donor.declaration_of_consent)

    def assertEquals_personal_information(self, actual, expected):
        self.assertEquals(actual['salutation'], expected.salutation)
        self.assertEquals(actual['title'], expected.title)
        self.assertEquals(actual['first_name'], expected.first_name)
        self.assertEquals(actual['last_name'], expected.last_name)

    def assertEquals_private_address(self, actual, expected):
        self.assertEquals(actual['address'], expected.address)
        self.assertEquals(actual['street'], expected.street)
        self.assertEquals(actual['city'], expected.city)
        self.assertEquals(actual['zipcode'], expected.zipcode)
        self.assertEquals(actual['houseno'], expected.houseno)
        self.assertEquals(actual['co'], expected.co)
        self.assertEquals(actual['apartment'], expected.apartment)

    def assertEquals_contact_details(self, actual, expected):
        self.assertEquals(actual['email'], expected.email)
        self.assertEquals(actual['mobile'], expected.mobile)
        self.assertEquals(actual['phone'], expected.phone)

    def assertEquals_additional_information(self, actual, expected):
        self.assertEquals(actual['ancestry'], expected.ancestry)

    def assertEquals_declaration_of_consent(self, actual, expected):
        self.assertEquals(actual['dataprotectionprivacy'], expected.dataprotectionprivacy)

    def test_get_ancestry_choices(self):
        # Given

        # When
        response = self.client.get('/api/backend/ancestry_choices')

        # Then
        self.assertEquals(response.data, AdditionalInformation.ANCESTRY_CHOICES)


class DonorDAOTests(TestCase):

    def test_save_and_get_donor(self):
        # Given a persisted donor
        first_name = 'Frank'
        donor = create_and_save_donor(id=1, first_name=first_name)

        # When

        # Then donor was saved to the db
        self.assertTrue(Donor.objects.filter(pk=donor.pk).exists())
        # and when loading donor from db again, it's personal_information is also loaded
        donorFromDb = Donor.objects.get(pk=donor.pk)
        self.assertEquals(donorFromDb.personal_information.first_name, first_name)
