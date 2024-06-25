import React, { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { GeoJSON} from 'react-leaflet';

import { 
    protectedAreaDataAtom, 
    protectedAreaVisibilityAtom,
    tempAreaTypeAtom,
    tempAreaIdAtom,
    tempAreaNameAtom,
} from '@/state/atoms';
import { GeoserverFetcher } from '@/fetchers/GeoserverFetcher';

function ProtectedAreaLayer(){
    const [showPALayer] = useAtom(protectedAreaVisibilityAtom);
    const [protectedAreaData, setProtectedAreaData] = useAtom(protectedAreaDataAtom);
    const activeLayer = useRef(null); 
    const [, setTempAreaType] = useAtom(tempAreaTypeAtom);
    const [, setTempAreaId] = useAtom(tempAreaIdAtom);
    const [, setTempAreaName] = useAtom(tempAreaNameAtom);

    useEffect(() => {
        const params = {
            service: 'WFS',
            version: '1.3.0',
            request: 'GetFeature',
            typeName: 'khm:PAs2023_epsg4326', 
            outputFormat: 'application/json',  
        };
        const fetchProtectedAreaData = async () => {
            const fetchedPAData = await GeoserverFetcher(params);
            setProtectedAreaData(fetchedPAData);
        };
        fetchProtectedAreaData();
    }, [setProtectedAreaData]);

    const defaultStyle = () => {
        return {
            color: '#1f2021',
            weight: 1,
            fillOpacity: 0.0,
            fillColor: '#ffcc33',
        };
    };
    
    const highlightStyle = () => {
        return {
            color: '#FF0000',  
            fillColor: '#ffcc33',  
            fillOpacity: 0.1,
            weight: 5
        };
    };

    const handlePAFeatureClick = (e) => {
        const layer = e.target;
        layer.bringToFront();
        const featureProperties = layer.feature.properties;

        // Reset style of the previous active layer if it exists
        if (activeLayer.current) {
            activeLayer.current.setStyle(defaultStyle());
        }

        // Set this layer as the active one
        activeLayer.current = layer;

        // Apply the highlight style
        layer.setStyle(highlightStyle());

        const area_id = featureProperties.PA_ID;
        const area_type = "protected_area";
        const area_name = featureProperties.PA_NAME;

        setTempAreaType(area_type);
        setTempAreaId(area_id);
        setTempAreaName(area_name);
    }

    const handleMouseover = (e) => {
        const layer = e.target;
        layer.setStyle(highlightStyle());
    }

    const handleMouseout = (e) => {
        const layer = e.target;
        // Only reset style if this isn't the active layer
        if (layer !== activeLayer.current) {
            layer.setStyle(defaultStyle());
        }
    }
    const onEachFeatureProtectedArea = (feature, layer) => {
        layer.on({
            mouseover: handleMouseover,
            mouseout: handleMouseout,
            click: handlePAFeatureClick, 
        });
    }

    return (
        <>
            { showPALayer && protectedAreaData && <GeoJSON style={defaultStyle} data={protectedAreaData} onEachFeature={onEachFeatureProtectedArea} />}
        </>
    )
}

export default ProtectedAreaLayer;

