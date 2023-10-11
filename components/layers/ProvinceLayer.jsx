import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { 
    selectedFeatureAtom, 
    provinceDataAtom, 
    provinceVisibilityAtom,
    tempAreaTypeAtom,
    tempAreaIdAtom,
    tempAreaNameAtom,
} from '@/state/atoms';

import { provinceDataFetcher } from '@/fetchers/provinceDataFetcher';

function ProvinceLayer(){
    const [showProvinceLayer] = useAtom(provinceVisibilityAtom);
    const [provinceData, setProvinceData] = useAtom(provinceDataAtom);
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
        const fetchProvinceData = async () => {
            const fetchedData = await provinceDataFetcher();
            setProvinceData(fetchedData);
            // console.log(fetchedData)
        };
        fetchProvinceData();
    }, []);

    const handleProvinceFeatureClick = (e) => {
        const selected_feature = e.target.feature;
        const area_id = selected_feature.properties.gid;
        const area_type = "province";
        const area_name = selected_feature.properties.name;

        const clickedLayer = e.target;

        // if (activeLayer) {
        //     // Reset style of the previously active feature
        //     activeLayer.setStyle(defaultStyle);
        // }

        // Set style of the currently clicked feature
        clickedLayer.setStyle(highlightStyle);

        // Update activeLayer
        setActiveLayer(selected_feature);
        setTempAreaType(area_type);
        setTempAreaId(area_id);
        setTempAreaName(area_name);
    }

    const handleMouseover = (e) => {
        e.target.setStyle(highlightStyle);
    }

    const handleMouseout = (e) => {
        e.target.setStyle(defaultStyle);
    }

    const onEachFeatureProvince = (feature, layer) => {
        layer.on({
            click: handleProvinceFeatureClick, // Feature click e to handle selection
            // mouseover: handleMouseover,
            // mouseout: handleMouseout,
        });
    }

    return (
        <>
            { showProvinceLayer && provinceData && <GeoJSON style={defaultStyle} data={provinceData} onEachFeature={onEachFeatureProvince} />}
        </>
    )
}

export default ProvinceLayer;

