import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { GeoJSON} from 'react-leaflet';

import { 
    selectedFeatureAtom, 
    protectedAreaDataAtom, 
    protectedAreaVisibilityAtom,
    tempAreaTypeAtom,
    tempAreaIdAtom,
    tempAreaNameAtom,
} from '@/state/atoms';

import { protectedAreaFetcher } from '@/fetchers/protectedAreaFetcher';

function ProtectedAreaLayer(){
    const [showPALayer] = useAtom(protectedAreaVisibilityAtom);
    const [protectedAreaData, setProtectedAreaData] = useAtom(protectedAreaDataAtom);
    const [activeLayer, setActiveLayer] = useState(null);
    const [, setSelectedFeature] = useAtom(selectedFeatureAtom);
    const [, setTempAreaType] = useAtom(tempAreaTypeAtom);
    const [, setTempAreaId] = useAtom(tempAreaIdAtom);
    const [, setTempAreaName] = useAtom(tempAreaNameAtom);

    const defaultStyle = {
        fillColor: 'red',
        fillOpacity: 0.0,
        color: '#000',
        weight: 1
    };

    const highlightStyle = {
        color: '#FF0000',  // Highlight stroke color
        fillColor: '#FF0000',  // Highlight fill color
        fillOpacity: 0.1,
        weight: 5
    };

    useEffect(() => {
        const fetchProtectedAreaData = async () => {
            const fetchedPAData = await protectedAreaFetcher();
            setProtectedAreaData(fetchedPAData);
            // console.log(fetchedData)
        };
        fetchProtectedAreaData();
    }, []);

    const handlePAFeatureClick = (e) => {
        const selected_feature = e.target.feature;
        const area_id = selected_feature.properties.map_id;
        const area_type = "protected_area";
        const area_name = selected_feature.properties.name;
        setTempAreaType(area_type);
        setTempAreaId(area_id);
        setTempAreaName(area_name);

        const clickedLayer = e.target;

        // if (activeLayer) {
        //     // Reset style of the previously active feature
        //     activeLayer.setStyle(defaultStyle);
        // }

        // Set style of the currently clicked feature
        clickedLayer.setStyle(highlightStyle);

        // Update activeLayer
        setActiveLayer(selected_feature);
    }

    // const handleMouseover = (e) => {
    //     e.target.setStyle(highlightStyle);
    // }

    // const handleMouseout = (e) => {
    //     e.target.setStyle(defaultStyle);
    // }

    const onEachFeatureProtectedArea = (feature, layer) => {
        layer.on({
            // mouseover: handleMouseover,
            // mouseout: handleMouseout,
            click: handlePAFeatureClick, // Feature click e to handle selection
        });
    }

    return (
        <>
            { showPALayer && protectedAreaData && <GeoJSON style={defaultStyle} data={protectedAreaData} onEachFeature={onEachFeatureProtectedArea} />}
        </>
    )
}

export default ProtectedAreaLayer;

