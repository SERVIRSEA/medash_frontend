import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchDownloadLCMap } from '@/fetchers/downloadLandCoverMapFetcher';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    minYearForestLoss, 
    maxYearForestLoss, 
    forestLossMapDataStoreAtom, 
    forestLossApiAtom,
    isLoadingAtom,
    forestLossVisibilityAtom
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

    useEffect(() => { 
        const fetchForestLossMap = async () => {
            try {
                setIsLoading(true); 
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'studyLow': 2000,
                    'studyHigh': 2020,
                };
                const key = JSON.stringify(params);
                const action = 'get-forest-loss-map';
                const data = await Fetcher(action, params);
                console.log(data)
                setForestLossData(data);
                setForestLossMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
            }
        }
        fetchForestLossMap();
    }, []);

    const showOnOffForestLossMap = async () =>{
        const action = 'get-forest-loss-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'start_year': min,
            'end_year': max,
        };
        const key = JSON.stringify(params);

        if (forestLossMapStore[key]) {
            setForestLossData(forestLossMapStore[key]);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                console.log(data)
                // setForestLossData(data);
                // setForestLossMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false)
            }
        }
    }

    const toggleForestLossMapVisibility = () => {
        setIsForestLossMapVisible(!isForestLossMapVisible);
    };

    const downloadForestLossMap = async (year) =>{
        const action = 'download-landcover-forestloss-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'start_year': min,
            'end_year': max,
        }
        const data = await Fetcher(action, params);
        const dnlurl = data.downloadURL;
        if(data.success === 'success'){
            // Fetch the file as Blob
            const fileResponse = await Fetcher(dnlurl);
            const fileBlob = await fileResponse.blob();

            // Create a blob URL
            const blobURL = window.URL.createObjectURL(fileBlob);

            // Create a hidden <a> element to trigger the download
            const a = document.createElement('a');
            a.href = blobURL;
            a.download = 'FORESTLOSS_MAP_'+year+'.tif';  // Set the filename here
            document.body.appendChild(a);
            a.click();

            // Cleanup
            a.remove();
            window.URL.revokeObjectURL(blobURL);
        }else{
            console.log('failed download');
        }
    }

    return (
        <Grid container spacing={0}>
            <Grid item xs={6} sx={{py: 0}}>
                <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                        <DownloadIcon fontSize="small" onClick={()=>downloadForestLossMap()}/>
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