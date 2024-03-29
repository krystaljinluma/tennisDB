import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
    render() {
      return (
        <Map 
        google={this.props.google}
        style={{height: '36%', width: '25%',"max-height":220,"max-width":300}} 
        initialCenter={this.props.center}
        zoom={10}
        >
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
        </Map>
      );
    }
  }
   
  export default GoogleApiWrapper({
    apiKey: ("AIzaSyCJAYOBTxSYR6_sP_xx9xw7BpdKVE4TFiM")
  })(MapContainer)
