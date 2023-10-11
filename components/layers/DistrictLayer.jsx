import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { GeoJSON} from 'react-leaflet';

import { 
    selectedFeatureAtom, 
    districtDataAtom,
    districtVisibilityAtom,
    tempAreaTypeAtom,
    tempAreaIdAtom,
    tempAreaNameAtom,
} from '@/state/atoms';

import { districtDataFetcher } from '@/fetchers/districtDataFetcher';

function DistrictLayer(){
    const [showDistrictLayer] = useAtom(districtVisibilityAtom);
    const [districtData, setDistrictData] = useAtom(districtDataAtom);
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
        const fetchDistrictData = async () => {
            const fetchedData = await districtDataFetcher();
            setDistrictData(fetchedData);
            // console.log(fetchedData)
        };
        fetchDistrictData();
    }, []);

    const handleDistrictFeatureClick = (e) => {
        const selected_feature = e.target.feature;
        const area_id = selected_feature.properties.DIST_CODE;
        const area_type = "district";
        const area_name = selected_feature.properties.DIST_NAME;
        setTempAreaType(area_type);
        setTempAreaId(area_id);
        setTempAreaName(area_name);
        // console.log(selected_feature);
        const clickedLayer = e.target;

        // if (activeLayer) {
        //     // Reset style of the previously active feature
        //     activeLayer.setStyle(defaultStyle);
        // }
        // Set style of the currently clicked feature
        clickedLayer.setStyle(highlightStyle);

        // Update activeLayer
        setActiveLayer(selected_feature);
    };

    // const handleMouseover = (e) => {
    //     e.target.setStyle(highlightStyle);
    // }

    // const handleMouseout = (e) => {
    //     e.target.setStyle(defaultStyle);
    // }

    const onEachFeatureDistrict = (feature, layer) => {
        layer.on({
            // mouseover: handleMouseover,
            // mouseout: handleMouseout,
            click: handleDistrictFeatureClick, // Feature click e to handle selection
        });
    }

    return (
        <>
            { showDistrictLayer && districtData && <GeoJSON style={defaultStyle} data={districtData} onEachFeature={onEachFeatureDistrict} />} 
        </>
    )
}

export default DistrictLayer;

