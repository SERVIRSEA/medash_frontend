import React, {useEffect} from "react";
import { useAtom } from 'jotai';
import { List, ListItem, IconButton, Switch, Grid, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchDownloadLCMap } from '@/fetchers/downloadLandCoverMapFetcher';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    measureMinYearAtom, 
    measureMaxYearAtom, 
    fireYearlyMapDataStoreAtom, 
    selectedYearFireAtom, 
    fireApiAtom,
    isLoadingAtom,
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";


function FireMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(measureMinYearAtom);
    const [max] = useAtom(measureMaxYearAtom);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearFireAtom);
    const [, setFireData] = useAtom(fireApiAtom);
    const [fireMapStore, setFireMapStore] = useAtom(fireYearlyMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);

    useEffect(() => { 
        const fetchLatestFireMap = async () => {
            try {
                setIsLoading(true);
                const year = max; 
                const params = {
                    'area_type': area_type,
                    'area_id': area_id,
                    'year': year
                };
                const key = JSON.stringify(params);
                const action = 'get-burned-area';
                const data = await Fetcher(action, params);
                setSelectedYear(year);
                setFireData(data);
                setFireMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
            }
        }
        fetchLatestFireMap();
    }, []);

    const showOnOffFireMap = async (year) =>{
        setSelectedYear((prevYear) => (prevYear === year ? null : year));
        const action = 'get-burned-area';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };
        const key = JSON.stringify(params);

        if (fireMapStore[key]) {
            setFireData(fireMapStore[key]);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                setFireData(data);
                setFireMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false)
            }
        }
    }

    const downloadFireMap = async (year) =>{
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
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadFireMap(year)}>
                            <DownloadIcon fontSize="small"/>
                        </IconButton>
                        <Switch 
                            size="small" 
                            sx={{ mr: 0.1 }} 
                            checked={year === selectedYear}
                            onClick={()=>showOnOffFireMap(year)}
                        />
                        <Typography variant="body2">{year}</Typography>
                    </ListItem>
                </Grid>
            ))}
        </Grid>
    );
}
export default FireMap;