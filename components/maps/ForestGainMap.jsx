import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchDownloadLCMap } from '@/fetchers/downloadLandCoverMapFetcher';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    minYearForestGain, 
    maxYearForestGain, 
    forestGainMapDataStoreAtom, 
    forestGainApiAtom,
    isLoadingAtom,
    forestGainVisibilityAtom
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";

function ForestGainMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(minYearForestGain);
    const [max] = useAtom(maxYearForestGain);
    const [, setForestGainData] = useAtom(forestGainApiAtom);
    const [forestGainMapStore, setForestGainMapStore] = useAtom(forestGainMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [isForestGainMapVisible, setIsForestGainMapVisible] = useAtom(forestGainVisibilityAtom);

    useEffect(() => { 
        const fetchForestGainMap = async () => {
            try {
                setIsLoading(true); 
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'studyLow': 2000,
                    'studyHigh': 2020,
                };
                const key = JSON.stringify(params);
                const action = 'get-forest-gain-map';
                const data = await Fetcher(action, params);
                // console.log(data)
                setForestGainData(data);
                setForestGainMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
            }
        }
        fetchForestGainMap();
    }, []);

    const showOnOffForestGainMap = async () =>{
        const action = 'get-forest-gain-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'start_year': min,
            'end_year': max,
        };
        const key = JSON.stringify(params);

        if (forestGainMapStore[key]) {
            setForestGainData(forestGainMapStore[key]);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                console.log(data)
                // setForestGainData(data);
                // setForestGainMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false)
            }
        }
    }

    const toggleForestGainMapVisibility = () => {
        setIsForestGainMapVisible(!isForestGainMapVisible);
    };

    const downloadForestGainMap = async (year) =>{
        const action = 'download-landcover-forestgain-map';
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
            a.download = 'FORESTGAIN_MAP_'+year+'.tif';  // Set the filename here
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
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadForestGainMap()}>
                        <DownloadIcon fontSize="small" />
                    </IconButton>
                    <Switch 
                        size="small" 
                        sx={{ mr: 0.1 }} 
                        checked={isForestGainMapVisible}
                        onChange={toggleForestGainMapVisibility}
                    />
                    <Typography variant="body2">Forest Gain</Typography>
                </ListItem>
            </Grid>
        </Grid>
    );
}
export default ForestGainMap;