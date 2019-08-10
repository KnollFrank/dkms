from django.test import TestCase
from .models import Donor
# from pprint import pprint

def create_donor(id, first_name):
    return Donor.objects.create(
        id=id,
        salutation=Donor.MR,
        first_name=first_name,
        last_name="Donor last_name",
        email="donor001@email.com",
        phone="00000000",
        address="Donor 000 Address",
        description= "Donor 001 description")

class DonorTests(TestCase):

    def test_getDonor(self):
        # Given
        donor = create_donor(id=4711, first_name="some first name")

        # When
        response = self.client.get('/api/backend/' + str(donor.id))

        # Then
        # pprint(response.__dict__)
        self.assertEquals(response.data['pk'], donor.id)
        self.assertEquals(response.data['salutation'], donor.salutation)
        self.assertEquals(response.data['first_name'], donor.first_name)
        self.assertEquals(response.data['last_name'], donor.last_name)
        self.assertEquals(response.data['email'], donor.email)
        self.assertEquals(response.data['phone'], donor.phone)
        self.assertEquals(response.data['address'], donor.address)
        self.assertEquals(response.data['description'], donor.description)
