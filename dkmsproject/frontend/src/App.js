import React, { Component } from 'react';
import CustomerCreate  from './CustomerCreate'
import CustomersService from './CustomersService';
import './App.css';

class App extends Component {
  render() {
    return (
      <CustomerCreate createCustomer={new CustomersService().createCustomer}/>
    );
  }
}

export default App;
