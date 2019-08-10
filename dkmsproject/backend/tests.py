from django.test import TestCase
from .models import Donor
# from pprint import pprint

def create_donor(id, first_name):
    return Donor.objects.create(
        id=id,
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
        self.assertEquals(response.data['first_name'], donor.first_name)
