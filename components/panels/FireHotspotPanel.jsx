import React from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { 
    measureMinYearAtom,
    measureMaxYearAtom,
    areaNameAtom
} from '@/state/atoms';
import FireMap from '../maps/FireMap';
import FireHotspotChart from '../charts/FireHotspotChart';

export default function FireHotspotPanel(){
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [selectedArea] = useAtom(areaNameAtom);

    return(
        <Box sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}}>
            <Typography variant="h6">
                MAP LAYERS 
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <FireMap />
            <br />
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                NUMBER OF FIRE HOTSPOT
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                From {studyLow} To {studyHigh}
            </Typography>
            <FireHotspotChart />
        </Box>
    )
}