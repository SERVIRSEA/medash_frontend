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
import EVILegend from './EVILegend';
import LandCoverLegend from './LandCoverLegend';
import ForestGainLegend from './ForestGainLegend';
import ForestLossLegend from './ForestLossLegend';
import ForestCoverLegend from './ForestCoverLegend';
import RiceLegend from './RiceLegend';
import RubberLegend from './RubberLegend';
import FireLegend from './FireLegend';
import GLADAlertLegend from './GLADAlertLegend';
import SARFDASAlertLegend from './SARFDASAlertLegend';
import ShortTermWeatherLegend from './ShortTermWeatherLegend';
import SeasonalWeatherLegend from './SeasonalWeatherLegend';
import DroughtLegend from './DroughtLegend';

const LegendContent = () => {
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
    );
};

export default LegendContent;