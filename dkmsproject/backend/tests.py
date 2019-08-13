from django.test import TestCase
from .models import Donor, PersonalInformation
from pprint import pprint

def create_and_save_donor(id=1, first_name="some first name"):
    personal_information = PersonalInformation.objects.create(
            salutation=PersonalInformation.MR,
            title=PersonalInformation.PROF_DR,
            first_name=first_name,
            last_name="Donor last_name")

    return Donor.objects.create(
        id=id,
        personal_information=personal_information,
        email="donor001@email.com",
        mobile="07471/3807",
        phone="00000000",
        address="Donor 000 Address",
        street="Kingersheimer Str.",
        city='Tübingen',
        houseno="4711",
        zipcode='72070',
        co='some co',
        apartment='some apartment',
        description= "Donor 001 description",
        ancestry="WS",
        dataprotectionprivacy=True)

class DonorTests(TestCase):

    def test_getDonor(self):
        # Given
        donor = create_and_save_donor(id=4711, first_name="some first name")

        # When
        response = self.client.get('/api/backend/' + str(donor.id))

        # Then
        pprint(response.__dict__)
        self.assertEquals(response.data['pk'], donor.id)
        self.assertEquals(response.data['salutation'], donor.salutation)
        self.assertEquals(response.data['title'], donor.title)
        self.assertEquals(response.data['first_name'], donor.first_name)
        self.assertEquals(response.data['last_name'], donor.last_name)
        self.assertEquals(response.data['email'], donor.email)
        self.assertEquals(response.data['mobile'], donor.mobile)
        self.assertEquals(response.data['phone'], donor.phone)
        self.assertEquals(response.data['address'], donor.address)
        self.assertEquals(response.data['street'], donor.street)
        self.assertEquals(response.data['city'], donor.city)
        self.assertEquals(response.data['houseno'], donor.houseno)
        self.assertEquals(response.data['zipcode'], donor.zipcode)
        self.assertEquals(response.data['co'], donor.co)
        self.assertEquals(response.data['apartment'], donor.apartment)
        self.assertEquals(response.data['description'], donor.description)
        self.assertEquals(response.data['ancestry'], donor.ancestry)
        self.assertEquals(response.data['dataprotectionprivacy'], donor.dataprotectionprivacy)

    def test_get_ancestry_choices(self):
        # Given

        # When
        response = self.client.get('/api/backend/ancestry_choices')

        # Then
        self.assertEquals(response.data, Donor.ANCESTRY_CHOICES)


class DonorDAOTests(TestCase):

    def test_save_and_Get_donor(self):
        # Given
        first_name = 'Franky'
        donor = create_and_save_donor(first_name = first_name)

        # When

        # Then donor was saved to the db
        self.assertTrue(Donor.objects.filter(pk=donor.pk).exists())
        # and when loading donor from db again, it's personal_information is also loaded
        donorFromDb = Donor.objects.get(pk=donor.pk)
        self.assertEquals(donorFromDb.personal_information.first_name, first_name)
