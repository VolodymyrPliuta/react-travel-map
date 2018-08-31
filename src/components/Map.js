import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Map extends Component {

   state = {
     locations: [
       {name: 'Atlanta', location: {lat: 33.774483, lng: -84.382849}, visible: true},
       {name: 'Belize', location: {lat: 17.490481,  lng: -88.202213}, visible: true},
       {name: 'Cancun', location: {lat: 21.165197, lng: -86.827264}, visible: true},
       {name: 'Cape Canaveral', location: {lat: 28.392157, lng: -80.596978}, visible: true},
       {name: 'Costa Maya', location: {lat: 18.735196, lng:  -87.691022}, visible: true},
       {name: 'Cozumel', location: {lat: 20.508578, lng: -86.947737}, visible: true},
       {name: 'Dallas', location: {lat: 32.838814, lng: -96.786518}, visible: true},
       {name: 'Grand Turk', location: {lat: 21.428566, lng: -71.143985}, visible: true},
       {name: 'Green Cove Springs', location: {lat: 29.991212, lng: -81.689631}, visible: true},
       {name: 'Jacksonville', location: {lat: 30.274438, lng:  -81.388347}, visible: true},
       {name: 'Miami', location: {lat: 25.774763, lng: -80.130467}, visible: true},
       {name: 'Nassau', location: {lat: 25.078643, lng:  -77.338089}, visible: true},
       {name: 'New York', location: {lat: 40.736701, lng: -73.989334}, visible: true},
       {name: 'Nocatee', location: {lat: 30.104096, lng:  -81.430318}, visible: true},
       {name: 'Orlando', location: {lat: 28.546863, lng: -81.373917}, visible: true},
       {name: 'Roatan', location: {lat: 16.357849, lng:  -86.442765}, visible: true},
       {name: 'Saint-Martin', location: {lat: 18.0308266, lng: -63.0736329}, visible: true},
       {name: 'St Augustine', location: {lat: 29.906616, lng: -81.314784}, visible: true},
       {name: 'St Thomas', location: {lat: 18.339866, lng: -64.9249165}, visible: true},
       {name: 'Washington D.C.', location: {lat: 38.890270, lng: -77.008907}, visible: true}
     ],
     markers: [],
     infowindow: new this.props.google.maps.InfoWindow(),
     map: null,
     bounds: null,
     defaultMarkers: null,
     defaultLocations: null
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
      //      const autocomplete = new google.maps.places.Autocomplete(input);
      const {infowindow} = this.state;
      const bounds = new maps.LatLngBounds();


      this.setState({
        defaultLocations: this.state.locations
      })

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
      input.addEventListener('keyup', (e) => {
        let input = e.target.value
        let locations = this.state.locations.map((location) => {

          // Check if current marker matches criteria (user input)
          const isVisible = location.name.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          // Ensure marker is defined before performing any operations on it
          if(location){
            location.visible = isVisible
          }
          return location;
        })
        this.setState({
          locations
        })
        // Iterate over markers to we can determine if they should remain visible
        let markers = this.state.markers.map((marker) => {
          // Check if current marker matches criteria (user input)
          const isVisible = marker.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          // Ensure marker is defined before performing any operations on it
          if(marker){
            marker.setVisible(isVisible)
          }
          return marker;
        })
        this.setState({
          markers
        })
      })
      map.fitBounds(bounds)
      this.setState({
        map,
        markers,
        defaultMarkers: markers,
        bounds
      })
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
                locations.map((m, i) => {
                  if(m.visible){
                    return  <li key={i}>{m.name}</li>
                  }})
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
