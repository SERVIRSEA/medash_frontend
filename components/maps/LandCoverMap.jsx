import React, {useEffect, useState} from 'react';
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchDownloadLCMap } from '@/fetchers/downloadLandCoverMapFetcher';
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
    updateTriggerAtom
} from '@/state/atoms';
import { Fetcher } from '@/fetchers/Fetcher';

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

    const downloadLandCoverMap = async (year) =>{
        const params = {
            'area_type': 'province',
            'area_id': '6',
            'year': 2010,
            download: true
        }
        const data = await fetchDownloadLCMap(params);
        const dnlurl = data.downloadURL;
        // console.log(data)
        if(data.success === 'success'){
            // Fetch the file as Blob
            const fileResponse = await fetch(dnlurl);
            const fileBlob = await fileResponse.blob();

            // Create a blob URL
            const blobURL = window.URL.createObjectURL(fileBlob);

            // Create a hidden <a> element to trigger the download
            const a = document.createElement('a');
            a.href = blobURL;
            a.download = 'LANDCOVER_'+year+'.tif';  // Set the filename here
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
        </Grid>
    );
}

export default LandCoverMap;