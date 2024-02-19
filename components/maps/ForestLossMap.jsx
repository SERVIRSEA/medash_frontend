import React, {useEffect, useState} from "react";
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { 
    areaTypeAtom, 
    areaIdAtom, 
    minYearForestLoss, 
    maxYearForestLoss, 
    forestLossMapDataStoreAtom, 
    forestLossApiAtom,
    isLoadingAtom,
    forestLossVisibilityAtom,
    updateTriggerAtom
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";

function ForestLossMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(minYearForestLoss);
    const [max] = useAtom(maxYearForestLoss);
    const [, setForestLossData] = useAtom(forestLossApiAtom);
    const [forestLossMapStore, setForestLossMapStore] = useAtom(forestLossMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [isForestLossMapVisible, setIsForestLossMapVisible] = useAtom(forestLossVisibilityAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => { 
        const fetchForestLossMap = async () => {
            if (isFetching) {
                return;
            }

            setIsFetching(true);
            setIsLoading(true);

            const params = {
                'area_type': area_type,
                'area_id': area_id,
                'studyLow': min,
                'studyHigh': max,
            };

            const key = JSON.stringify(params);
            const action = 'get-forest-loss-map';

            if (forestLossMapStore[key]) {
                setForestLossData(forestLossMapStore[key]);
                setIsFetching(false);
                setIsLoading(false);
            } else {
                try {
                    const data = await Fetcher(action, params);
                    console.log(data)
                    setForestLossData(data);
                    setForestLossMapStore(prev => ({ ...prev, [key]: data }));
                } catch (error) {
                    console.error('Error fetching data:', error);
                    throw error; 
                } finally {
                    setIsFetching(false);
                    setIsLoading(false);
                }
            }
        }
        fetchForestLossMap();
    }, [min, max, area_type, area_id, updateTrigger, forestLossMapStore, isFetching, setForestLossData, setForestLossMapStore, setIsLoading]);

    const toggleForestLossMapVisibility = () => {
        setIsForestLossMapVisible(!isForestLossMapVisible);
    };

    const downloadForestLossMap = async () =>{
        const action = 'download-forest-loss-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'studyLow': min,
            'studyHigh': max,
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
            console.log('Failed to download land cover map.');
        }
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={6} sx={{py: 0}}>
                <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadForestLossMap()}>
                        <DownloadIcon fontSize="small" />
                    </IconButton>
                    <Switch 
                        size="small" 
                        sx={{ mr: 0.1 }} 
                        checked={isForestLossMapVisible}
                        onChange={toggleForestLossMapVisibility}
                    />
                    <Typography variant="body2">Forest Loss</Typography>
                </ListItem>
            </Grid>
        </Grid>
    );
}
export default ForestLossMap;