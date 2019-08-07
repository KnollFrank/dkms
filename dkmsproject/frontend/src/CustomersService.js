import axios from 'axios';
const API_URL = 'http://localhost:8000';

export default class CustomersService{

    createCustomer(customer){
        const url = `${API_URL}/api/backend/`;
        return axios.post(url,customer);
    }
}
