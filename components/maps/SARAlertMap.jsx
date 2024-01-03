import React, {useEffect} from "react";
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

    const showOnOffSARAlertMap = async (year) =>{
        setSelectedYear((prevYear) => (prevYear === year ? null : year));
        const action = 'get-burned-area';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };
        const key = JSON.stringify(params);

        if (sarAlertMapStore[key]) {
            setSARAlertData(sarAlertMapStore[key]);
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
                setIsLoading(false)
            }
        }
    }

    const downloadSARAlertMap = async (year) =>{
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