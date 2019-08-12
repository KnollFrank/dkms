from django.test import TestCase
from .models import Donor
# from pprint import pprint

def create_donor(id, first_name):
    return Donor.objects.create(
        id=id,
        salutation=Donor.MR,
        title=Donor.PROF_DR,
        first_name=first_name,
        last_name="Donor last_name",
        email="donor001@email.com",
        mobile="07471/3807",
        phone="00000000",
        address="Donor 000 Address",
        street="Kingersheimer Str.",
        city='Tübingen',
        houseno="4711",
        zipcode='72070',
        description= "Donor 001 description",
        ancestry="WS",
        dataprotectionprivacy=True)

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
        self.assertEquals(response.data['description'], donor.description)
        self.assertEquals(response.data['ancestry'], donor.ancestry)
        self.assertEquals(response.data['dataprotectionprivacy'], donor.dataprotectionprivacy)
