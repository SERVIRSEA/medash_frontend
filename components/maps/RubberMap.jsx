import React, { useEffect, useState } from "react";
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { 
    areaTypeAtom, 
    areaIdAtom, 
    measureMinYearAtom, 
    measureMaxYearAtom, 
    rubberYearlyMapDataStoreAtom, 
    selectedYearRubberAtom, 
    rubberApiAtom,
    isLoadingAtom,
    updateTriggerAtom
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";


function RubberMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(measureMinYearAtom);
    const [max] = useAtom(measureMaxYearAtom);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearRubberAtom);
    const [, setRubberData] = useAtom(rubberApiAtom);
    const [rubberMapStore, setRubberMapStore] = useAtom(rubberYearlyMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);

    const fetchRubberMap = async (year) =>{
        if (isFetching) {
            return;
        }
        
        setIsFetching(true);
        setIsLoading(true);

        const action = 'get-landcover-rubber-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };
        const key = JSON.stringify(params);

        if (rubberMapStore[key]) {
            setRubberData(rubberMapStore[key]);
            setIsFetching(false);
            setIsLoading(false);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                setRubberData(data);
                setRubberMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsFetching(false);
                setIsLoading(false);
            }
        }
    }
    
    useEffect(() => {
        // On the initial render, set max as the selected year and fetch data
        if (isInitialRender) {
            setSelectedYear(max);
            fetchRubberMap(max);
            setIsInitialRender(false);
        }

        // When selectedYear changes and it's not the initial render, fetch data
        if (!isInitialRender && selectedYear !== null) {
            fetchRubberMap(selectedYear);
        }

        // When updateTrigger is triggered, fetch data using the selected year
        if (!isInitialRender && updateTrigger > 0) {
            fetchRubberMap(selectedYear);
        }
    }, [area_type, area_id, max, updateTrigger, selectedYear, isInitialRender]);


    const showOnOffRubberMap = async (year) =>{
        setSelectedYear((prevYear) => {
            const newYear = prevYear === year ? null : year;

            if (newYear !== null || updateTrigger > 0) {
                fetchRubberMap(newYear);
            }

            return newYear;
        });
    }

    const downloadRubberMap = async (year) =>{
        const action = 'download-landcover-rubber-map';
        const params = {
            'area_type': 'province',
            'area_id': '6',
            'year': 2010
        }
        const data = await Fetcher(action, params);
        const dnlurl = data.downloadURL;
        if(data.success === 'success'){
            // Fetch the file as Blob
            const fileResponse = await fetch(dnlurl);
            const fileBlob = await fileResponse.blob();

            // Create a blob URL
            const blobURL = window.URL.createObjectURL(fileBlob);

            // Create a hidden <a> element to trigger the download
            const a = document.createElement('a');
            a.href = blobURL;
            a.download = 'RUBBER_MAP_'+year+'.tif';  // Set the filename here
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
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadRubberMap(year)}>
                            <DownloadIcon fontSize="small" />
                        </IconButton>
                        <Switch 
                            size="small" 
                            sx={{ mr: 0.1 }} 
                            checked={year === selectedYear}
                            onClick={()=>showOnOffRubberMap(year)}
                            // onChange={()=>showOnOffLandCoverMap(year)}
                        />
                        <Typography variant="body2">{year}</Typography>
                    </ListItem>
                </Grid>
            ))}
        </Grid>
    );
}
export default RubberMap;