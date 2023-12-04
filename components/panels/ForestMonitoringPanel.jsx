import React from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ForestGainMap from '../maps/ForestGainMap';
import ForestLossMap from '../maps/ForestLossMap';
import ForestExtentMap from '../maps/ForestExtentMap';
import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    areaNameAtom
} from '@/state/atoms';

export default function ForestMonitoringPanel(){
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);
    return (
        <>
            <Box sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}}>
                <Typography variant="h6">
                    MAP LAYERS 
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                    Selected Area: {selectedArea}
                </Typography>
                <ForestGainMap />
                <ForestLossMap />
                <ForestExtentMap />
            </Box>
        </>
    )
}