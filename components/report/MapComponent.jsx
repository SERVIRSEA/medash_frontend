import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import BasemapLayer from '../layers/BasemapLayer';

const MapComponent = ({tileUrl='', width = '100%', height = '300px' }) => {
  const mapContainerStyle = {
    // position: 'fixed',
    width: width,
    height: height
  };

  return (
    <MapContainer
      center={[12.762108, 105.388535]} 
      zoom={6} 
      zoomControl={false} 
      style={mapContainerStyle} 
    >
      <BasemapLayer />
      {tileUrl && <TileLayer url={tileUrl} />}
    </MapContainer>
  );
}

export default MapComponent;