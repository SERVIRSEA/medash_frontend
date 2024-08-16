import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { GeoJSON} from 'react-leaflet';

import { 
    districtDataAtom,
    districtVisibilityAtom,
    tempAreaTypeAtom,
    tempAreaIdAtom,
    tempAreaNameAtom,
} from '@/state/atoms';
import { GeoserverFetcher } from '@/fetchers/GeoserverFetcher';

function DistrictLayer(){
    const [showDistrictLayer] = useAtom(districtVisibilityAtom);
    const [districtData, setDistrictData] = useAtom(districtDataAtom);
    const activeLayer = useRef(null); 
    const [, setTempAreaType] = useAtom(tempAreaTypeAtom);
    const [, setTempAreaId] = useAtom(tempAreaIdAtom);
    const [, setTempAreaName] = useAtom(tempAreaNameAtom);

    useEffect(() => {
        const params = {
            service: 'WFS',
            version: '1.3.0',
            request: 'GetFeature',
            typeName: 'khm:cambodia_district', 
            outputFormat: 'application/json',  
        };
        const fetchDistrictData = async () => {
            const fetchedData = await GeoserverFetcher(params);
            setDistrictData(fetchedData);
        };
        fetchDistrictData();
    }, [setDistrictData]);

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

    const handleDistrictFeatureClick = (e) => {
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

        const area_id = featureProperties.dist_code;
        const area_type = "district";
        const area_name = featureProperties.dist_name;

        setTempAreaType(area_type);
        setTempAreaId(area_id);
        setTempAreaName(area_name);
    };

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

    const onEachFeatureDistrict = (feature, layer) => {
        layer.bindTooltip(feature.properties.dist_name, {
            permanent: false, 
            direction: 'auto', 
            opacity: 1
        });

        layer.on({
            mouseover: handleMouseover,
            mouseout: handleMouseout,
            click: handleDistrictFeatureClick, 
        });
    }

    return (
        <>
            { showDistrictLayer && districtData && <GeoJSON style={defaultStyle} data={districtData} onEachFeature={onEachFeatureDistrict} />} 
        </>
    )
}

export default DistrictLayer;

