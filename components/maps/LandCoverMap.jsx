import React, {useEffect} from 'react';
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
} from '@/state/atoms';
import { Fetcher } from '@/fetchers/Fetcher';

function LandCoverMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(measureMinYearAtom);
    const [max] = useAtom(measureMaxYearAtom);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom);
    const [, setLandCoverData] = useAtom(landCoverApiAtom);
    const [mapDataStore, setMapDataStore] = useAtom(lcYearlyGEEDataAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    // setSelectedYear(max);
    useEffect(() => { 
        const fetchLatestLandCoverMap = async () => {
            try {
                setIsLoading(true);
                const year = max; 
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
            }
        }
        fetchLatestLandCoverMap();
    }, []);

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
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                            <DownloadIcon fontSize="small" onClick={()=>downloadLandCoverMap(year)}/>
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