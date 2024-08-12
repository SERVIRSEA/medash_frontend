import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton, Tooltip } from '@mui/material';
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
    updateTriggerAtom,
    alertOpenAtom, 
    alertMessageAtom,
    eviLegendAtom
} from '@/state/atoms';
import DownloadForm from '../modals/DownloadForm';


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
    const [, setAlertOpen] = useAtom(alertOpenAtom);
    const [, setAlertMessage] = useAtom(alertMessageAtom);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [downloadParams, setDownloadParams] = useState(null);
    const [, setEviLegendOnOff] = useAtom(eviLegendAtom);

    const handleCheckboxChange = async () => {
        setEVILayerVisibility(!visibleEVILayer);
        
        // Fetch and update data when the checkbox is checked
        if (!visibleEVILayer) {
            await fetchData();
            setEviLegendOnOff(true);
        } else {
            setEviLegendOnOff(false);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateTrigger, visibleEVILayer, area_type, area_id, refLow, refHigh, studyLow, studyHigh]);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadEVIMap = async () => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'refLow': refLow,
            'refHigh': refHigh,
            'studyLow': studyLow,
            'studyHigh': studyHigh,
            'dataset': 'EVI'
        }
        setDownloadParams(params);
        openForm();
    };
    
    return(
        <>
            <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to Download EVI Map" arrow>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={downloadEVIMap}>
                        <DownloadIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Click to generate EVI map." arrow>
                    <FormControlLabel 
                        control={<Checkbox checked={visibleEVILayer} size="small" sx={{ mr: 0.1 }} />} 
                        label="Vegetation health" 
                        onChange={handleCheckboxChange} 
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '12px' } }}
                    /> 
                </Tooltip>
            </ListItem>
            <DownloadForm 
                isOpen={isFormOpen} 
                onClose={closeForm} 
                downloadParams={downloadParams} 
            />  
        </>
    )
}

export default EVIMap;