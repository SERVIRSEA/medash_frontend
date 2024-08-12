import React, {useEffect,useState} from "react";
import { useAtom } from 'jotai';
import { Tooltip, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    minYearForestGain, 
    maxYearForestGain, 
    forestGainMapDataStoreAtom, 
    forestGainApiAtom,
    isLoadingAtom,
    forestGainVisibilityAtom,
    updateTriggerAtom,
    alertOpenAtom, 
    alertMessageAtom 
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";
import DownloadForm from "../modals/DownloadForm";

function ForestGainMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(minYearForestGain);
    const [max] = useAtom(maxYearForestGain);
    const [, setForestGainData] = useAtom(forestGainApiAtom);
    const [forestGainMapStore, setForestGainMapStore] = useAtom(forestGainMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [isForestGainMapVisible, setIsForestGainMapVisible] = useAtom(forestGainVisibilityAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [, setAlertOpen] = useAtom(alertOpenAtom);
    const [, setAlertMessage] = useAtom(alertMessageAtom);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [downloadParams, setDownloadParams] = useState(null);

    useEffect(() => { 
        const fetchForestGainMap = async () => {
            if (isFetching) {
                return;
            }

            setIsFetching(true);
            setIsLoading(true);

            const action = 'get-forest-gain-map';
            const params = {
                'area_type': area_type,
                'area_id': area_id,
                'studyLow': min,
                'studyHigh': max,
            };
            const key = JSON.stringify(params);

            if (forestGainMapStore[key]) {
                setForestGainData(forestGainMapStore[key]);
                setIsFetching(false);
                setIsLoading(false);
            } else {
                try {
                    const data = await Fetcher(action, params);
                    setForestGainData(data);
                    setForestGainMapStore(prev => ({ ...prev, [key]: data }));
                } catch (error) {
                    console.error('Error fetching data:', error);
                    throw error; 
                } finally {
                    setIsFetching(false);
                    setIsLoading(false);
                }
            }
        }
        fetchForestGainMap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, updateTrigger]);

    const toggleForestGainMapVisibility = () => {
        setIsForestGainMapVisible(!isForestGainMapVisible);
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadForestGainMap = async (year) => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'studyLow': min,
            'studyHigh': max,
            'dataset': 'ForestGain'
        };
        setDownloadParams(params);
        openForm();
    };

    // const downloadForestGainMap = async () =>{
    //     try{
    //         setIsLoading(true);
    //         const action = 'download-forest-gain-map';
    //         const params = {
    //             'area_type': area_type,
    //             'area_id': area_id,
    //             'studyLow': min,
    //             'studyHigh': max,
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
        <Grid container spacing={0}>
            <Grid item xs={6} sx={{py: 0}}>
                <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Click to Download Forest Gain Map" arrow>
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadForestGainMap()}>
                            <DownloadIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Switch to display or remove the layer from the map." arrow>
                        <Switch 
                            size="small" 
                            sx={{ mr: 0.1, fontSize: '10px', transform: 'scale(0.8)' }} 
                            checked={isForestGainMapVisible}
                            onChange={toggleForestGainMapVisibility}
                        />
                    </Tooltip>
                    <Typography variant="body2" sx={{ fontSize: '12px' }}>Forest Gain</Typography>
                </ListItem>
            </Grid>
            <DownloadForm 
                isOpen={isFormOpen} 
                onClose={closeForm} 
                downloadParams={downloadParams} 
            /> 
        </Grid>
    );
}
export default ForestGainMap;