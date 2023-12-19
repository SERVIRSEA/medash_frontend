import React from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { ListItem, IconButton, Switch } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { Fetcher } from '@/fetchers/Fetcher';

import {
    areaTypeAtom,
    areaIdAtom,
    accuRFVisAtom,
    accuRFForecastVisAtom,
    avgTempVisAtom,
    avgTempForecastVisAtom,
    isLoadingAtom
} from '@/state/atoms';

function ShortTermWeatherMap() {
    const [area_type] = useAtom(areaTypeAtom);
    const [area_id] = useAtom(areaIdAtom);
    const [isLoading, setIsLoading] = useAtom(isLoadingAtom);
    const [isVisibleAccuRF, setIsVisibleAccuRF] = useAtom(accuRFVisAtom);
    const [isVisibleAccuRFF, setIsVisibleAccuRFF] = useAtom(accuRFForecastVisAtom);
    const [isVisibleAvgTemp, setIsVisibleAvgTemp] = useAtom(avgTempVisAtom);
    const [isVisibleAvgTempF, setIsVisibleAvgTempF] = useAtom(avgTempForecastVisAtom);

    return (
        <>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisibleAccuRF}
                    onChange={() => setIsVisibleAccuRF(!isVisibleAccuRF)} 
                />
                <Typography variant="body2">Accumulated Rainfall (past 7 days) (mm)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisibleAvgTemp}
                    onChange={() => setIsVisibleAvgTemp(!isVisibleAvgTemp)} 
                />
                <Typography variant="body2">Average temperature (past 7 days) (C)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisibleAccuRFF}
                    onChange={() => setIsVisibleAccuRFF(!isVisibleAccuRFF)} 
                />
                <Typography variant="body2">Accumulated Rainfall (next 7 days): Forecasted (mm)</Typography>
            </ListItem>
            <ListItem disableGutters sx={{ py: 1, display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary" aria-label="download" size="small" sx={{ mr: 0.1 }}>
                    <DownloadIcon />
                </IconButton>
                <Switch
                    size="small"
                    sx={{ mr: 0.1 }}
                    checked={isVisibleAvgTempF}
                    onChange={() => setIsVisibleAvgTempF(!isVisibleAvgTempF)} 
                />
                <Typography variant="body2">Average temperature (next 7 days): Forecasted (C)</Typography>
            </ListItem>
        </>
    );
}

export default ShortTermWeatherMap;
