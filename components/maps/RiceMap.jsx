import React, {useEffect, useState} from "react";
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchDownloadLCMap } from '@/fetchers/downloadLandCoverMapFetcher';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    measureMinYearAtom, 
    measureMaxYearAtom, 
    riceYearlyMapDataStoreAtom, 
    selectedYearRiceAtom, 
    riceApiAtom,
    isLoadingAtom,
    updateTriggerAtom
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";

function RiceMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(measureMinYearAtom);
    const [max] = useAtom(measureMaxYearAtom);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearRiceAtom);
    const [riceMapStore, setRiceMapStore] = useAtom(riceYearlyMapDataStoreAtom);
    const [, setRiceData] = useAtom(riceApiAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);

    const fetchRiceMapData = async (year) => {
        if (isFetching) {
            return;
        }

        setIsFetching(true);
        setIsLoading(true);

        const action = 'get-landcover-rice-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year,
        };
        const key = JSON.stringify(params);

        if (riceMapStore[key]) {
            setRiceData(riceMapStore[key]);
            setIsFetching(false);
            setIsLoading(false);
        } else {
            try {
                
                const data = await Fetcher(action, params);
                setRiceData(data);
                setRiceMapStore((prev) => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            } finally {
                setIsLoading(false);
                setIsFetching(false);
            }
        }
    };

    useEffect(() => {
        // On the initial render, set max as the selected year and fetch data
        if (isInitialRender) {
            setSelectedYear(max);
            fetchRiceMapData(max);
            setIsInitialRender(false);
        }

        // When selectedYear changes and it's not the initial render, fetch data
        if (!isInitialRender && selectedYear !== null) {
            fetchRiceMapData(selectedYear);
        }

        // When updateTrigger is triggered, fetch data using the selected year
        if (!isInitialRender && updateTrigger > 0) {
            fetchRiceMapData(selectedYear);
        }
    }, [area_type, area_id, max, updateTrigger, selectedYear, isInitialRender]);

    const showOnOffRiceMap = async (year) => {
        setSelectedYear((prevYear) => {
            const newYear = prevYear === year ? null : year;

            if (newYear !== null || updateTrigger > 0) {
                fetchRiceMapData(newYear);
            }

            return newYear;
        });
    };

    const downloadRiceMap = async (year) =>{
        const action = 'download-landcover-rice-map';
        const params = {
            'area_type': 'province',
            'area_id': '6',
            'year': 2010
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
            a.download = 'RICE_MAP_'+year+'.tif';  // Set the filename here
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
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadRiceMap(year)}>
                            <DownloadIcon fontSize="small" />
                        </IconButton>
                        <Switch 
                            size="small" 
                            sx={{ mr: 0.1 }} 
                            checked={year === selectedYear}
                            onClick={()=>showOnOffRiceMap(year)}
                        />
                        <Typography variant="body2">{year}</Typography>
                    </ListItem>
                </Grid>
            ))}
        </Grid>
    );
}
export default RiceMap;