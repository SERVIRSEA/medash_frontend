import React from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchEVIMap } from '@/fetchers/eviMapFetcher';
import { fetchDownloadEVIMap } from '@/fetchers/downloadEVIMapFetcher';
import { Fetcher } from '@/fetchers/Fetcher';

import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    eviApiAtom,
    eviVisibilityAtom,
    eviMapStoreAtom,
    isLoadingAtom
} from '@/state/atoms';

function EVIMap(){
    const [visibleEVILayer, setEVILayerVisibility] = useAtom(eviVisibilityAtom);
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [, setEviData] = useAtom(eviApiAtom);
    const [eviMapDataStore, setEVIMapDataStore] = useAtom(eviMapStoreAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

    const handleEviLayerOnOff = async()=> {
        setEVILayerVisibility(!visibleEVILayer);
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'refLow': refLow,
            'refHigh': refHigh,
            'studyLow': studyLow,
            'studyHigh': studyHigh
        }
        const key = JSON.stringify(params);
        const action = 'get-evi-map';

        if (eviMapDataStore[key]) {
            setEviData(eviMapDataStore[key]);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                setEviData(data);
                setEVIMapDataStore(prev => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
            }
        }
    }

    const downloadEVIMap = async ()=> {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'refLow': refLow,
            'refHigh': refHigh,
            'studyLow': studyLow,
            'studyHigh': studyHigh
        }
        const action = 'download-evi-map';
        const data = await Fetcher(action, params);
        const dnlurl = data.downloadURL;
        if (data.success === 'success'){
            // Fetch the file as Blob
            const fileResponse = await fetch(dnlurl);
            const fileBlob = await fileResponse.blob();

            // Create a blob URL
            const blobURL = window.URL.createObjectURL(fileBlob);

            // Create a hidden <a> element to trigger the download
            const a = document.createElement('a');
            a.href = blobURL;
            a.download = "EVIMAP"+ studyLow + "_" + studyHigh+'.tif';  // Set the filename here
            document.body.appendChild(a);
            a.click();

            // Cleanup
            a.remove();
            window.URL.revokeObjectURL(blobURL);
        } else {
            console.log('Download failed');
        }
    }

    return(
        <>
            <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                    <DownloadIcon onClick={downloadEVIMap} />
                </IconButton>
                <FormControlLabel control={<Checkbox checked={visibleEVILayer} size="small" sx={{ mr: 0.1 }}  />} label="Enhanced vegetation index" onChange={handleEviLayerOnOff} />
            </ListItem>
        </>
    )
}

export default EVIMap;