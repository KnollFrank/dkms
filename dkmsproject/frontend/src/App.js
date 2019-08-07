import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  CustomersList from './CustomersList'
import  CustomerCreateUpdate  from './CustomerCreateUpdate'
import './App.css';

class App extends Component {
  render() {
    return (
      <CustomerCreateUpdate match=""/>
    );
  }
}

export default App;
