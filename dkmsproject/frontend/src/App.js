import React, { Component } from 'react';
import DonorCreate  from './DonorCreate'
import DonorsService from './DonorsService';
import './App.css';

class App extends Component {
  render() {
    return (
      <DonorCreate createDonor={new DonorsService().createDonor}/>
    );
  }
}

export default App;
