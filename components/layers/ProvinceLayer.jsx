import React, { useEffect, useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { 
    provinceDataAtom, 
    provinceVisibilityAtom,
    tempAreaTypeAtom,
    tempAreaIdAtom,
    tempAreaNameAtom,
} from '@/state/atoms';

import { GeoserverFetcher } from '@/fetchers/GeoserverFetcher';

function ProvinceLayer(){
    const [showProvinceLayer] = useAtom(provinceVisibilityAtom);
    const [provinceData, setProvinceData] = useAtom(provinceDataAtom);
    const activeLayer = useRef(null); 
    const [, setTempAreaType] = useAtom(tempAreaTypeAtom);
    const [, setTempAreaId] = useAtom(tempAreaIdAtom);
    const [, setTempAreaName] = useAtom(tempAreaNameAtom);

    const params = {
        service: 'WFS',
        version: '1.3.0',
        request: 'GetFeature',
        typeName: 'khm:cambodia_province', 
        outputFormat: 'application/json',  
    };

    useEffect(() => {
        const fetchProvinceData = async () => {
            const fetchedData = await GeoserverFetcher(params);
            setProvinceData(fetchedData);
        };
        fetchProvinceData();   
    }, []); 

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

    const handleProvinceFeatureClick = (e) => {
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
        
        
        const area_id = featureProperties.gid;
        const area_type = "province";
        const area_name = featureProperties.name;

        setTempAreaId(area_id);
        setTempAreaType(area_type);
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

    const onEachFeatureProvince = (feature, layer) => {
        layer.on({
            click: handleProvinceFeatureClick,
            mouseover: handleMouseover,
            mouseout: handleMouseout,
        });
    }

    return (
        <>
            { showProvinceLayer 
                && provinceData 
                && <GeoJSON 
                    style={defaultStyle} 
                    data={provinceData} 
                    onEachFeature={onEachFeatureProvince} 
                />}
        </>
    )
}

export default ProvinceLayer;

