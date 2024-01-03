import React from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { 
    areaNameAtom
} from '@/state/atoms';
import GLADAlertMap from '../maps/GLADAlertMap';
import SARAlertMap from '../maps/SARAlertMap';
import GLADAlertChart from '../charts/GLADAlertChart';
import SARAlertChart from '../charts/SARAlertChart';

export default function ForestAlertPanel(){
    const [selectedArea] = useAtom(areaNameAtom);
    return (
        <Box sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}} pl={1} pt={1}>
            <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                MAP LAYERS 
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <Typography variant="body2">
                Deforestation Area from GLAD Alert System 
            </Typography>
            <br />
            <GLADAlertMap />
            <br />
            <Typography variant="body2">
                Deforestation Area from SAR Alert System 
            </Typography>
            <br />
            <SARAlertMap />
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