import React, {useEffect, useState} from "react";
import { useAtom } from 'jotai';
import { ListItem, IconButton, Switch, Grid, Typography, FormControl, Select, MenuItem, InputLabel, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    minYearForestExtent, 
    maxYearForestExtent, 
    forestExtentMapDataStoreAtom, 
    selectedYearForestExtentAtom, 
    forestExtentApiAtom,
    isLoadingAtom,
    updateTriggerAtom,
    forestExtentVisibilityAtom,
    forestCoverLegendAtom
} from '@/state/atoms';
import { Fetcher } from "@/fetchers/Fetcher";
import DownloadForm from "../modals/DownloadForm";

function ForestExtentMap(){
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [min] = useAtom(minYearForestExtent);
    const [max] = useAtom(maxYearForestExtent);
    const years = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    const [selectedYear, setSelectedYear] = useAtom(selectedYearForestExtentAtom);
    const [, setForestExtentData] = useAtom(forestExtentApiAtom);
    const [forestExtentMapStore, setForestExtentMapStore] = useAtom(forestExtentMapDataStoreAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [updateTrigger] = useAtom(updateTriggerAtom);
    const [isFetching, setIsFetching] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [downloadParams, setDownloadParams] = useState(null);
    const [visibility, setVisibility] = useAtom(forestExtentVisibilityAtom);
    const [, setIsVisibleForestCoverLegend] = useAtom(forestCoverLegendAtom);
    
    const fetchForestExtentMap = async (year) => {
        if (isFetching) {
            return;
        }
        setIsFetching(true);
        setIsLoading(true);

        const action = 'get-forest-extent-map';
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'studyLow': min,
            'studyHigh': max,
        };
        const key = JSON.stringify(params);

        if (forestExtentMapStore[key]) {
            const data = forestExtentMapStore[key];
            const filteredData = data[year];
            setForestExtentData(filteredData);
            setIsFetching(false);
            setIsLoading(false);
        } else {
            try {
                const data = await Fetcher(action, params);
                setForestExtentMapStore(prev => ({ ...prev, [key]: data }));
                const filteredData = data[year];
                setForestExtentData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
                throw error; 
            } finally {
                setIsFetching(false);
                setIsLoading(false);
            }
        }
    }
    useEffect(() => { 
        // When selectedYear changes and it's not the initial render, fetch data
        if (selectedYear !== null) {
            fetchForestExtentMap(selectedYear);
        }
        // When updateTrigger is triggered or area-related dependencies change, fetch data using the selected year
        if (updateTrigger > 0) {
            fetchForestExtentMap(selectedYear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [area_type, area_id, min, max, updateTrigger, selectedYear, setVisibility]);

    const showOnOffForestExtentMap = async (year) =>{
        fetchForestExtentMap(year);
    }

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadForestExtentMap = async (year) => {
        // Set download parameters from props
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'year': year,
            'dataset': 'Forestcover'
        };
        setDownloadParams(params);
        openForm();
    };

    const handleYearChange = async (event) => {
        const newYear = event.target.value;
        setSelectedYear(newYear);
        await showOnOffForestExtentMap(newYear);
    }

    const handleVisibility = (event)=>{
        const newVisibility = event.target.checked;
        setVisibility(newVisibility);
        setIsVisibleForestCoverLegend(newVisibility);
    }

    const handleDownloadForestCoverMap = () => {
        downloadForestExtentMap(selectedYear);
    };

    return (
        <>
            <Grid container alignItems="center" spacing={0}>
                <Grid item>
                    <Tooltip title="Click Download Forest Extent Map" arrow>
                        <IconButton
                            color="primary"
                            aria-label="download"
                            size="small"
                            onClick={handleDownloadForestCoverMap}
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
    );
}
export default ForestExtentMap;