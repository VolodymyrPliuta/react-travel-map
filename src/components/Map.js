import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import LearnMore from './LearnMore';

export default class Map extends Component {

  state = {
    newLocations: [],
    locations: [
      //   {name: 'Jacksonville', location: {lat: 30.274438, lng:  -81.388347}},
      //   {name: 'Orlando', location: {lat: 28.546863, lng: -81.373917}},
      //   {name: 'Cape Canaveral', location: {lat: 28.392157, lng: -80.596978}},
      //   {name: 'Miami', location: {lat: 25.774763, lng: -80.130467}},
      //   {name: 'St Augustine', location: {lat: 29.906616, lng: -81.314784}},
      //   {name: 'Green Cove Springs', location: {lat: 29.991212, lng: -81.689631}},
      //   {name: 'Nocatee', location: {lat: 30.104096, lng:  -81.430318}},
      //   {name: 'Dallas', location: {lat: 32.838814, lng: -96.786518}},
      //   {name: 'Atlanta', location: {lat: 33.774483, lng: -84.382849}},
      //   {name: 'Washington D.C.', location: {lat: 38.890270, lng: -77.008907}},
      //   {name: 'New York', location: {lat: 40.736701, lng: -73.989334}},
      //   {name: 'Cozumel', location: {lat: 20.508578, lng: -86.947737}},
      //   {name: 'Cancun', location: {lat: 21.165197, lng: -86.827264}},
      //   {name: 'Costa Maya', location: {lat: 18.735196, lng:  -87.691022}},
      {name: 'Belize', location: {lat: 17.490481,  lng: -88.202213}},
      {name: 'Roatan', location: {lat: 16.357849, lng:  -86.442765}},
      {name: 'St Thomas', location: {lat: 18.339866, lng: -64.9249165}},
      {name: 'Saint-Martin', location: {lat: 18.0308266, lng: -63.0736329}},
      {name: 'Grand Turk', location: {lat: 21.428566, lng: -71.143985}},
      {name: 'Nassau', location: {lat: 25.078643, lng:  -77.338089}}
    ],
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow(),
    imgs: []
  }
  componentDidMount() {
    this.loadMap()
    this.onclickLocation()
  }
  loadMap() {
    if (this.props && this.props.google) {
      const that = this
      const {google} = this.props
      const maps = google.maps
      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)
      const mapConfig = Object.assign({}, {
        mapTypeId: 'roadmap' })
      this.map = new maps.Map(node, mapConfig)
      const input = document.getElementById('search-input');
      const autocomplete = new google.maps.places.Autocomplete(input);
      const {infowindow} = this.state;
      this.addMarkers()

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo('bounds', this.map);

      // Set the data fields to return when the user selects a place.
      autocomplete.setFields(
        [ 'geometry', 'name']);

      autocomplete.addListener('place_changed', function() {
        infowindow.close();
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          // User entered the name of a Place that was not suggested and
          // pressed the Enter key, or the Place Details request failed.
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        let newlocation = {
          name: place.name,
          location: {lat: lat, lng: lng}
        }
        that.setState(state => ({
          newLocations: [...state.newLocations, newlocation]
        }))
        that.addMarkers()
      });
    }
  }


  onclickLocation =  () => {
    const { infowindow } = this.state

    const displayInfowindow = (e) => {
      const {markers} = this.state

      const markerInd = markers.findIndex(m => m.title.toLowerCase() === e.target.innerText.toLowerCase())
      this.populateInfoWindow(markers[markerInd], infowindow)
    }
    document.querySelector('.locations-list').addEventListener('click', function (e) {
      if(e.target && e.target.nodeName === "LI") {
        displayInfowindow(e)
      }
    })
  }

  handleValueChange = (e) => {
    this.setState({query: e.target.value})
  }

  addMarkers = (initialLoad) => {
    const {google} = this.props
    const { infowindow } = this.state
    const bounds = new google.maps.LatLngBounds();

    this.state.locations.map(location => {
      const marker = new google.maps.Marker({
        position: {lat: location.location.lat, lng: location.location.lng},
        map: this.map,
        title: location.name
      });

      marker.addListener('click', () => {
        this.populateInfoWindow(marker, infowindow)
      })
      marker.addListener('dblclick', (e) => {
        this.deletePlace(e)
      })

      if(initialLoad) {
        this.setState((state) => ({
          markers: [...state.markers, marker]
        }))
      }
      bounds.extend(marker.position)
    })
    this.state.newLocations.map(newLocation => {
      const newmarker = new google.maps.Marker({
        position: {lat: newLocation.location.lat, lng: newLocation.location.lng},
        map: this.map,
        title: newLocation.name,
        icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      });

      newmarker.addListener('click', () => {
        this.populateInfoWindow(newmarker, infowindow)
      })
      newmarker.addListener('dblclick', (e) => {
        this.deletePlace(e)
      })

      this.setState((state) => ({
        markers: [...state.markers,newmarker]
      }))
      bounds.extend(newmarker.position)
    })

    this.map.fitBounds(bounds)
  }

  deletePlace = (e) => {
    const {markers} = this.state
    let fooArr = [];
    let event;
    let chosenOne = markers.filter((marker) => {
      console.log(e)
      if(e.hasOwnProperty('Ha')){
        event = e.Ha.currentTarget.title
      }
      else{ event = e.va.currentTarget.title }
      if(marker.title === event) {
        return true
      } else {
        fooArr.push(marker)
        return false
      }
    });
    if(chosenOne.length > 0) {
      chosenOne[0].setMap(null)
    }
    this.setState({
      markers: fooArr
    })
    chosenOne = markers.filter((marker) =>
      marker.title === event
    );
  }

  populateInfoWindow = (marker, infowindow) => {
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent(`<h2>${marker.title} onClick works</h2><button id='Learn_more'><a href='/learnmore?name=${marker.title}'>Learn more</a></button>`);
      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  }

  render() {
    const { markers,locations,newLocations } = this.state
    return (
      <div>
        <div className="container">
          <div className="text-input" style={{left: '-200px'}}>
            <input role="search" type="text" value={this.state.value} onChange={this.handleValueChange} id="search-input"/>
            <ul className="locations-list">
              {
                locations.map((m, i) =>
                  <li key={i}>{m.name}</li>
                )
              }
              {
                newLocations.map((m, i) =>
                  <li key={i}>{m.name}</li>
                )
              }
            </ul>
          </div>
          <div role="application" className="map" ref="map">
            loading map...
          </div>
        </div>
      </div>
    )
  }
}
