import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton, Switch, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { areaTypeAtom, areaIdAtom, droughtVisAtom, isLoadingAtom, droughtMapDataAtom, droughtMapDataStoreAtom } from '@/state/atoms';
import { Fetcher } from '@/fetchers/Fetcher';
import { selectedDroughtIndexAtom, selectedDroughtDateAtom } from '@/state/atoms';

export default function DroughtMap() {
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [index, setIndex] = useAtom(selectedDroughtIndexAtom); 
    const [isVisible, setIsVisible] = useAtom(droughtVisAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [, setData] = useAtom(droughtMapDataAtom);
    const [, setDataStore] = useAtom(droughtMapDataStoreAtom);
    const [date, setSelectedDate] = useAtom(selectedDroughtDateAtom);

    const fetchLatestDroughtMap = async (selectedIndex, date) => {
        try {
            setIsLoading(true);
            const params = {
                'area_type': area_type,
                'area_id': area_id,
                'index': selectedIndex,
                'date': date,
            };
            const key = JSON.stringify(params);
            const action = 'get-drought-index-map';
            const data = await Fetcher(action, params);
            setData(data);
            setDataStore((prev) => ({ ...prev, [key]: data }));
            setIsVisible(true);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (index && date) {
            fetchLatestDroughtMap(index, date);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, date]);

    const handleChange = (event) => {
        setSelectedDate(''); // Reset selected date
        setIndex(event.target.value);
    };

    return (
        <Box p={1}> 
            <Typography variant="body2" pl={1}>
                Select Index <span style={{ fontSize: '10px' }}>(*Include Forecast)</span>
            </Typography>
            <FormControl sx={{ p: 1, minWidth: 120 }} size="small" fullWidth>
                <Select
                id="select-index"
                value={index}
                onChange={handleChange}
                style={{ fontSize: '12px' }}
                >
                    <MenuItem value="cdi" style={{ fontSize: '12px' }}>Combined Drought Index (CDI)*</MenuItem>
                    <MenuItem value="spi3" style={{ fontSize: '12px' }}>Standardized Precipitation Index (SPI) – 3months*</MenuItem>
                    <MenuItem value="ndvi" style={{ fontSize: '12px' }}>Normalized Difference Vegetation Index (NDVI)</MenuItem>
                    <MenuItem value="vhi" style={{ fontSize: '12px' }}>Vegetation Health Index (VHI)</MenuItem>
                    <MenuItem value="cwsi" style={{ fontSize: '12px' }}>Crop Water Stress Index (CWSI)</MenuItem>
                    <MenuItem value="soil_moist" style={{ fontSize: '12px' }}>Soil Moisture*</MenuItem>
                    <MenuItem value="rainfall" style={{ fontSize: '12px' }}>Rainfall (mm)*</MenuItem>
                    <MenuItem value="surf_temp" style={{ fontSize: '12px' }}>Surface Temperature (C)*</MenuItem>
                    <MenuItem value="rel_humid" style={{ fontSize: '12px' }}>Relative Humidity (%)*</MenuItem>
                </Select>
            </FormControl>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisible}
                    onChange={() => setIsVisible(!isVisible)} 
                />
                <Typography variant="body2">Drought Index Map</Typography>
            </ListItem>
        </Box>
    );
}
