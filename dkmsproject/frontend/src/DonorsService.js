import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class DonorsService {

    createDonor(donor) {
        const url = `${API_URL}/api/backend/`;
        const donor_dict = {
          personal_information: {
              salutation: donor.salutation,
              title: donor.title,
              first_name: donor.first_name,
              last_name: donor.last_name
            },
          private_address: {
              address: donor.address,
              street: donor.street,
              city: donor.city,
              zipcode: donor.zipcode,
              houseno: donor.houseno,
              co: donor.co,
              apartment: donor.apartment,
            },
          contact_details: {
            email: donor.email,
            mobile: donor.mobile,
            phone: donor.phone,
          },
          additional_information: {
            ancestry: donor.ancestry
          },
          declaration_of_consent: {
            dataprotectionprivacy: donor.dataprotectionprivacy
          },
          // TODO: das sieht falsch aus, deswegen in DonorCreate_spec.js programmatisch testen, ob dieses Feld in der UI korrekt gesetzt wird.
          ancestry_choices: donor.ancestry_choices,
        };
        return axios.post(url, donor_dict);
    }

    get_ancestry_choices_promise() {
      const url = `${API_URL}/api/backend/ancestry_choices`;
      return axios
        .get(url)
        .then(response => { return response.data; })
    }
}
