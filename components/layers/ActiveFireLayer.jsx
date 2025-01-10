import React from 'react';
import { useAtom } from 'jotai';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet'; // Import Leaflet for marker styles
import { 
    activeFireDataAtom, 
    activeFireMapVisibilityAtom, 
    activeFireDataLoadingAtom, 
    activeFireDataErrorAtom 
} from '@/state/activeFireAtom';

const ActiveFireLayer = () => {
    const [isVisible] = useAtom(activeFireMapVisibilityAtom);
    const [fireData] = useAtom(activeFireDataAtom);
    
    // Function to style each GeoJSON point
    const pointStyle = (feature) => {
        // You can style each feature based on its properties
        return {
            radius: 2, 
            fillColor: feature.properties.bright_ti4 > 300 ? 'red' : 'orange', // Color based on 'bright_ti4'
            color: 'red',
            weight: 1, 
            opacity: 1, 
            fillOpacity: 0.8 
        };
    };

    // Function to convert GeoJSON data into Leaflet markers
    const pointToLayer = (feature, latlng) => {
        return L.circleMarker(latlng, pointStyle(feature)); // Use circleMarker for styling points
    };

    return (
        <>
            {isVisible && fireData && (
                <GeoJSON 
                    data={fireData} 
                    pointToLayer={pointToLayer} // Apply custom style
                />
            )}
        </>
    );
};

export default ActiveFireLayer;