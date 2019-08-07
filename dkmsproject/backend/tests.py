from django.test import TestCase
from .models import Customer
# from pprint import pprint

def create_customer(id, first_name):
    return Customer.objects.create(
        id=id,
        first_name=first_name,
        last_name="Customer last_name",
        email="customer001@email.com",
        phone="00000000",
        address="Customer 000 Address",
        description= "Customer 001 description")

class CustomerTests(TestCase):

    def test_getCustomer(self):
        # Given
        customer = create_customer(id=4711, first_name="some first name")

        # When
        response = self.client.get('/api/backend/' + str(customer.id))

        # Then
        # pprint(response.__dict__)
        self.assertEquals(response.data['pk'], customer.id)
        self.assertEquals(response.data['first_name'], customer.first_name)
