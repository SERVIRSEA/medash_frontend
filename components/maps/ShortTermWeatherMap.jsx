import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton, Switch, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Fetcher } from '@/fetchers/Fetcher';
import DownloadForm from "../modals/DownloadForm";
import {
    areaTypeAtom,
    areaIdAtom,
    weatherDataStoreAtom,
    pastRainfallVisAtom,
    pastTempVisAtom,
    forecastRainfallVisAtom,
    forecastTempVisAtom,
    pastRainfallDataAtom,
    forecastRainfallDataAtom,
    pastTemperatureDataAtom,
    forecastTemperatureDataAtom,
    isLoadingAtom,
    geojsonDataAtom
} from '@/state/atoms';
import { climateService } from '@/services';

function ShortTermWeatherMap() {
    const [areaType] = useAtom(areaTypeAtom);
    const [areaId] = useAtom(areaIdAtom);
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    const [isVisiblePastRainfall, setIsVisiblePastRainfall] = useAtom(pastRainfallVisAtom);
    const [isVisiblePastTemperature, setIsVisiblePastTemperature] = useAtom(pastTempVisAtom);
    const [isVisibleForecastRainfall, setIsVisibleForecastRainfall] = useAtom(forecastRainfallVisAtom);
    const [isVisibleForecastTemperature, setIsVisibleForecastTemperature] = useAtom(forecastTempVisAtom);
    const [dataStore, setDataStore] = useAtom(weatherDataStoreAtom);
    const [, setPastRainfallData] = useAtom(pastRainfallDataAtom);
    const [, setForecastRainfallData] = useAtom(forecastRainfallDataAtom);
    const [, setPastTemperatureData] = useAtom(pastTemperatureDataAtom);
    const [, setForecastTemperatureData] = useAtom(forecastTemperatureDataAtom);
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
            if (geojsonData) {
                const geojsonString = JSON.stringify(geojsonData);
                params.geom = geojsonString;
            }
            const key = JSON.stringify(params);

            if (!dataStore[key]) {
                // const action = 'get-weather-map';
                // const data = await Fetcher(action, params);
                const mapData = await climateService.getMap(params);
                const data = mapData.data;
                setDataStore((prev) => ({ ...prev, [key]: data }));

                switch (weatherType) {
                    case 'past':
                        if (weatherParam === 'precipitation') {
                            setPastRainfallData(data["tile_url"]);
                            setIsVisiblePastRainfall(true);
                        } else if (weatherParam === 'temperature') {
                            setPastTemperatureData(data["tile_url"]);
                            setIsVisiblePastTemperature(true);
                        }
                        break;
                    case 'forecast':
                        if (weatherParam === 'precipitation') {
                            setForecastRainfallData(data["tile_url"]);
                            setIsVisibleForecastRainfall(true);
                        } else if (weatherParam === 'temperature') {
                            setForecastTemperatureData(data["tile_url"]);
                            setIsVisibleForecastTemperature(true);
                        }
                        break;
                    default:
                        break;
                }
            } else {
                const data = dataStore[key];

                switch (weatherType) {
                    case 'past':
                        if (weatherParam === 'precipitation') {
                            setPastRainfallData(data["tile_url"]);
                            setIsVisiblePastRainfall(true);
                        } else if (weatherParam === 'temperature') {
                            setPastTemperatureData(data["tile_url"]);
                            setIsVisiblePastTemperature(true);
                        }
                        break;
                    case 'forecast':
                        if (weatherParam === 'precipitation') {
                            setForecastRainfallData(data["tile_url"]);
                            setIsVisibleForecastRainfall(true);
                        } else if (weatherParam === 'temperature') {
                            setForecastTemperatureData(data["tile_url"]);
                            setIsVisibleForecastTemperature(true);
                        }
                        break;
                    default:
                        break;
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
        if (isVisiblePastRainfall) {
            fetchLatestWeatherMap('precipitation', 'past', areaType, areaId);
        }
        if (isVisibleForecastRainfall) {
            fetchLatestWeatherMap('precipitation', 'forecast', areaType, areaId);
        }
        if (isVisiblePastTemperature) {
            fetchLatestWeatherMap('temperature', 'past', areaType, areaId);
        }
        if (isVisibleForecastTemperature) {
            fetchLatestWeatherMap('temperature', 'forecast', areaType, areaId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [areaType, areaId, isVisiblePastRainfall, isVisibleForecastRainfall, isVisiblePastTemperature, isVisibleForecastTemperature]);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadShortTermWeatherMap = async (param, type) => {
        const params = {
            'area_type': areaType,
            'area_id': areaId,
            'weather_param': param,
            'weather_type': type,
            'dataset': 'ShortTermWeather'
        };
        setDownloadParams(params);
        openForm();
    };

    // const downloadShortTermWeatherMap = async (param, type) =>{
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
            <ListItem disableGutters sx={{  display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to download layer." arrow>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadShortTermWeatherMap("precipitation", "past")}>
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Switch to show/hide layer on Map" arrow>
                    <Switch
                        size="small"
                        sx={{ mr: 0.1 }}
                        checked={isVisiblePastRainfall}
                        onChange={() => setIsVisiblePastRainfall(!isVisiblePastRainfall)}
                    />
                </Tooltip>
                <Typography variant="body2" sx={{fontSize: '12px'}}>Accumulated Rainfall (past 7 days) (mm)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{  display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to download layer." arrow>
                    <IconButton 
                        color="primary" 
                        aria-label="download" 
                        size="small" 
                        sx={{ mr: 0.1 }} 
                        onClick={()=>downloadShortTermWeatherMap("temperature", "past")}
                    >
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Switch to show/hide layer on Map" arrow>
                    <Switch
                        size="small"
                        sx={{ mr: 0.1 }}
                        checked={isVisiblePastTemperature}
                        onChange={() => setIsVisiblePastTemperature(!isVisiblePastTemperature)}
                    />
                </Tooltip>
                <Typography variant="body2" sx={{fontSize: '12px'}}>Average temperature (past 7 days) (°C)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to download layer." arrow>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadShortTermWeatherMap("precipitation", "forecast")}>
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Switch to show/hide layer on Map" arrow>
                    <Switch
                        size="small"
                        sx={{ mr: 0.1 }}
                        checked={isVisibleForecastRainfall}
                        onChange={() => setIsVisibleForecastRainfall(!isVisibleForecastRainfall)}
                    />
                </Tooltip>
                <Typography variant="body2" sx={{fontSize: '12px'}}>Accumulated Rainfall (next 7 days): Forecasted (mm)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to download layer." arrow>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadShortTermWeatherMap("temperature", "forecast")}>
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Switch to show/hide layer on Map" arrow>
                    <Switch
                        size="small"
                        sx={{ mr: 0.1 }}
                        checked={isVisibleForecastTemperature}
                        onChange={() => setIsVisibleForecastTemperature(!isVisibleForecastTemperature)}
                    />
                </Tooltip>
                <Typography variant="body2" sx={{fontSize: '12px'}}>Average temperature (next 7 days): Forecasted (°C)</Typography>
            </ListItem>
            <DownloadForm 
                isOpen={isFormOpen} 
                onClose={closeForm} 
                downloadParams={downloadParams} 
            />  
        </>
    );
}

export default ShortTermWeatherMap;
