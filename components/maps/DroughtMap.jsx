import React, { useState } from 'react';
import { useAtom } from 'jotai';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton, Switch, Box } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { droughtVisAtom } from '@/state/atoms';

export default function DroughtMap() {
    const [index, setIndex] = useState('cdi'); 
    const [isVisible, setIsVisible] = useAtom(droughtVisAtom);

    const handleChange = (event) => {
        setIndex(event.target.value);
    };

    return (
        <Box p={2}> 
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
                <MenuItem value="spi" style={{ fontSize: '12px' }}>Standardized Precipitation Index (SPI) – 3months*</MenuItem>
                <MenuItem value="ndvi" style={{ fontSize: '12px' }}>Normalized Difference Vegetation Index (NDVI)</MenuItem>
                <MenuItem value="vhi" style={{ fontSize: '12px' }}>Vegetation Health Index (VHI)</MenuItem>
                <MenuItem value="cwsi" style={{ fontSize: '12px' }}>Crop Water Stress Index (CWSI)</MenuItem>
                <MenuItem value="sm" style={{ fontSize: '12px' }}>Soil Moisture*</MenuItem>
                <MenuItem value="rf" style={{ fontSize: '12px' }}>Rainfall (mm)*</MenuItem>
                <MenuItem value="st" style={{ fontSize: '12px' }}>Surface Temperature (C)*</MenuItem>
                <MenuItem value="rh" style={{ fontSize: '12px' }}>Relative Humidity (%)*</MenuItem>
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
