import React from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton, Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Fetcher } from '@/fetchers/Fetcher';

import {
    areaTypeAtom,
    areaIdAtom,
    seasonalRFVisAtom,
    seasonalTempVisAtom,
    avgTempVisAtom,
    avgTempForecastVisAtom,
    isLoadingAtom
} from '@/state/atoms';

function SeasonalWeatherMap() {
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    const [isVisibleRF, setIsVisibleRF] = useAtom(seasonalRFVisAtom);
    const [isVisibleTemp, setIsVisibleTemp] = useAtom(seasonalTempVisAtom);

    return (
        <>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisibleRF}
                    onChange={() => setIsVisibleRF(!isVisibleRF)} 
                />
                <Typography variant="body2">Rainfall Anomaly (next 3 months): Forecasted (mm)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisibleTemp}
                    onChange={() => setIsVisibleTemp(!isVisibleTemp)} 
                />
                <Typography variant="body2">Temperature Anomaly (next 3 months): Forecasted (C)</Typography>
            </ListItem>
        </>
    );
}

export default SeasonalWeatherMap;
