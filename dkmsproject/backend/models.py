from django.db import models

# TODO: rename Customer to Donor
class Customer(models.Model):
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address =  models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.first_name

# Personal information:
# - salutation: Mr. / Mrs.
# - title: Dr., Dr. med., Dr. med. dent., Dr. pharm., Dr. rer. hum., Prof., Prof. Dr.
# - firstname
# - lastname
#
# Private address:
# - street
# - houseno
# - apartment (optional)
# - co (optional)
# - zipcode
# - city
#
# Contact details:
# - phone (private)
# - mobile
# - email
#
# Additional Information:
# - ancestry
#
# Declaration of Consent:
# - dataprotectionprivacy
