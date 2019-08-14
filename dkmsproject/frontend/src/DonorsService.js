import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class DonorsService {

    createDonor(donor) {
        const url = `${API_URL}/api/backend/`;
        const donor_dict = {
          'personal_information':
            {
              'salutation': donor.salutation,
              'title': donor.title,
              'first_name': donor.first_name,
              'last_name': donor.last_name
            },
          email: donor.email,
          phone: donor.phone,
          mobile: donor.mobile,
          address: donor.address,
          street: donor.street,
          city: donor.city,
          houseno: donor.houseno,
          zipcode: donor.zipcode,
          co: donor.co,
          apartment: donor.apartment,
          description: donor.description,
          ancestry: donor.ancestry,
          ancestry_choices: donor.ancestry_choices,
          dataprotectionprivacy: donor.dataprotectionprivacy
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
