import React, {useState} from 'react'
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
import FireLayer from '@/components/layers/FireLayer';
import GLADAlertLayer from '@/components/layers/GLADAlertLayer';
import SARAlertLayer from '@/components/layers/SARAlertLayer';
import ForestGainLayer from '@/components/layers/ForestGainLayer';
import ForestLossLayer from '@/components/layers/ForestLossLayer';
import ForestExtentLayer from '@/components/layers/ForestExtentLayer';
import DroughtLayer from '@/components/layers/DroughtLayer';
import PastTemperatureLayer from '@/components/layers/PastTemperatureLayer';
import PastRainfallLayer from '@/components/layers/PastRainfallLayer';
import ForecastRainfallLayer from '@/components/layers/ForecastRainfallLayer';
import ForecastTemperatureLayer from '@/components/layers/ForecastTemperatureLayer';
import SeasonalRainfallLayer from '@/components/layers/SeasonalRainfallLayer';
import SeasonalTemperatureLayer from '@/components/layers/SeasonalTemperatureLayer';
import SARFDASAlertLayer from '@/components/layers/SARFDASAlertLayer';
import CustomZoomControl from '@/components/controls/CustomZoomControl';
import DrawControl from '@/components/draw/DrawControl';
import AreaSelector from '@/components/selectors/AreaSelector';
import MapControls from '@/components/controls/MapControls';
import LocationLayer from '@/components/layers/LocationLayer';
import ActiveFireLayer from '@/components/layers/ActiveFireLayer';

export default function MapView() {
    return (
        <MapContainer center={[11.862108, 103.288535]} zoom={7} zoomControl={false} className="map-container"> 
            <AreaSelector />
            <CustomZoomControl />
            <MapControls />
            <BasemapLayer />
            <LocationLayer />
            <ProvinceLayer />
            <DistrictLayer />
            <ProtectedAreaLayer />
            <EVILayer />
            <LandCoverLayer />
            <RiceLayer />
            <RubberLayer />
            <GLADAlertLayer />
            <SARAlertLayer />
            <FireLayer />
            <ActiveFireLayer />
            <ForestGainLayer />
            <ForestLossLayer />
            <ForestExtentLayer />
            <DroughtLayer />
            <PastRainfallLayer />
            <ForecastRainfallLayer />
            <SeasonalRainfallLayer />
            <PastTemperatureLayer />
            <ForecastTemperatureLayer />
            <SeasonalTemperatureLayer />
            <SARFDASAlertLayer />
            <DrawControl />
        </MapContainer>
    )
}
