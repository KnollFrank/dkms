import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class DonorsService {

    createDonor(donor) {
        const url = `${API_URL}/api/backend/`;
        return axios.post(url, donor);
    }

    get_ancestry_choices() {
      const url = `${API_URL}/api/backend/ancestry_choices`;
      return axios
        .get(url)
        .then(response => { return response.data; })
    }
}
