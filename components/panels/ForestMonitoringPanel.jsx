import React from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ForestGainMap from '../maps/ForestGainMap';
import ForestLossMap from '../maps/ForestLossMap';
import ForestExtentMap from '../maps/ForestExtentMap';
import ForestNonForestChart from '../charts/ForestNonForestChart';
import ForestCoverChart from '../charts/ForestCoverChart';
import ForestChangeGainLossChart from '../charts/ForestChangeGainLossChart';
import ForestGainLoss from '../charts/ForestGainLoss';
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
            <Box p={1} sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}}>
                <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                    MAP LAYERS 
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                    Selected Area: {selectedArea}
                </Typography>
                <ForestGainMap />
                <ForestLossMap />
                <ForestExtentMap />
                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold'}} pb={1}>
                    AREA OF FOREST COVER
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                From {studyLow} To {studyHigh}
                </Typography>
                <ForestCoverChart />
                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold'}} pb={1}>
                    AREA OF FOREST AND NON-FOREST
                </Typography>
                <Typography variant="body2" sx={{fontSize: '12px'}} pb={2}>
                    From {studyLow} To {studyHigh}
                </Typography>
                <ForestNonForestChart />
                <br />
                <Typography variant="body2" sx={{fontWeight: 'bold'}} pb={1}>
                    THE CHANGE OF FOREST GAIN AND LOSS
                </Typography>
                <ForestGainLoss />
                 <br />
                <ForestChangeGainLossChart />
            </Box>
        </>
    )
}