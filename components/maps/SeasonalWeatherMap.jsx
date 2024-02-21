import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton, Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Fetcher } from '@/fetchers/Fetcher';

import {
    areaTypeAtom,
    areaIdAtom,
    seasonalRainfallVisAtom,
    seasonalRainfallDataAtom,
    seasonalTempVisAtom,
    seasonalTemperatureDataAtom,
    isLoadingAtom,
    weatherDataStoreAtom
} from '@/state/atoms';

function SeasonalWeatherMap() {
    const [areaType] = useAtom(areaTypeAtom);
    const [areaId] = useAtom(areaIdAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    const [isVisibleRainfall, setIsVisibleRainfall] = useAtom(seasonalRainfallVisAtom);
    const [isVisibleTemperature, setIsVisibleTemperature] = useAtom(seasonalTempVisAtom);
    const [rainfallData, setRainfallData] = useAtom(seasonalRainfallDataAtom);
    const [temperatureData, setTemperatureData] = useAtom(seasonalTemperatureDataAtom);
    const [weatherDataStore, setWeatherDataStore] = useAtom(weatherDataStoreAtom);

    const fetchLatestWeatherMap = async (weatherParam, weatherType, areaType, areaId) => {
        try {
            setIsLoading(true);
            const params = {
                'area_type': areaType,
                'area_id': areaId,
                'weather_param': weatherParam,
                'weather_type': weatherType,
            };
            const key = JSON.stringify(params);

            // Check if data for the given parameters is already available in the data store
            if (!weatherDataStore[key]) {
                // Data not found, fetch it
                const action = 'get-weather-map';
                const data = await Fetcher(action, params);

                // Update the data store
                setWeatherDataStore((prev) => ({ ...prev, [key]: data }));

                // Set the fetched data
                if (weatherParam === 'precipitation') {
                    setRainfallData(data);
                } else if (weatherParam === 'temperature') {
                    setTemperatureData(data);
                }
            } else {
                // Data already exists in the data store
                // Reuse the existing data
                const data = weatherDataStore[key];
                if (weatherParam === 'precipitation') {
                    setRainfallData(data);
                } else if (weatherParam === 'temperature') {
                    setTemperatureData(data);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isVisibleRainfall || isVisibleTemperature) {
            fetchLatestWeatherMap(isVisibleRainfall ? 'precipitation' : 'temperature', 'seasonal', areaType, areaId);
        }
    }, [areaType, areaId, isVisibleRainfall, isVisibleTemperature]);

    const downloadSeasonalWeatherMap = async (param, type) =>{
        try{
            setIsLoading(true)
            const action = 'download-weather-map';
            const params = {
                'area_type': areaType,
                'area_id': areaId,
                'weather_param': param,
                'weather_type': type,
            }
            const data = await Fetcher(action, params);
            
            if (data.success === 'success' && data.downloadURL) {
                const downloadURL = data.downloadURL;
                // Create a hidden <a> element to trigger the download
                const a = document.createElement('a');
                a.href = downloadURL;
                document.body.appendChild(a);
                a.click();
                // Cleanup
                a.remove();
            } else {
                setAlertMessage('Your selected area is too large to download. Please choose a specific province, district, or protected area, or draw a smaller area on the map. Once you have updated the map accordingly, click the download icon again to initiate the download process.')
                setAlertOpen(true);
                throw new Error('Failed to download map.');
            }
        } catch (error) {
            console.error('Error downloading drought map:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadSeasonalWeatherMap("precipitation", "seasonal")}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisibleRainfall}
                    onChange={() => setIsVisibleRainfall(!isVisibleRainfall)} 
                />
                <Typography variant="body2">Rainfall Anomaly (next 3 months): Forecasted (mm)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadSeasonalWeatherMap("temperature", "seasonal")}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisibleTemperature}
                    onChange={() => setIsVisibleTemperature(!isVisibleTemperature)} 
                />
                <Typography variant="body2">Temperature Anomaly (next 3 months): Forecasted (C)</Typography>
            </ListItem>
        </>
    );
}

export default SeasonalWeatherMap;