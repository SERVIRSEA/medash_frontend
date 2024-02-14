import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import LayerNameLegendControl from '../LayerNameLegendControl';
import LegendToggleIcon from '@mui/icons-material/LegendToggle';
import { 
    areaNameAtom
} from '@/state/atoms';
import GLADAlertMap from '../maps/GLADAlertMap';
import SARAlertMap from '../maps/SARAlertMap';
import GLADAlertChart from '../charts/GLADAlertChart';
import SARAlertChart from '../charts/SARAlertChart';
import GLADAlertLegend from '../legend/GLADAlertLegend';
import SARAlertLegend from '../legend/SARAlertLegend';

export default function ForestAlertPanel(){
    const [selectedArea] = useAtom(areaNameAtom);
    
    const [isGLADOpen, setIsGLADOpen] = useState(false);
    const [isSAROpen, setIsSAROpen] = useState(false);

    const handleGLADClick = () => {
        setIsGLADOpen(!isGLADOpen);
    };
    
    const handleSARClick = () => {
        setIsSAROpen(!isSAROpen);
    };

    return (
        <Box sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}} pl={1} pt={1}>
            <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                MAP LAYERS 
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <LayerNameLegendControl
                title="Deforestation Area from GLAD Alert System"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show GLAD alert legend"
                onClick={handleGLADClick}
            />
            <GLADAlertMap />
            {isGLADOpen  && ( <GLADAlertLegend /> )}
            <br />
            <LayerNameLegendControl
                title="Deforestation Area from SAR Alert System"
                icon={<LegendToggleIcon />}
                tooltipTitle="Click to show SAR alert legend"
                onClick={handleSARClick}
            />
            <br />
            <SARAlertMap />
            {isSAROpen  && ( <SARAlertLegend /> )}
            <br />
            <Typography variant="body2">
                TOTAL AREA OF GLAD ALERT SYSTEM 
            </Typography>
            <br />
            <GLADAlertChart />
            <br />
            <Typography variant="body2">
                TOTAL AREA OF SAR ALERT SYSTEM 
            </Typography>
            <br />
            <SARAlertChart />
        </Box>
    )
}