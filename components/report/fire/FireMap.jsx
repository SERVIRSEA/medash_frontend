"use client"
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fireService } from '@/services'; 

const MapComponent = dynamic(() => import('../MapComponent'), {
    ssr: false,  
});

const FireMap = ({ mapParams }) => {
    const { areaType, areaId, year } = mapParams;
    const [mapData, setMapData] = useState(null);

    const fetchMap = async () => {
        const params = {
            'area_type': areaType,
            'area_id': areaId,
            'year': year,
        };

        try {
            const fetchedData = await fireService.getMap(params); // Ensure the correct service
            setMapData(fetchedData.data);  // Assuming `fetchedData.data` contains the necessary tile URL
        } catch (error) {
            console.error("Error fetching map data:", error);
        }
    };

    useEffect(() => {
        fetchMap();
    }, [areaType, areaId, year]);

    return (
        <div>
            {mapData ? (
                <MapComponent tileUrl={mapData} />
            ) : (
                <p>Loading map...</p>
            )}
        </div>
    );
};

export default FireMap;