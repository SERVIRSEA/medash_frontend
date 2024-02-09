import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DownloadIcon from '@mui/icons-material/Download';
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
    isLoadingAtom,
    updateTriggerAtom
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
    const [updateTrigger] = useAtom(updateTriggerAtom);

    const handleCheckboxChange = async () => {
        setEVILayerVisibility(!visibleEVILayer);

        // Fetch and update data when the checkbox is checked
        if (!visibleEVILayer) {
            await fetchData();
        }
    };

    const fetchData = async () => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'refLow': refLow,
            'refHigh': refHigh,
            'studyLow': studyLow,
            'studyHigh': studyHigh
        };

        const key = JSON.stringify(params);
        const action = 'get-evi-map';

        if (eviMapDataStore[key]) {
            setEviData(eviMapDataStore[key]);
        } else {
            try {
                setIsLoading(true);
                const data = await Fetcher(action, params);
                setEviData(data);
                setEVIMapDataStore((prev) => ({ ...prev, [key]: data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        const handleEviLayerOnOff = async () => {
            if (updateTrigger > 0 && visibleEVILayer) {
                await fetchData();
            }
        };
        handleEviLayerOnOff();
    }, [updateTrigger, visibleEVILayer, area_type, area_id, refLow, refHigh, studyLow, studyHigh]);


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
            console.log('Failed to download land cover map.');
        }
    }

    return(
        <>
            <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={downloadEVIMap}>
                    <DownloadIcon />
                </IconButton>
                <FormControlLabel control={<Checkbox checked={visibleEVILayer} size="small" sx={{ mr: 0.1 }} />} label="Enhanced vegetation index" onChange={handleCheckboxChange} /> 
            </ListItem>
        </>
    )
}

export default EVIMap;