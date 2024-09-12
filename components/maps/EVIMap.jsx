import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Grid, Switch, ListItem, IconButton, Tooltip } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DownloadIcon from '@mui/icons-material/Download';
import { Fetcher } from '@/fetchers/Fetcher';
import { getEviMap } from '@/services/eviService';

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
    eviLegendAtom,
    geojsonDataAtom
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
    const [geojsonData] = useAtom(geojsonDataAtom);
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
            'ref_low': refLow,
            'ref_high': refHigh,
            'study_low': studyLow,
            'study_high': studyHigh
        };
        if (geojsonData) {
            const geojsonString = JSON.stringify(geojsonData);
            params.geom = geojsonString;
        }

        const key = JSON.stringify(params);
        // const action = 'get-evi-map';

        if (eviMapDataStore[key]) {
            setEviData(eviMapDataStore[key]);
        } else {
            try {
                setIsLoading(true);
                const fetchData = await getEviMap(params);
                
                // const data = await Fetcher(action, params);
                setEviData(fetchData.data);
                setEVIMapDataStore((prev) => ({ ...prev, [key]: fetchData.data }));
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

    const handleDownload = async () => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'ref_low': refLow,
            'ref_high': refHigh,
            'study_low': studyLow,
            'study_high': studyHigh,
            'dataset': 'evi'
        }
        if (geojsonData) {
            const geojsonString = JSON.stringify(geojsonData);
            params.geom = geojsonString;
        }
        setDownloadParams(params);
        openForm();
    };
    
    return(
        <>
            <Grid container alignItems="center" spacing={0}>
                <Grid item>
                    <Tooltip title="Click to Download EVI Map" arrow>
                        <IconButton color="primary" aria-label="download" size="small" onClick={handleDownload}>
                            <DownloadIcon size="small" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip title="Switch on/off to show EVI map" arrow>
                        <Switch 
                            size="small" 
                            sx={{ marginRight: "10px" }} 
                            checked={visibleEVILayer}
                            onChange={handleCheckboxChange}
                        />
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Typography variant='body2' sx={{ fontSize: '12px'}}>Vegetation health</Typography>
                </Grid>
            </Grid>
            <DownloadForm 
                isOpen={isFormOpen} 
                onClose={closeForm} 
                downloadParams={downloadParams} 
            />  
        </>
    )
}

export default EVIMap;