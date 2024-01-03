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
    forestExtentMapDataStoreAtom, 
    selectedYearForestExtentAtom, 
    forestExtentApiAtom,
    isLoadingAtom,
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";


function ForestExtentMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(measureMinYearAtom);
    const [max] = useAtom(measureMaxYearAtom);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearForestExtentAtom);
    const [, setForestExtentData] = useAtom(forestExtentApiAtom);
    const [forestExtentMapStore, setForestExtentMapStore] = useAtom(forestExtentMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);

    // useEffect(() => { 
    //     const fetchForestExtentMap = async () => {
    //         try {
    //             setIsLoading(true);
    //             const params = {
    //                 'area_type': area_type,
    //                 'area_id': area_id,
    //                 'studyLow': min,
    //                 'studyHigh': max
    //             };
    //             const key = JSON.stringify(params);
    //             const action = 'get-forest-extent-map';
    //             const data = await Fetcher(action, params);
    //             // console.log(data)
    //             // setForestExtentData(data);
    //             setForestExtentMapStore(prev => ({ ...prev, [key]: data }));
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             throw error; 
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    //     fetchForestExtentMap();
    // }, []);

    const showOnOffForestExtentMap = async (year) =>{
        setSelectedYear((prevYear) => (prevYear === year ? null : year));
        const action = 'get-forest-extent-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'studyLow': min,
            'studyHigh': max
        };
        const key = JSON.stringify(params);

        if (forestExtentMapStore[key]) {
            setIsLoading(true);
            const data = forestExtentMapStore[key]
            // console.log(data)
            const filteredData = data[year];
            // console.log(filteredData);
            setForestExtentData(filteredData);
            setIsLoading(false);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                const filteredData = data[year];
                setForestExtentData(filteredData);
                setForestExtentMapStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false)
            }
        }
    }

    const downloadForestExtentMap = async (year) =>{
        const action = 'download-landcover-forestextent-map';
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
            a.download = 'FORESTEXTENT_MAP_'+year+'.tif';  // Set the filename here
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
                        <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadForestExtentMap(year)}>
                            <DownloadIcon fontSize="small" />
                        </IconButton>
                        <Switch 
                            size="small" 
                            sx={{ mr: 0.1 }} 
                            checked={year === selectedYear}
                            onClick={()=>showOnOffForestExtentMap(year)}
                        />
                        <Typography variant="body2">{year}</Typography>
                    </ListItem>
                </Grid>
            ))}
        </Grid>
    );
}
export default ForestExtentMap;