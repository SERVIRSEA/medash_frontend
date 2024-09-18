import React, {useEffect, useState} from 'react';
import { useAtom } from 'jotai';
import { ListItem, IconButton, Switch, Grid, Typography, FormControl, Select, MenuItem, InputLabel, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { 
    areaTypeAtom, 
    areaIdAtom, 
    measureMinYearAtom, 
    measureMaxYearAtom, 
    lcYearlyGEEDataAtom, 
    selectedYearAtom, 
    landCoverApiAtom,
    isLoadingAtom,
    minYearLandCover,
    maxYearLandCover,
    updateTriggerAtom,
    alertOpenAtom, 
    alertMessageAtom,
    lcVisibilityAtom,
    lcLegendAtom,
    lcTypeAtom,
    geojsonDataAtom
} from '@/state/atoms';
import { landcoverService } from '@/services';
import { Fetcher } from '@/fetchers/Fetcher';
import DownloadForm from '../modals/DownloadForm';
import LCTypesDropdown from '../dropdown/LCTypesDropdown';

function LandCoverMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [selectedClass] = useAtom(lcTypeAtom);
    const [min] = useAtom(minYearLandCover);
    const [max] = useAtom(maxYearLandCover);
    const [geojsonData] = useAtom(geojsonDataAtom);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearAtom);
    const [, setLandCoverData] = useAtom(landCoverApiAtom);
    const [mapDataStore, setMapDataStore] = useAtom(lcYearlyGEEDataAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [, setAlertOpen] = useAtom(alertOpenAtom);
    const [, setAlertMessage] = useAtom(alertMessageAtom);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [downloadParams, setDownloadParams] = useState(null);
    const [lcLayerVisibility, setLCLayerVisibility] = useAtom(lcVisibilityAtom);
    const [, setIsVisibleLC] = useAtom(lcLegendAtom);
    
    const fetchLandCoverMap = async ({year, lcType, areaType, areaId, geojsonData}) => {
        try {
            // Check if a request is already in progress
            if (isFetching) {
                return;
            }
    
            setIsFetching(true); 
            setIsLoading(true);
    
            const params = {
                'area_type': areaType,
                'area_id': areaId,
                'year': year,
                'class': lcType,
                'lc_type': lcType
            };
            // console.log(geojsonData);
            // Conditionally add `geom` to the params only if geojsonData is available
            if (geojsonData) {
                const geojsonString = JSON.stringify(geojsonData);
                params.geom = geojsonString;
            }
    
            const key = JSON.stringify(params);
            const action = 'get-landcover-map';
    
            // Optionally, check if data already exists in the cache
            if (mapDataStore[key]) {
                setLandCoverData(mapDataStore[key]);
                return mapDataStore[key];
            }
            
            // const mapData = await getLandcoverMap(params);
            const mapData = await landcoverService.getMap(params);
            
            // const data = await Fetcher(action, params);
            setLandCoverData(mapData.data);
            setMapDataStore(prev => ({ ...prev, [key]: mapData.data }));
    
            return mapData; // Optionally return the fetched data for further use
    
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error; 
        } finally {
            setIsLoading(false);
            setIsFetching(false); 
        }
    }
    
    useEffect(() => { 
        const fetchMap = async () => {
            await fetchLandCoverMap({
                year: selectedYear, 
                lcType: selectedClass, 
                areaType: area_type, 
                areaId: area_id,
                geojsonData: geojsonData
            });
        };
        fetchMap();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, selectedYear, selectedClass, geojsonData]);

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const handleYearChange = async (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
    }

    const handleDownloadLC = async () => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': selectedYear,
            'dataset': 'landcover'
        };
        if (geojsonData) {
            const geojsonString = JSON.stringify(geojsonData);
            params.geom = geojsonString;
        }
        setDownloadParams(params);
        openForm();
    };  

    const handleLCVisibility = (event)=>{
        // setLCLayerVisibility(event.target.checked;
        const newVisibility = event.target.checked;
        setLCLayerVisibility(newVisibility);
        setIsVisibleLC(newVisibility);
    };

    return (
        <div>
            <Grid container alignItems="center" spacing={0}>
                <Grid item>
                    <Tooltip title="Click to Download Land Cover Map" arrow>
                        <IconButton color="primary" aria-label="download" size="small" onClick={handleDownloadLC}>
                            <DownloadIcon size="small" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip title="Switch on/off to show/hide landcover map." arrow>
                        <Switch 
                            size="small" 
                            sx={{ marginRight: "10px" }} 
                            checked={lcLayerVisibility}
                            onChange={handleLCVisibility}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs sx={{ marginTop: '10px', marginRight: '12px' }}>
                    <FormControl fullWidth size="small" sx={{ marginBottom: 2 }}>
                        <InputLabel id="select-year-label" sx={{ fontSize: '12px' }}>Year</InputLabel>
                        <Select
                            labelId="select-year-label"
                            value={selectedYear}
                            onChange={handleYearChange}
                            displayEmpty
                            label="Year"
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200,
                                    },
                                },
                            }}
                            inputProps={{ 'aria-label': 'Select year' }}
                            sx={{ fontSize: '12px' }}
                        >
                            {years.map((option) => (
                                <MenuItem key={option} value={option} sx={{ fontSize: '12px' }}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs sx={{ marginTop: '10px', marginRight: '12px' }}>
                    <LCTypesDropdown />
                </Grid>
            </Grid>
            <DownloadForm 
                isOpen={isFormOpen} 
                onClose={closeForm}  
                downloadParams={downloadParams} 
            />  
        </div>
    );
}

export default LandCoverMap;