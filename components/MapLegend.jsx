import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Box, IconButton, Paper, Typography, List, ListItem, Tooltip } from '@mui/material';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import CloseIcon from '@mui/icons-material/Close'; 
import LandCoverLegend from './legend/LandCoverLegend';
import EVILegend from './legend/EVILegend';
import ForestCoverLegend from './legend/ForestCoverLegend';
import ForestGainLossLegend from './legend/ForestGainLossLegend';
import FireLegend from './legend/FireLegend';
import RiceLegend from './legend/RiceLegend';
import ForestGainLegend from './legend/ForestGainLegend';
import ForestLossLegend from './legend/ForestLossLegend';
import { 
    legendPanelAtom,
    eviLegendAtom,
    riceLegendAtom,
    lcLegendAtom,
    fireLegendAtom,
    forestGainLegendAtom,
    forestLossLegendAtom,
    forestCoverLegendAtom
} from '@/state/atoms';

const MapLegend = () => {
    const [isExpanded, setIsExpanded] = useAtom(legendPanelAtom);
    const [IsVisibleLCLegend] = useAtom(lcLegendAtom);
    const [IsVisibleFireLegend] = useAtom(fireLegendAtom);
    const [IsVisibleForestGainLegend] = useAtom(forestGainLegendAtom);
    const [IsVisibleForestLossLegend] = useAtom(forestLossLegendAtom);
    const [IsVisibleEVILegend] = useAtom(eviLegendAtom);
    const [IsVisibleRiceLegend] = useAtom(riceLegendAtom);
    const [IsVisibleForestCover] = useAtom(forestCoverLegendAtom);

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
                    minWidth: IsVisibleLCLegend ? '300px' : '180px',
                    maxWidth: isExpanded ? '350px' : '0',
                    maxHeight: isExpanded ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'width 0.3s ease, max-height 0.3s ease',
                    visibility: isExpanded ? 'visible' : 'hidden',
                    opacity: isExpanded ? 1 : 0,
                    zIndex: 1, // Ensure the panel is below the close icon
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
                    {IsVisibleRiceLegend && <RiceLegend />}
                    {IsVisibleFireLegend && <FireLegend />}
                    {IsVisibleForestCover && <ForestCoverLegend/>}
                    {IsVisibleForestGainLegend && <ForestGainLegend/>}
                    {IsVisibleForestLossLegend && <ForestLossLegend/>}
                    
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
