import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Map from './Map';
import { GoogleApiWrapper } from 'google-maps-react'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Map  google={this.props.google}/>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqeCAur3WuwLz9vaZyfuVA4WzfqSFjmiM'
})(App)
