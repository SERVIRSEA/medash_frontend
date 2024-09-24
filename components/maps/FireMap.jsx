import React, {useEffect, useState} from "react";
import { useAtom } from 'jotai';
import { ListItem, IconButton, Switch, Grid, Typography, FormControl, Select, MenuItem, InputLabel, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { 
    areaTypeAtom, 
    areaIdAtom, 
    measureMinYearAtom, 
    measureMaxYearAtom, 
    fireYearlyMapDataStoreAtom, 
    selectedYearFireAtom, 
    fireApiAtom,
    fireVisibilityAtom,
    isLoadingAtom,
    updateTriggerAtom,
    alertOpenAtom, 
    alertMessageAtom,
    geojsonDataAtom 
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";
import DownloadForm from "../modals/DownloadForm";
import { fireService } from "@/services";

function FireMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [min] = useAtom(measureMinYearAtom);
    const [max] = useAtom(measureMaxYearAtom);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearFireAtom);
    const [visibility, setVisibility] = useAtom(fireVisibilityAtom);
    const [, setFireData] = useAtom(fireApiAtom);
    const [fireMapStore, setFireMapStore] = useAtom(fireYearlyMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [, setAlertOpen] = useAtom(alertOpenAtom);
    const [, setAlertMessage] = useAtom(alertMessageAtom);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [downloadParams, setDownloadParams] = useState(null);

    const fetchFireMap = async (year) => {
        if (isFetching) {
            return;
        }

        setIsFetching(true);
        setIsLoading(true);

        const action = 'get-burned-area';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };

        if (geojsonData) {
            const geojsonString = JSON.stringify(geojsonData);
            params.geom = geojsonString;
        }

        const key = JSON.stringify(params);

        if (fireMapStore[key]) {
            setFireData(fireMapStore[key]);
            setIsFetching(false);
            setIsLoading(false);
        } else {
            try {
                const mapData = await fireService.getMap(params)
                // const data = await Fetcher(action, params);
                setFireData(mapData.data);
                setFireMapStore(prev => ({ ...prev, [key]: mapData.data }));
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsLoading(false);
                setIsFetching(false);
            }
        }
    }

    useEffect(() => {
        // On the initial render, set max as the selected year and fetch data
        if (isInitialRender) {
            setSelectedYear(max);
            fetchFireMap(max);
            setIsInitialRender(false);
        }

        // When selectedYear changes and it's not the initial render, fetch data
        if (!isInitialRender && selectedYear !== null) {
            fetchFireMap(selectedYear);
        }

        // When updateTrigger is triggered, fetch data using the selected year
        if (!isInitialRender && updateTrigger > 0) {
            fetchFireMap(selectedYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, max, updateTrigger, selectedYear, isInitialRender]);

    const showOnOffFireMap = async (year) => {
        fetchFireMap(year);
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadFireMap = async (year) => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year,
            'dataset': 'FireHotspot'
        }
        setDownloadParams(params);
        openForm();
    };

    const handleYearChange = async (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        await showOnOffFireMap(newYear);
    }

    const handleVisibility = (event)=>{
        setVisibility(event.target.checked)
    }

    const handleDownloadFireMap = () => {
        downloadFireMap(selectedYear);
    };

    return (
        <>
            <Grid container alignItems="center" spacing={0}>
                <Grid item>
                    <Tooltip title="Click to Download Fire Map" arrow>
                        <IconButton
                            color="primary"
                            aria-label="download"
                            size="small"
                            onClick={handleDownloadFireMap}
                        >
                            <DownloadIcon size="small" />
                        </IconButton>
                    </Tooltip>
                </Grid>
                <Grid item>
                    <Tooltip title="Switch to display or remove the layer from the map." arrow>
                        <Switch
                            size="small"
                            sx={{ marginRight: '10px' }}
                            checked={visibility}
                            onChange={handleVisibility}
                        />
                    </Tooltip>
                </Grid>
                <Grid item xs sx={{ marginTop: '10px', marginRight: '12px' }}>
                    <FormControl fullWidth size="small" sx={{ marginBottom: 2 }}>
                        <InputLabel id="select-year-label" sx={{ fontSize: '12px' }}>Selected Year</InputLabel>
                        <Select
                            labelId="select-year-label"
                            value={selectedYear || ''}
                            onChange={handleYearChange}
                            displayEmpty
                            label="Selected Year"
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
                <DownloadForm
                    isOpen={isFormOpen}
                    onClose={closeForm}
                    downloadParams={downloadParams}
                />
            </Grid>
        </>
        // <Grid container spacing={0}>
        //     {years.map((year) => (
        //         <Grid key={year} item xs={6} sx={{py: 0}}>
        //             <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
        //                 <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadFireMap(year)}>
        //                     <DownloadIcon fontSize="small"/>
        //                 </IconButton>
        //                 <Switch 
        //                     size="small" 
        //                     sx={{ mr: 0.1 }} 
        //                     checked={year === selectedYear}
        //                     onClick={()=>showOnOffFireMap(year)}
        //                 />
        //                 <Typography variant="body2">{year}</Typography>
        //             </ListItem>
        //         </Grid>
        //     ))}
        //     <DownloadForm 
        //         isOpen={isFormOpen} 
        //         onClose={closeForm} 
        //         downloadParams={downloadParams} 
        //     />  
        // </Grid>
    );
}
export default FireMap;