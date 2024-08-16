import React, {useEffect, useState} from "react";
import { useAtom } from 'jotai';
import { ListItem, IconButton, Switch, Grid, Typography, FormControl, Select, MenuItem, InputLabel, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

import { 
    areaTypeAtom, 
    areaIdAtom, 
    minYearSARFDASAlert,
    maxYearSARFDASAlert,
    sarfdasYearlyMapDataStoreAtom,
    selectedYearSARFDASAtom,
    sarfdasApiAtom,
    isLoadingAtom,
    updateTriggerAtom,
    alertOpenAtom, 
    alertMessageAtom,
    sarfdasAlertVisibilityAtom,
    combineAlertLegendAtom
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";
import DownloadForm from "../modals/DownloadForm";

function SARFDASMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(minYearSARFDASAlert);
    const [max] = useAtom(maxYearSARFDASAlert);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearSARFDASAtom);
    const [, setSARFDASData] = useAtom(sarfdasApiAtom);
    const [sarfdasMapStore, setSARFDASMapStore] = useAtom(sarfdasYearlyMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [, setAlertOpen] = useAtom(alertOpenAtom);
    const [, setAlertMessage] = useAtom(alertMessageAtom);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [downloadParams, setDownloadParams] = useState(null);
    const [visibility, setVisibility] = useAtom(sarfdasAlertVisibilityAtom);
    const [, setIsVisibleLegend] = useAtom(combineAlertLegendAtom);
    
    const fetchSARFDASMap = async (year) => {
        if (isFetching) {
            return;
        }

        setIsFetching(true);
        setIsLoading(true);

        const action = 'get-sarfdas-alert';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year
        };
        const key = JSON.stringify(params);

        if (sarfdasMapStore[key]) {
            setSARFDASData(sarfdasMapStore[key]);
            setIsFetching(false);
            setIsLoading(false);
        } else {
            try {
                const data = await Fetcher(action, params);
                setSARFDASData(data.geeURL);
                setSARFDASMapStore(prev => ({ ...prev, [key]: data }));
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
            // setSelectedYear(max);
            // fetchSARFDASMap(max);
            setIsInitialRender(false);
        }

        // When selectedYear changes and it's not the initial render, fetch data
        if (!isInitialRender && selectedYear !== null) {
            fetchSARFDASMap(selectedYear);
        }

        // When updateTrigger is triggered, fetch data using the selected year
        if (!isInitialRender && updateTrigger > 0) {
            fetchSARFDASMap(selectedYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, max, updateTrigger, selectedYear, isInitialRender]);

    const showOnOffSARFDASMap = async (year) => {
        fetchSARFDASMap(year);
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadSARFDASMap = async (year) => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year,
            'dataset': 'SARFDASAlert'
        };
        setDownloadParams(params);
        openForm();
    };

    const handleYearChange = async (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        await showOnOffSARFDASMap(newYear);
    }

    const handleVisibility = (event)=>{
        const newVisibility = event.target.checked;
        setVisibility(newVisibility);
        setIsVisibleLegend(newVisibility);
    }

    const handleDownloadSARFDASMap = () => {
        downloadSARFDASMap(selectedYear);
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
                            onClick={handleDownloadSARFDASMap}
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
                            value={selectedYear}
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
    //     <Grid container spacing={0}>
    //         {years.map((year) => (
    //             <Grid key={year} item xs={6} sx={{py: 0}}>
    //                 <ListItem disableGutters sx={{ py: 0, display: 'flex', alignItems: 'center' }}>
    //                     <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={()=>downloadSARFDASMap(year)}>
    //                         <DownloadIcon fontSize="small"/>
    //                     </IconButton>
    //                     <Switch 
    //                         size="small" 
    //                         sx={{ mr: 0.1 }} 
    //                         checked={year === selectedYear}
    //                         onClick={()=>showOnOffSARFDASMap(year)}
    //                     />
    //                     <Typography variant="body2">{year}</Typography>
    //                 </ListItem>
    //             </Grid>
    //         ))}
    //         <DownloadForm 
    //             isOpen={isFormOpen} 
    //             onClose={closeForm} 
    //             downloadParams={downloadParams} 
    //         />  
    //     </Grid>
    );
}
export default SARFDASMap;