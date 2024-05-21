import React, {useEffect, useState} from 'react';
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { 
    areaTypeAtom, 
    areaIdAtom, 
    measureMinYearAtom, 
    measureMaxYearAtom, 
    lcYearlyGEEDataAtom, 
    selectedYearAtom, 
    landCoverApiAtom,
    isLoadingAtom,
    minYearLandCover,
    maxYearLandCover,
    updateTriggerAtom,
    alertOpenAtom, 
    alertMessageAtom
} from '@/state/atoms';
import { Fetcher } from '@/fetchers/Fetcher';
import DownloadForm from '../modals/DownloadForm';

function LandCoverMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(minYearLandCover);
    const [max] = useAtom(maxYearLandCover);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom);
    const [, setLandCoverData] = useAtom(landCoverApiAtom);
    const [mapDataStore, setMapDataStore] = useAtom(lcYearlyGEEDataAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [, setAlertOpen] = useAtom(alertOpenAtom);
    const [, setAlertMessage] = useAtom(alertMessageAtom);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    // const [downloadAction, setDownloadAction] = useState('');
    const [downloadParams, setDownloadParams] = useState(null);
    // const [dataset, setDataset] = useState('');
    
    // setSelectedYear(max);
    useEffect(() => { 
        const fetchLatestLandCoverMap = async (year) => {
            try {
                // Check if a request is already in progress
                if (isFetching) {
                    return;
                }

                setIsFetching(true); 
                setIsLoading(true);
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'year': year
                };
                const key = JSON.stringify(params);
                const action = 'get-landcover-map'
                const data = await Fetcher(action, params);
                setLandCoverData(data);
                setSelectedYear(year);
                setMapDataStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
                setIsFetching(false); 
            }
        }
        fetchLatestLandCoverMap(max);
        
        if (updateTrigger > 0) {
            fetchLatestLandCoverMap(selectedYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, max, updateTrigger]);

    const showOnOffLandCoverMap = async (year) =>{
        setSelectedYear((prevYear) => (prevYear === year ? null : year));
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };
        const key = JSON.stringify(params);
        const action = 'get-landcover-map'
        if (mapDataStore[key]) {
            setLandCoverData(mapDataStore[key]);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                setLandCoverData(data);
                setMapDataStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
            }
        }
    }

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadLandCoverMap = async (year) => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year,
            'dataset': 'Landcover'
        };
        // const action = 'download-landcover-map';
        setDownloadParams(params);
        // setDownloadAction(action);
        // setDataset('Landcover');
        openForm();
    };

    // const downloadLandCoverMap = async (year) => {
    //     try{
    //         setIsLoading(true)
    //         const params = {
    //             'area_type': area_type,
    //             'area_id': area_id,
    //             'year': year,
    //         };
    //         const action = 'download-landcover-map';
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
    // };    

    return (
        <Grid container spacing={0}>
            {years.map((year) => (
                <Grid key={year} item xs={6} sx={{py: 0}}>
                    <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadLandCoverMap(year)}>
                            <DownloadIcon fontSize="small" />
                        </IconButton>
                        <Switch 
                            size="small" 
                            sx={{ mr: 0.1 }} 
                            checked={year === selectedYear}
                            onClick={()=>showOnOffLandCoverMap(year)}
                            // onChange={()=>showOnOffLandCoverMap(year)}
                        />
                        <Typography variant="body2">{year}</Typography>
                    </ListItem>
                </Grid>
            ))}
            <DownloadForm 
                isOpen={isFormOpen} 
                onClose={closeForm} 
                // downloadAction={downloadAction} 
                downloadParams={downloadParams} 
                // dataset={dataset} 
            />  
        </Grid>
    );
}

export default LandCoverMap;