import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route } from 'react-router-dom';
import '../App.css';
import Map from './Map';
import { GoogleApiWrapper } from 'google-maps-react'
import LearnMore from './LearnMore';

class App extends Component {
  render() {
    return (
      <div>
        <a className="menu" tabIndex="0">
          <svg className="hamburger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
          </svg>
        </a>
        <h1 className="heading"> Google Maps API + React </h1>
        <Route path='/' exact render={(props) => <Map google={this.props.google}/>} />
        <Route path='/learnmore' component={LearnMore} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqeCAur3WuwLz9vaZyfuVA4WzfqSFjmiM'
})(App)
