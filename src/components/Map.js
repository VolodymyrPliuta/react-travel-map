import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Map extends Component {

  state = {
    locations: [
      {name: 'Jacksonville', location: {lat: 30.274438, lng:  -81.388347}},
      {name: 'Orlando', location: {lat: 28.546863, lng: -81.373917}},
      {name: 'Cape Canaveral', location: {lat: 28.392157, lng: -80.596978}},
      {name: 'Miami', location: {lat: 25.774763, lng: -80.130467}},
      {name: 'St Augustine', location: {lat: 29.906616, lng: -81.314784}},
      {name: 'Green Cove Springs', location: {lat: 29.991212, lng: -81.689631}},
      {name: 'Nocatee', location: {lat: 30.104096, lng:  -81.430318}},
      {name: 'Dallas', location: {lat: 32.838814, lng: -96.786518}},
      {name: 'Atlanta', location: {lat: 33.774483, lng: -84.382849}},
      {name: 'Washington D.C.', location: {lat: 38.890270, lng: -77.008907}},
      {name: 'New York', location: {lat: 40.736701, lng: -73.989334}},
      {name: 'Cozumel', location: {lat: 20.508578, lng: -86.947737}},
      {name: 'Cancun', location: {lat: 21.165197, lng: -86.827264}},
      {name: 'Costa Maya', location: {lat: 18.735196, lng:  -87.691022}},
      {name: 'Belize', location: {lat: 17.490481,  lng: -88.202213}},
      {name: 'Roatan', location: {lat: 16.357849, lng:  -86.442765}},
      {name: 'St Thomas', location: {lat: 18.339866, lng: -64.9249165}},
      {name: 'Saint-Martin', location: {lat: 18.0308266, lng: -63.0736329}},
      {name: 'Grand Turk', location: {lat: 21.428566, lng: -71.143985}},
      {name: 'Nassau', location: {lat: 25.078643, lng:  -77.338089}}
    ],
    query: '',
    markers: [],
    infowindow: new this.props.google.maps.InfoWindow()
  }
  componentDidMount() {
    this.loadMap()
  }
  loadMap() {
    if (this.props && this.props.google) {
      const {google} = this.props
      const maps = google.maps
      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)
      const mapConfig = Object.assign({}, {
        zoom: 5,
        center: {lat: 30.274438, lng: -81.388347},
        mapTypeId: 'roadmap' })
      this.map = new maps.Map(node, mapConfig)
      this.addMarkers()
    }
  }

  addMarkers = () => {
    const {google} = this.props
    let { infowindow } = this.state
    const bounds = new google.maps.LatLngBounds();

    let loc = this.state.locations.map ( location => {
      const marker = new google.maps.Marker({
        position: {lat: location.location.lat, lng: location.location.lng},
        map: this.map,
        title: location.name
      });

      marker.addListener('click', () => {
        this.populateInfoWindow(marker, infowindow)
      })

      this.setState((state) => {
        markers: [...state.markers, marker]
      })
      bounds.extend(marker.position)
    })
    this.map.fitBounds(bounds)
  }

  populateInfoWindow = (marker, infowindow) => {
    if (infowindow.marker !== marker) {
      infowindow.marker = marker;
      infowindow.setContent(`<h2>onClick works</h4>`);
      infowindow.open(this.map, marker);
      // Make sure the marker property is cleared if the infowindow is closed.
      infowindow.addListener('closeclick', function() {
        infowindow.marker = null;
      });
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="sidebar text-input text-input-hidden">
          </div>
          <div role="application" className="map" ref="map">
            loading map...
          </div>
        </div>
      </div>
    )
  }
}
