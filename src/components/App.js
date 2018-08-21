import React, { Component } from 'react';
import logo from '../logo.svg';
import { Route } from 'react-router-dom';
import '../App.css';
import Map from './Map';
import { GoogleApiWrapper } from 'google-maps-react'
import LearnMore from './LearnMore';

let visible = false

class App extends Component {
  state = {
    name: ''
  }

  updateName = (name) => {
    this.setState({
      name: name
    })
  }

  onclickMenu = () => {
    const menu = document.getElementsByClassName('menu')
    const list = document.getElementsByClassName('text-input')
    console.log(list[0])
    if (visible === true){
      list[0].style.left = "-200px";
      list[0].style.transition = "left 1s ease-in-out";
      visible = false;
    } else{
      visible = true
      list[0].style.left = "0"
      list[0].style.transition = "left 1s ease-in-out";
    }
  }

  render() {
    return (
      <div>
        <a onClick={this.onclickMenu} className="menu" tabIndex="0">
          <svg className="hamburger-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M2 6h20v3H2zm0 5h20v3H2zm0 5h20v3H2z"/>
          </svg>
        </a>
        <h1 className="heading"> Google Maps API + React </h1>
        <Route path='/' exact render={(props) => <Map updateName={this.updateName} google={this.props.google}/>} />
        <Route path='/learnmore' component={LearnMore} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBqeCAur3WuwLz9vaZyfuVA4WzfqSFjmiM'
})(App)
