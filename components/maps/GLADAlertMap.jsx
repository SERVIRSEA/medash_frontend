import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    minYearGLADAlert,
    maxYearGLADAlert,
    gladAlertYearlyMapDataStoreAtom, 
    selectedYearGLADAlertAtom, 
    gladAlertApiAtom,
    isLoadingAtom,
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";

const GLADAlertMap = () => {
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(minYearGLADAlert);
    const [max] = useAtom(maxYearGLADAlert);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearGLADAlertAtom);
    const [, setGLADAlertData] = useAtom(gladAlertApiAtom);
    const [gladAlertMapStore, setGLADAlertMapStore] = useAtom(gladAlertYearlyMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);

    useEffect(() => { 
        const fetchLatestGLADAlertMap = async () => {
            try {
                setIsLoading(true);
                const year = 2018; 
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'year': year
                };
                const key = JSON.stringify(params);
                const action = 'get-glad-alert-map';
                const data = await Fetcher(action, params);
                setSelectedYear(year);
                setGLADAlertData(data);
                setGLADAlertMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
            }
        }
        fetchLatestGLADAlertMap();
    }, []);

    const showOnOffGLADAlertMap = async (year) =>{
        setSelectedYear((prevYear) => (prevYear === year ? null : year));
        const action = 'get-glad-alert-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };
        const key = JSON.stringify(params);

        if (gladAlertMapStore[key]) {
            setGLADAlertData(gladAlertMapStore[key]);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                setGLADAlertData(data);
                setGLADAlertMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false)
            }
        }
    }

    const downloadGLADAlertMap = async (year) =>{
        const action = 'download-landcover-fire-map';
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
            a.download = 'FIRE_MAP_'+year+'.tif';  // Set the filename here
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
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                            <DownloadIcon fontSize="small" onClick={()=>downloadGLADAlertMap(year)}/>
                        </IconButton>
                        <Switch 
                            size="small" 
                            sx={{ mr: 0.1 }} 
                            checked={year === selectedYear}
                            onClick={()=>showOnOffGLADAlertMap(year)}
                        />
                        <Typography variant="body2">{year}</Typography>
                    </ListItem>
                </Grid>
            ))}
        </Grid>
    )
}

export default GLADAlertMap