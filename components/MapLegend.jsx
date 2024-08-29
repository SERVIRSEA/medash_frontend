import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Box, IconButton, Paper, Typography, List, ListItem, Tooltip } from '@mui/material';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import CloseIcon from '@mui/icons-material/Close'; 
import { 
    legendPanelAtom,
    eviLegendAtom,
    lcLegendAtom,
    forestGainLegendAtom,
    forestLossLegendAtom, 
    forestCoverLegendAtom,
    riceLegendAtom,
    rubberLegendAtom,
    gladAlertLegendAtom,
    combineAlertLegendAtom,
    fireLegendAtom,
    shortTermWeatherLegendAtom,
    longTermWeatherLegendAtom,
    droughtLegendAtom
} from '@/state/atoms';
import EVILegend from './legend/EVILegend';
import LandCoverLegend from './legend/LandCoverLegend';
import ForestGainLegend from './legend/ForestGainLegend';
import ForestLossLegend from './legend/ForestLossLegend';
import ForestCoverLegend from './legend/ForestCoverLegend';
import RiceLegend from './legend/RiceLegend';
import RubberLegend from './legend/RubberLegend';
import FireLegend from './legend/FireLegend';
import GLADAlertLegend from './legend/GLADAlertLegend';
import SARFDASAlertLegend from './legend/SARFDASAlertLegend';
import ShortTermWeatherLegend from './legend/ShortTermWeatherLegend';
import SeasonalWeatherLegend from './legend/SeasonalWeatherLegend';
import DroughtLegend from './legend/DroughtLegend';

const MapLegend = () => {
    const [isExpanded, setIsExpanded] = useAtom(legendPanelAtom);
    const [IsVisibleLCLegend] = useAtom(lcLegendAtom);
    const [IsVisibleEVILegend] = useAtom(eviLegendAtom);
    const [IsVisibleForestGainLegend] = useAtom(forestGainLegendAtom);
    const [IsVisibleForestLossLegend] = useAtom(forestLossLegendAtom);
    const [IsVisibleForestCover] = useAtom(forestCoverLegendAtom);
    const [IsVisibleRiceLegend] = useAtom(riceLegendAtom);
    const [IsVisibleRubberLegend] = useAtom(rubberLegendAtom);
    const [IsVisibleGladAlertLegend] = useAtom(gladAlertLegendAtom);
    const [IsVisibleCombineAlertLegend] = useAtom(combineAlertLegendAtom);
    const [IsVisibleFireLegend] = useAtom(fireLegendAtom);
    const [IsVisibleShortTermLegend] = useAtom(shortTermWeatherLegendAtom);
    const [IsVisibleLongTermLegend] = useAtom(longTermWeatherLegendAtom);
    const [IsVisibleDroughtLegend] = useAtom(droughtLegendAtom);
    
    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                bottom: 20,
                right: 0,
                zIndex: 2,
            }}
        >
            <Paper
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    minWidth: IsVisibleLCLegend ? '300px' : IsVisibleShortTermLegend ? '250px' : IsVisibleLongTermLegend ? '250px' : IsVisibleDroughtLegend ? '250px' : '180px',
                    maxWidth: isExpanded ? '350px' : '0',
                    maxHeight: isExpanded ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'width 0.3s ease, max-height 0.3s ease',
                    visibility: isExpanded ? 'visible' : 'hidden',
                    opacity: isExpanded ? 1 : 0,
                    zIndex: 1, 
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', padding: 0, background: '#2563eb' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left', fontSize: '14px', fontWeight: 'bold', paddingLeft: 2, paddingTop: 1.3, paddingBottom: 1, color: '#fafafa' }}>Map Legend</Typography>
                    <Tooltip title='Click to hide legend panel' placement="left">
                        <IconButton onClick={handleToggle} sx={{ position: 'absolute', top: '1px', right: '0px', zIndex: 2, color: '#fafafa' }}>
                            <CloseIcon sx={{ fontSize: 20 }} />
                        </IconButton> 
                    </Tooltip>
                </Box>
                <Box pr={1}>
                    {IsVisibleEVILegend && <EVILegend />}
                    {IsVisibleLCLegend && <LandCoverLegend />}
                    {IsVisibleForestCover && <ForestCoverLegend/>}
                    {IsVisibleForestGainLegend && <ForestGainLegend/>}
                    {IsVisibleForestLossLegend && <ForestLossLegend/>}
                    
                    {IsVisibleRiceLegend && <RiceLegend />}
                    {IsVisibleRubberLegend && <RubberLegend />}
                    
                    {IsVisibleCombineAlertLegend && <SARFDASAlertLegend />}
                    {IsVisibleGladAlertLegend && <GLADAlertLegend />}
                    
                    {IsVisibleFireLegend && <FireLegend />}
                    {IsVisibleShortTermLegend && <ShortTermWeatherLegend />}
                    {IsVisibleLongTermLegend && <SeasonalWeatherLegend />}
                    {IsVisibleDroughtLegend && <DroughtLegend />}
                </Box>
            </Paper>
            {!isExpanded && (
                <IconButton 
                    onClick={handleToggle} 
                    sx={{ 
                        backgroundColor: '#cbd5e1', 
                        borderRadius: '50%', 
                        position: 'absolute', 
                        top: '-40px', 
                        right: '0px', 
                        marginBottom: '20px',
                        zIndex: 2,
                    }}
                >
                    <Tooltip title='Click to expand legend panel' placement="left">
                        <LegendToggleIcon />
                    </Tooltip>
                </IconButton>
            )}
        </Box>
    );
};

export default MapLegend;
