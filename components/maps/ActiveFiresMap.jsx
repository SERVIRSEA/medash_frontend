import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { activeFireService } from '@/services';
import { 
    activeFireDataAtom, 
    activeFireMapVisibilityAtom, 
    activeFireDataErrorAtom 
} from '@/state/activeFireAtom';
import { isLoadingAtom } from '@/state/atoms';
import { Typography, Grid, Tooltip, IconButton, Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';

const ActiveFiresMap = () => {
    const [fireData, setFireData] = useAtom(activeFireDataAtom);  // Get the fire data from the state
    const [, setLoading] = useAtom(isLoadingAtom);
    const [error, setError] = useAtom(activeFireDataErrorAtom);
    const [visibility, setVisibility] = useAtom(activeFireMapVisibilityAtom);

    useEffect(() => {
        // Check if fire data is already available in the atom
        if (!fireData || fireData.features.length === 0) {
            const fetchFireData = async () => {
                try {
                    setLoading(true);
                    // Fetch active fire data
                    const response = await activeFireService.getActiveFireData();
                    const data = response.data;
                    
                    // Store the fetched data in the atom
                    setFireData(data);
                } catch (err) {
                    setError("No active fires in last 48 hours");
                } finally {
                    setLoading(false);
                }
            };

            fetchFireData(); 
        }
    }, [fireData, setFireData, setLoading, setError]);

    const handleVisibility = (event) => {
        setVisibility(event.target.checked);
    };

    // Show loading or error message
    if (error) return <div>{error}</div>;

    return (
        <Grid container alignItems="center" spacing={0}>
            <Grid item>
                <Tooltip title="Click to Download Fire Map" arrow>
                    <IconButton
                        color="primary"
                        aria-label="download"
                        size="small"
                        // onClick={handleDownloadFireMap}
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
            <Grid item>
                <Typography variant='body2' sx={{ fontSize: '12px' }}>
                    Active Fires (FIRMS - last 48 hour)
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ActiveFiresMap;