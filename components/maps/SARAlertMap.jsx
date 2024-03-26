import React, {useState, useEffect} from "react";
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    minYearSARAlert,
    maxYearSARAlert,
    sarAlertYearlyMapDataStoreAtom, 
    selectedYearSARAlertAtom, 
    sarAlertApiAtom,
    isLoadingAtom,
    updateTriggerAtom,
    alertOpenAtom, 
    alertMessageAtom 
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";

const SARAlertMap = () => {
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(minYearSARAlert);
    const [max] = useAtom(maxYearSARAlert);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearSARAlertAtom);
    const [, setSARAlertData] = useAtom(sarAlertApiAtom);
    const [sarAlertMapStore, setSARAlertMapStore] = useAtom(sarAlertYearlyMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [, setAlertOpen] = useAtom(alertOpenAtom);
    const [, setAlertMessage] = useAtom(alertMessageAtom);

    const fetchSARAlertMap = async(year) =>{
        if (isFetching) {
            return;
        }
        if (!year){
            return;
        }

        setIsFetching(true);
        setIsLoading(true);

        const action = 'get-sar-alert-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };
        const key = JSON.stringify(params);

        if (sarAlertMapStore[key]) {
            setSARAlertData(sarAlertMapStore[key]);
            setIsFetching(false);
            setIsLoading(false);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                setSARAlertData(data);
                setSARAlertMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
                setIsFetching(false);
            }
        }
    }

    useEffect(() => { 
        // On the initial render, set max as the selected year and fetch data
        if (isInitialRender) {
            // setSelectedYear(max);
            // fetchSARAlertMap(max);
            setIsInitialRender(false);
        }

        // When selectedYear changes and it's not the initial render, fetch data
        if (!isInitialRender && selectedYear !== null) {
            fetchSARAlertMap(selectedYear);
        }

        // When updateTrigger is triggered, fetch data using the selected year
        if (!isInitialRender && updateTrigger > 0) {
            fetchSARAlertMap(selectedYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, max, updateTrigger, selectedYear, isInitialRender]);

    
    const showOnOffSARAlertMap = async (year) =>{
        setSelectedYear((prevYear) => {
            const newYear = prevYear === year ? null : year;

            if (newYear !== null || updateTrigger > 0) {
                fetchSARAlertMap(newYear);
            }

            return newYear;
        });
    }

    const downloadSARAlertMap = async (year) =>{
        try{
            setIsLoading(true)
            const action = 'download-saralert-map';
            const params = {
                'area_type': area_type,
                'area_id': area_id,
                'year': year
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
                setAlertMessage('Your selected area is too large to download. Please choose a specific province, district, or protected area, or draw a smaller area on the map. Once you have updated the map accordingly, click the download icon again to initiate the download process.')
                setAlertOpen(true);
                throw new Error('Failed to download map.');
            }
        } catch (error) {
            console.error('Error downloading drought map:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Grid container spacing={0}>
            {years.map((year) => (
                <Grid key={year} item xs={6} sx={{py: 0}}>
                    <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadSARAlertMap(year)}>
                            <DownloadIcon fontSize="small"/>
                        </IconButton>
                        <Switch 
                            size="small" 
                            sx={{ mr: 0.1 }} 
                            checked={year === selectedYear}
                            onClick={()=>showOnOffSARAlertMap(year)}
                        />
                        <Typography variant="body2">{year}</Typography>
                    </ListItem>
                </Grid>
            ))}
        </Grid>
    )
}

export default SARAlertMap