from django.test import TestCase

from .models import Customer

def create_data(id):
    return Customer.objects.create(
        id=id,
        first_name="Customer first_name",
        last_name="Customer last_name",
        email="customer001@email.com",
        phone="00000000",
        address="Customer 000 Address",
        description= "Customer 001 description")


class CustomerDetailViewTests(TestCase):
    def test_customer(self):
        id = 4711
        customer = create_data(id)
        response = self.client.get('/api/backend/' + str(id))
        self.assertContains(response, customer.first_name)
