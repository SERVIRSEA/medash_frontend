"use client"
import React, { useEffect, useState } from 'react';
import { landcoverService } from '@/services';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../MapComponent'), {
    ssr: false 
});

const LandCoverMap = ({ mapParams }) => {
    const {areaType, areaId, year, type} = mapParams;
    const [mapData, setMapData] = useState(null);
    console.log(mapParams)
    const fetchMap = async () => {
        const params = {
            'area_type': areaType,
            'area_id': areaId,
            'year': year,
            'lc_type': type
        };

        try {
            const fetchedData = await landcoverService.getMap(params);
            setMapData(fetchedData.data);
        } catch (error) {
            console.error("Error fetching map data", error);
        }
    };

    useEffect(() => {
        fetchMap();
    }, []);
    return (
        <div>
            {mapData && (<MapComponent tileUrl={mapData}/>)}
        </div>
    )
}

export default LandCoverMap;
