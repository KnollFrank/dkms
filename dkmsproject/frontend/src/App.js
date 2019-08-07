import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router-dom'

import  CustomersList from './CustomersList'
import  CustomerCreate  from './CustomerCreate'
import './App.css';

class App extends Component {
  render() {
    return (
      <CustomerCreate match=""/>
    );
  }
}

export default App;
