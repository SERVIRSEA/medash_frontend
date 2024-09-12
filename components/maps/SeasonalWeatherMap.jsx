import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import {Tooltip, ListItem, IconButton, Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Fetcher } from '@/fetchers/Fetcher';
import DownloadForm from "../modals/DownloadForm";
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
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [downloadParams, setDownloadParams] = useState(null);

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
                    setRainfallData(data["geeURL"]);
                } else if (weatherParam === 'temperature') {
                    setTemperatureData(data["geeURL"]);
                }
            } else {
                // Data already exists in the data store
                // Reuse the existing data
                const data = weatherDataStore[key];
                if (weatherParam === 'precipitation') {
                    setRainfallData(data["geeURL"]);
                } else if (weatherParam === 'temperature') {
                    setTemperatureData(data["geeURL"]);
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

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadSeasonalWeatherMap = async (param, type) => {
        const params = {
            'area_type': areaType,
            'area_id': areaId,
            'weather_param': param,
            'weather_type': type,
            'dataset': 'LongTermWeather'
        };
        setDownloadParams(params);
        openForm();
    };

    // const downloadSeasonalWeatherMap = async (param, type) =>{
    //     try{
    //         setIsLoading(true)
    //         const action = 'download-weather-map';
    //         const params = {
    //             'area_type': areaType,
    //             'area_id': areaId,
    //             'weather_param': param,
    //             'weather_type': type,
    //         }
    //         const data = await Fetcher(action, params);
            
    //         if (data.success === 'success' && data.downloadURL) {
    //             const downloadURL = data.downloadURL;
    //             // Create a hidden <a> element to trigger the download
    //             const a = document.createElement('a');
    //             a.href = downloadURL;
    //             document.body.appendChild(a);
    //             a.click();
    //             // Cleanup
    //             a.remove();
    //         } else {
    //             setAlertMessage('Your selected area is too large to download. Please choose a specific province, district, or protected area, or draw a smaller area on the map. Once you have updated the map accordingly, click the download icon again to initiate the download process.')
    //             setAlertOpen(true);
    //             throw new Error('Failed to download map.');
    //         }
    //     } catch (error) {
    //         console.error('Error downloading drought map:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // }

    return (
        <>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to download layer." arrow>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadSeasonalWeatherMap("precipitation", "seasonal")}>
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Switch to show/hide layer on Map" arrow>
                    <Switch
                        size="small"
                        sx={{ mr: 0.1 }}
                        checked={isVisibleRainfall}
                        onChange={() => setIsVisibleRainfall(!isVisibleRainfall)} 
                    />
                </Tooltip>
                <Typography variant="body2" sx={{fontSize: '12px'}}>Rainfall Anomaly (next 3 months): Forecasted (mm)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to download layer." arrow>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadSeasonalWeatherMap("temperature", "seasonal")}>
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Switch to show/hide layer on Map" arrow>
                    <Switch
                        size="small"
                        sx={{ mr: 0.1 }}
                        checked={isVisibleTemperature}
                        onChange={() => setIsVisibleTemperature(!isVisibleTemperature)} 
                    />
                </Tooltip>
                <Typography variant="body2" sx={{fontSize: '12px'}}>Temperature Anomaly (next 3 months): Forecasted (°C)</Typography>
            </ListItem>
            <DownloadForm 
                isOpen={isFormOpen} 
                onClose={closeForm} 
                downloadParams={downloadParams} 
            />  
        </>
    );
}

export default SeasonalWeatherMap;