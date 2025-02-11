import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton, Switch, Box, ListSubheader, Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Fetcher } from '@/fetchers/Fetcher';
import { 
    areaTypeAtom, 
    areaIdAtom, 
    droughtVisAtom, 
    isLoadingAtom, 
    droughtMapDataAtom, 
    droughtMapDataStoreAtom,
    selectedDroughtIndexAtom, 
    selectedDroughtDateAtom, 
    alertOpenAtom, 
    alertMessageAtom,
    geojsonDataAtom 
} from '@/state/atoms';
import DownloadForm from "../modals/DownloadForm";
import { climateService } from '@/services';

export default function DroughtMap() {
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [geojsonData] = useAtom(geojsonDataAtom);
    const [index, setIndex] = useAtom(selectedDroughtIndexAtom); 
    const [isVisible, setIsVisible] = useAtom(droughtVisAtom);
    const [, setIsLoading] = useAtom(isLoadingAtom);
    const [, setData] = useAtom(droughtMapDataAtom);
    const [dataStore, setDataStore] = useAtom(droughtMapDataStoreAtom);
    const [date, setSelectedDate] = useAtom(selectedDroughtDateAtom);
    const [, setAlertOpen] = useAtom(alertOpenAtom);
    const [, setAlertMessage] = useAtom(alertMessageAtom);
    const [isFormOpen, setIsFormOpen] = useState(false); 
    const [downloadParams, setDownloadParams] = useState(null);

    const fetchLatestDroughtMap = async (selectedIndex, date, area_type, area_id) => {
        try {
            setIsLoading(true);
            const params = {
                'area_type': area_type,
                'area_id': area_id,
                'index': selectedIndex,
                'date': date,
            };

            if (geojsonData) {
                const geojsonString = JSON.stringify(geojsonData);
                params.geom = geojsonString;
            }
            
            const key = JSON.stringify(params);
    
            // Check if data for the given parameters is already available in the data store
            if (!dataStore[key]) {
                // Data not found, fetch it
                // const action = 'get-drought-index-map';
                // const data = await Fetcher(action, params);
                const mapData = await climateService.getMap(params);
                const data = mapData.data;
                
                // Update the data store
                setDataStore((prev) => ({ ...prev, [key]: data }));
    
                // Set the fetched data
                setData(data);
                setIsVisible(true);
            } else {
                // Data already exists in the data store
                // Reuse the existing data
                setData(dataStore[key]);
                setIsVisible(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };    

    useEffect(() => {
        if (index && date) {
            fetchLatestDroughtMap(index, date, area_type, area_id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, date, area_type, area_id]);

    const handleChange = (event) => {
        setSelectedDate(''); // Reset selected date
        setIndex(event.target.value);
    };

    const openForm = () => {
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
    };

    const downloadDroughtMap = async (year) => {
        const params = {
            'area_type': area_type,
            'area_id': area_id,
            'index': index,
            'date': date,
            'dataset': 'Drought'
        };
        setDownloadParams(params);
        openForm();
    };

    // const downloadDroughtMap = async () => {
    //     try {
    //         setIsLoading(true);

    //         const params = {
    //             'area_type': area_type,
    //             'area_id': area_id,
    //             'index': index,
    //             'date': date,
    //         };

    //         const action = 'download-drought-index-map';
    //         const data = await Fetcher(action, params);

    //         if (data.success === 'success' && data.downloadURL) {
    //             const downloadURL = data.downloadURL;

    //             // Create a hidden <a> element to trigger the download
    //             const a = document.createElement('a');
    //             a.href = downloadURL;
    //             document.body.appendChild(a);
    //             a.click();
    //             // Cleanup
    //             a.remove();
    //         } else {
    //             setAlertMessage('Your selected area is too large to download. Please choose a specific province, district, or protected area, or draw a smaller area on the map. Once you have updated the map accordingly, click the download icon again to initiate the download process.')
    //             setAlertOpen(true);
    //             throw new Error('Failed to download drought map.');
    //         }
    //     } catch (error) {
    //         console.error('Error downloading drought map:', error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    return (
        <Box p={1}> 
            <Typography variant="body2" sx={{fontSize: '12px'}} pl={1}>
                Select Index <span style={{ fontSize: '10px' }}>(*Include Forecast)</span>
            </Typography>
            <FormControl sx={{ py: 1, minWidth: 120 }} size="small" fullWidth>
                <Select
                    id="select-index"
                    value={index}
                    onChange={handleChange}
                    style={{ fontSize: '12px', marginLeft: '8px' }}
                >
                    <ListSubheader>
                        <Typography variant="h6" sx={{fontWeight: "bold", fontSize: "14px"}}>Satellite Based</Typography>
                    </ListSubheader>
                    <MenuItem value="ndvi" style={{ fontSize: '12px' }}>Normalized Difference Vegetation Index (NDVI)</MenuItem>
                    <MenuItem value="vhi" style={{ fontSize: '12px' }}>Vegetation Health Index (VHI)</MenuItem>
                    <MenuItem value="cwsi" style={{ fontSize: '12px' }}>Crop Water Stress Index (CWSI)</MenuItem>
                    <ListSubheader>
                        <Typography variant="h6" pt={1} sx={{fontWeight: "bold", fontSize: "14px"}}>Model Based</Typography>
                    </ListSubheader>
                    <MenuItem value="cdi" style={{ fontSize: '12px' }}>Combined Drought Index (CDI)*</MenuItem>
                    <MenuItem value="spi3" style={{ fontSize: '12px' }}>Standardized Precipitation Index (SPI) – 3months*</MenuItem>
                    <MenuItem value="soil_moist" style={{ fontSize: '12px' }}>Soil Moisture*</MenuItem>
                    <MenuItem value="rainfall" style={{ fontSize: '12px' }}>Rainfall (mm)*</MenuItem>
                    <MenuItem value="surf_temp" style={{ fontSize: '12px' }}>Surface Temperature (°C)*</MenuItem>
                    <MenuItem value="rel_humid" style={{ fontSize: '12px' }}>Relative Humidity (%)*</MenuItem>
                </Select>
            </FormControl>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <Tooltip title="Click to Download Drought Map" arrow>
                    <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }} onClick={downloadDroughtMap}>
                        <DownloadIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Switch to show/hide layer on Map" arrow>
                    <Switch
                        size="small"
                        sx={{ mr: 0.1 }}
                        checked={isVisible}
                        onChange={() => setIsVisible(!isVisible)} 
                    />
                </Tooltip>
                <Typography variant="body2" sx={{fontSize: '12px'}} pl={1}>Drought Index Map</Typography>
            </ListItem>
            <DownloadForm 
                isOpen={isFormOpen} 
                onClose={closeForm} 
                downloadParams={downloadParams} 
            />  
        </Box>
    );
}
