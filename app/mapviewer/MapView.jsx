import React from 'react'
import { MapContainer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapviewerStyle.css'
import BasemapLayer from '@/components/layers/BasemapLayer';
import LandCoverLayer from '@/components/layers/LandCoverLayer';
import ProvinceLayer from '@/components/layers/ProvinceLayer';
import DistrictLayer from '@/components/layers/DistrictLayer';
import ProtectedAreaLayer from '@/components/layers/ProtectedAreaLayer';
import EVILayer from '@/components/layers/EVILayer';
import RiceLayer from '@/components/layers/RiceLayer';
import RubberLayer from '@/components/layers/RubberLayer';

export default function MapView() {
    return (
        <MapContainer center={[12.562108, 100.888535]} zoom={7} zoomControl={false} className="map-container"> 
            <ZoomControl position="topright" />
            <BasemapLayer />
            <ProvinceLayer />
            <DistrictLayer />
            <ProtectedAreaLayer />
            <EVILayer />
            <LandCoverLayer />
            <RiceLayer />
            <RubberLayer />
        </MapContainer>
    )
}
