import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Typography, Box, IconButton, Tooltip } from '@mui/material';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import EVIMap from '../maps/EVIMap';
import LandCoverMap from '../maps/LandCoverMap';
import EVIPieChart from '../charts/EVIPieChart';
import EVILineChart from '../charts/EVILineChart';
import LandCoverChart from '../charts/LandCoverChart';
import LayerNameLegendControl from '../LayerNameLegendControl';
import EVILegend from '../legend/EVILegend';
import LandCoverLegend from '../legend/LandCoverLegend';

import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    areaNameAtom,
    minYearLandCover,
    maxYearLandCover
} from '@/state/atoms';

export default function BiophysicalPanel(){
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    const [minYLC] = useAtom(minYearLandCover);
    const [maxYLC] = useAtom(maxYearLandCover);

    const [isLandCoverOpen, setIsLandCoverOpen] = useState(false);
    const [isEviOpen, setIsEviOpen] = useState(false);

    const handleLandCoverClick = () => {
        setIsLandCoverOpen(!isLandCoverOpen);
    };
    
    const handleEviClick = () => {
        setIsEviOpen(!isEviOpen);
    };

    return(
        <Box p={1} sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}}>
            <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                MAP LAYERS 
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <LayerNameLegendControl
                title="EVI Map"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show EVI legend"
                onClick={handleEviClick}
            />
            <EVIMap />
            {isEviOpen  && ( <EVILegend /> )}
            <LayerNameLegendControl
                title="Land Cover Map"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show landcover legend"
                onClick={handleLandCoverClick}
            />
            {isLandCoverOpen  && ( <LandCoverLegend /> )}
            <LandCoverMap />
            <br />
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>
                BIOPHYSICAL HEALTH
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                From {studyLow} To {studyHigh}
            </Typography>
            <EVIPieChart />
            <br />
            <EVILineChart />
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>
                LAND COVER 
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                From {minYLC} To {maxYLC}
            </Typography>
            <LandCoverChart />
        </Box>
    )
}