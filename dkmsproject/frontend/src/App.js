import React, { Component } from 'react';
import CustomerCreate  from './CustomerCreate'
import DonorsService from './DonorsService';
import './App.css';

class App extends Component {
  render() {
    return (
      <CustomerCreate createCustomer={new DonorsService().createCustomer}/>
    );
  }
}

export default App;
