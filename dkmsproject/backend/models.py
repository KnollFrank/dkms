from django.db import models

class PersonalInformation(models.Model):
    MR = 'Mr'
    MRS = 'Mrs'
    SALUTATION_CHOICES = [
      (MR, 'Mr.'),
      (MRS, 'Mrs.')
    ]

    DR = "DR"
    DR_MED = "DR_MED"
    DR_MED_DENT = "DR_MED_DENT"
    DR_PHARM = "DR_PHARM"
    DR_RER_HUM = "DR_RER_HUM"
    PROF = "PROF"
    PROF_DR = "PROF_DR"
    TITLE_CHOICES = [
      (DR, "Dr."),
      (DR_MED, "Dr. med."),
      (DR_MED_DENT, "Dr. med. dent."),
      (DR_PHARM, "Dr. pharm."),
      (DR_RER_HUM, "Dr. rer. hum."),
      (PROF, "Prof."),
      (PROF_DR, "Prof. Dr."),
    ]

    salutation = models.CharField(
        max_length=3,
        choices=SALUTATION_CHOICES,
        default=MR,
    )
    title = models.CharField(
        max_length=15,
        choices=TITLE_CHOICES,
        default=DR,
    )
    first_name = models.CharField("First name", max_length=255)
    last_name = models.CharField("Last name", max_length=255)

    def __str__(self):
        return self.first_name

class PrivateAddress(models.Model):
    address =  models.TextField(blank=True, null=True)
    street =  models.CharField(max_length=255, blank=True, null=True)
    city =  models.CharField(max_length=255, blank=True, null=True)
    # TODO: add validation to zipcode
    zipcode = models.CharField(max_length=20, blank=True)
    houseno =  models.CharField(max_length=255, blank=True, null=True)
    co = models.CharField(max_length=255, blank=True)
    apartment = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.address

class ContactDetails(models.Model):
    email = models.EmailField()
    mobile = models.CharField(max_length=20, blank=True)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.email

class AdditionalInformation(models.Model):
    ANCESTRY_CHOICES = [
      ("**", "No selection"),
      ("DE", "Germany"),
      ("TR", "Turkey"),
      ("PL", "Poland"),
      ("RU", "Russia"),
      ("AF", "Afghanistan"),
      ("AX", "Åland Islands"),
      ("AL", "Albania"),
      ("DZ", "Algeria"),
      ("AS", "American Samoa"),
      ("AD", "Andorra"),
      ("AO", "Angola"),
      ("AI", "Anguilla"),
      ("AQ", "Antarctica"),
      ("AG", "Antigua and Barbuda"),
      ("AR", "Argentina"),
      ("AM", "Armenia"),
      ("AW", "Aruba"),
      ("SH", "Ascensión y Tristán de Acuña"),
      ("AU", "Australia"),
      ("AT", "Austria"),
      ("AZ", "Azerbaijan"),
      ("BS", "Bahamas"),
      ("BH", "Bahrain"),
      ("BD", "Bangladesh"),
      ("BB", "Barbados"),
      ("BY", "Belarus"),
      ("BE", "Belgium"),
      ("BZ", "Belize"),
      ("BJ", "Benin"),
      ("BM", "Bermuda Islands"),
      ("BT", "Bhutan"),
      ("BO", "Bolivia"),
      ("BA", "Bosnia and Herzegovina"),
      ("BW", "Botswana"),
      ("BV", "Bouvet Island"),
      ("BR", "Brazil"),
      ("IO", "British Indian Ocean Territory"),
      ("BN", "Brunei"),
      ("BG", "Bulgaria"),
      ("BF", "Burkina Faso"),
      ("BI", "Burundi"),
      ("KH", "Cambodia"),
      ("CM", "Cameroon"),
      ("CA", "Canada"),
      ("CV", "Cape Verde"),
      ("KY", "Cayman Islands"),
      ("CF", "Central African Republic"),
      ("TD", "Chad"),
      ("CL", "Chile"),
      ("CN", "China"),
      ("CX", "Christmas Island"),
      ("CC", "Cocos (Keeling) Islands"),
      ("CO", "Colombia"),
      ("KM", "Comoros"),
      ("CK", "Cook Islands"),
      ("CR", "Costa Rica"),
      ("HR", "Croatia"),
      ("CU", "Cuba"),
      ("CY", "Cyprus"),
      ("CZ", "Czech Republic"),
      ("CD", "Democratic Republic of the Congo"),
      ("DK", "Denmark"),
      ("DJ", "Djibouti"),
      ("DM", "Dominica"),
      ("DO", "Dominican Republic"),
      ("TL", "East Timor"),
      ("EC", "Ecuador"),
      ("EG", "Egypt"),
      ("SV", "El Salvador"),
      ("GQ", "Equatorial Guinea"),
      ("ER", "Eritrea"),
      ("FM", "Estados Federados de"),
      ("EE", "Estonia"),
      ("ET", "Ethiopia"),
      ("FK", "Falkland Islands (Malvinas)"),
      ("FO", "Faroe Islands"),
      ("FJ", "Fiji"),
      ("FI", "Finland"),
      ("FR", "France"),
      ("GF", "French Guiana"),
      ("PF", "French Polynesia"),
      ("TF", "French Southern Territories"),
      ("GA", "Gabon"),
      ("GM", "Gambia"),
      ("GE", "Georgia"),
      ("GH", "Ghana"),
      ("GI", "Gibraltar"),
      ("GR", "Greece"),
      ("GL", "Greenland"),
      ("GD", "Grenada"),
      ("GP", "Guadeloupe"),
      ("GU", "Guam"),
      ("GT", "Guatemala"),
      ("GG", "Guernsey"),
      ("GN", "Guinea"),
      ("GW", "Guinea-Bissau"),
      ("GY", "Guyana"),
      ("HT", "Haiti"),
      ("HM", "Heard Island and McDonald Islands"),
      ("HN", "Honduras"),
      ("HK", "Hong Kong"),
      ("HU", "Hungary"),
      ("IS", "Iceland"),
      ("IN", "India"),
      ("ID", "Indonesia"),
      ("IR", "Iran"),
      ("IQ", "Iraq"),
      ("IE", "Ireland"),
      ("IM", "Isle of Man"),
      ("IL", "Israel"),
      ("IT", "Italy"),
      ("CI", "Ivory Coast"),
      ("JM", "Jamaica"),
      ("JP", "Japan"),
      ("JE", "Jersey"),
      ("JO", "Jordan"),
      ("KZ", "Kazakhstan"),
      ("KE", "Kenya"),
      ("KI", "Kiribati"),
      ("XK", "Kosovo"),
      ("KW", "Kuwait"),
      ("KG", "Kyrgyzstan"),
      ("LA", "Laos"),
      ("LV", "Latvia"),
      ("LB", "Lebanon"),
      ("LS", "Lesotho"),
      ("LR", "Liberia"),
      ("LY", "Libya"),
      ("LI", "Liechtenstein"),
      ("LT", "Lithuania"),
      ("LU", "Luxembourg"),
      ("MO", "Macao"),
      ("MK", "Macedonia"),
      ("MG", "Madagascar"),
      ("MW", "Malawi"),
      ("MY", "Malaysia"),
      ("MV", "Maldives"),
      ("ML", "Mali"),
      ("MT", "Malta"),
      ("MH", "Marshall Islands"),
      ("MQ", "Martinique"),
      ("MR", "Mauritania"),
      ("MU", "Mauritius"),
      ("YT", "Mayotte"),
      ("MX", "Mexico"),
      ("MD", "Moldova"),
      ("MC", "Monaco"),
      ("MN", "Mongolia"),
      ("ME", "Montenegro"),
      ("MS", "Montserrat"),
      ("MA", "Morocco"),
      ("MZ", "Mozambique"),
      ("MM", "Myanmar"),
      ("NA", "Namibia"),
      ("NR", "Nauru"),
      ("NP", "Nepal"),
      ("NL", "Netherlands"),
      ("AN", "Netherlands Antilles"),
      ("NC", "New Caledonia"),
      ("NZ", "New Zealand"),
      ("NI", "Nicaragua"),
      ("NE", "Niger"),
      ("NG", "Nigeria"),
      ("NU", "Niue"),
      ("NF", "Norfolk Island"),
      ("KP", "North Korea"),
      ("MP", "Northern Mariana Islands"),
      ("NO", "Norway"),
      ("OM", "Oman"),
      ("PK", "Pakistan"),
      ("PW", "Palau"),
      ("PS", "Palestine"),
      ("PA", "Panama"),
      ("PG", "Papua New Guinea"),
      ("PY", "Paraguay"),
      ("PE", "Peru"),
      ("PH", "Philippines"),
      ("PN", "Pitcairn Islands"),
      ("PT", "Portugal"),
      ("PR", "Puerto Rico"),
      ("QA", "Qatar"),
      ("CG", "Republic of the Congo"),
      ("RE", "Réunion"),
      ("RO", "Romania"),
      ("RW", "Rwanda"),
      ("BL", "Saint Barthélemy"),
      ("KN", "Saint Kitts and Nevis"),
      ("LC", "Saint Lucia"),
      ("MF", "Saint Martin (French part)"),
      ("PM", "Saint Pierre and Miquelon"),
      ("VC", "Saint Vincent and the Grenadines"),
      ("WS", "Samoa"),
      ("SM", "San Marino"),
      ("ST", "Sao Tome and Principe"),
      ("SA", "Saudi Arabia"),
      ("SN", "Senegal"),
      ("RS", "Serbia"),
      ("SC", "Seychelles"),
      ("SL", "Sierra Leone"),
      ("SG", "Singapore"),
      ("SK", "Slovakia"),
      ("SI", "Slovenia"),
      ("SB", "Solomon Islands"),
      ("SO", "Somalia"),
      ("ZA", "South Africa"),
      ("GS", "South Georgia and the South Sandwich Islands"),
      ("KR", "South Korea"),
      ("ES", "Spain"),
      ("LK", "Sri Lanka"),
      ("SD", "Sudan"),
      ("SR", "Suriname"),
      ("SJ", "Svalbard and Jan Mayen"),
      ("SZ", "Swaziland"),
      ("SE", "Sweden"),
      ("CH", "Switzerland"),
      ("SY", "Syria"),
      ("TW", "Taiwan"),
      ("TJ", "Tajikistan"),
      ("TZ", "Tanzania"),
      ("TH", "Thailand"),
      ("TG", "Togo"),
      ("TK", "Tokelau"),
      ("TO", "Tonga"),
      ("TT", "Trinidad and Tobago"),
      ("TN", "Tunisia"),
      ("TM", "Turkmenistan"),
      ("TC", "Turks and Caicos Islands"),
      ("TV", "Tuvalu"),
      ("UG", "Uganda"),
      ("UA", "Ukraine"),
      ("AE", "United Arab Emirates"),
      ("GB", "United Kingdom"),
      ("UM", "United States Minor Outlying Islands"),
      ("US", "United States of America"),
      ("VI", "United States Virgin Islands"),
      ("UY", "Uruguay"),
      ("UZ", "Uzbekistan"),
      ("VU", "Vanuatu"),
      ("VA", "Vatican City State"),
      ("VE", "Venezuela"),
      ("VN", "Vietnam"),
      ("VG", "Virgin Islands"),
      ("WF", "Wallis and Futuna"),
      ("EH", "Western Sahara"),
      ("YE", "Yemen"),
      ("ZM", "Zambia"),
      ("ZW", "Zimbabwe"),
    ]

    ancestry = models.CharField(
        max_length=2,
        choices=ANCESTRY_CHOICES,
        default="CN",
    )

    def __str__(self):
        return self.ancestry


class DeclarationOfConsent(models.Model):
    dataprotectionprivacy = models.BooleanField(default=True)

    def __str__(self):
        return self.dataprotectionprivacy

# TODO: split into multiple model elements (see web form): Personal information, Private address, Contact details, ...
# TODO: some fields shall be nullable, some not, see the online DKMS web form for reference
class Donor(models.Model):
    personal_information = models.OneToOneField(
        PersonalInformation,
        on_delete=models.CASCADE,
        null=True
    )

    private_address = models.OneToOneField(
        PrivateAddress,
        on_delete=models.CASCADE,
        null=True
    )

    contact_details = models.OneToOneField(
        ContactDetails,
        on_delete=models.CASCADE,
        null=True
    )

    additional_information = models.OneToOneField(
        AdditionalInformation,
        on_delete=models.CASCADE,
        null=True
    )

    declaration_of_consent = models.OneToOneField(
        DeclarationOfConsent,
        on_delete=models.CASCADE,
        null=True
    )

    # TODO: remove description from model
    description = models.TextField(blank=True, null=True)
    createdAt = models.DateTimeField("Created At", auto_now_add=True)

    def __str__(self):
        return self.personal_information.first_name

# Personal information:
# + salutation: Mr. / Mrs.
# + title: Dr., Dr. med., Dr. med. dent., Dr. pharm., Dr. rer. hum., Prof., Prof. Dr.
# + firstname
# + lastname
#
# Private address:
# + street
# + houseno
# + apartment (optional)
# + co (optional)
# + zipcode
# + city
#
# Contact details:
# + phone (private)
# + mobile
# + email
#
# Additional Information:
# + ancestry
#
# Declaration of Consent:
# + dataprotectionprivacy
