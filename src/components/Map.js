import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Map extends Component {

   state = {
     locations: [
       {name: 'Atlanta', location: {lat: 33.774483, lng: -84.382849}},
       {name: 'Belize', location: {lat: 17.490481,  lng: -88.202213}},
       {name: 'Cancun', location: {lat: 21.165197, lng: -86.827264}},
       {name: 'Cape Canaveral', location: {lat: 28.392157, lng: -80.596978}},
       {name: 'Costa Maya', location: {lat: 18.735196, lng:  -87.691022}},
       {name: 'Cozumel', location: {lat: 20.508578, lng: -86.947737}},
       {name: 'Dallas', location: {lat: 32.838814, lng: -96.786518}},
       {name: 'Grand Turk', location: {lat: 21.428566, lng: -71.143985}},
       {name: 'Green Cove Springs', location: {lat: 29.991212, lng: -81.689631}},
       {name: 'Jacksonville', location: {lat: 30.274438, lng:  -81.388347}},
       {name: 'Miami', location: {lat: 25.774763, lng: -80.130467}},
       {name: 'Nassau', location: {lat: 25.078643, lng:  -77.338089}},
       {name: 'New York', location: {lat: 40.736701, lng: -73.989334}},
       {name: 'Nocatee', location: {lat: 30.104096, lng:  -81.430318}},
       {name: 'Orlando', location: {lat: 28.546863, lng: -81.373917}},
       {name: 'Roatan', location: {lat: 16.357849, lng:  -86.442765}},
       {name: 'Saint-Martin', location: {lat: 18.0308266, lng: -63.0736329}},
       {name: 'St Augustine', location: {lat: 29.906616, lng: -81.314784}},
       {name: 'St Thomas', location: {lat: 18.339866, lng: -64.9249165}},
       {name: 'Washington D.C.', location: {lat: 38.890270, lng: -77.008907}}
     ],
     markers: [],
     infowindow: new this.props.google.maps.InfoWindow(),
     map: null,
     bounds: null
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
      const map = new maps.Map(node, mapConfig)
      const input = document.getElementById('search-input');
      const autocomplete = new google.maps.places.Autocomplete(input);
      const {infowindow} = this.state;
      const bounds = new maps.LatLngBounds();

      let markers = [];
      this.state.locations.map((location) => {
        const marker = new google.maps.Marker({
          position: {lat: location.location.lat, lng: location.location.lng},
          map: map,
          title: location.name
        })
        markers.push(marker)
        bounds.extend(marker.position)
        marker.addListener('click', () => {
          that.populateInfoWindow(marker, infowindow)
        })
      })
      map.fitBounds(bounds)
      this.setState({
        map,
        markers,
        bounds
      })

      // Bind the map's bounds (viewport) property to the autocomplete object,
      // so that the autocomplete requests use the current map bounds for the
      // bounds option in the request.
      autocomplete.bindTo('bounds', map);

      // Set the data fields to return when the user selects a place.
      autocomplete.setFields(
        [ 'geometry', 'name']
      );

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

  deletePlace = (e) => {
    let {markers} = this.state
    let markersArray = [];
    let event;
    let chosenOne = markers.filter((marker) => {
      event = e.va.currentTarget.title
      if(marker.title === event) {
        return true
      } else {
        markersArray.push(marker)
        return false
      }
    });
  }

  populateInfoWindow = (marker, infowindow) => {
    if (infowindow.marker !== marker) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      infowindow.marker = marker;
      infowindow.setContent(`<h2>${marker.title}</h2><button id='Learn_more'><a href='/learnmore?name=${marker.title}'>Learn more</a></button>`);
      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
        marker.setAnimation(null);
      });
    }
  }

  render() {
    const { locations } = this.state
    return (
      <div>
        <div className="container">
          <div className="text-input" style={{left: '-200px',overflowY: 'scroll', overflowX: 'hidden'}}>
            <input role="search" type="text" value={this.state.value} onChange={this.handleValueChange} id="search-input"/>
            <ul className="locations-list">
              {
                locations.map((m, i) =>
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
