import React from 'react';
import { useAtom } from 'jotai';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import EVIMap from '../maps/EVIMap';
import LandCoverMap from '../maps/LandCoverMap';
import EVIPieChart from '../charts/EVIPieChart';
import EVILineChart from '../charts/EVILineChart';
import LandCoverChart from '../charts/LandCoverChart';

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

    return(
        <Box p={1} sx={{overflowY: "scroll", height: "calc(100vh - 175px)"}}>
            <Typography variant="body2" sx={{fontWeight: 'bold'}}>
                MAP LAYERS 
            </Typography>
            <Typography variant="body2" sx={{fontSize: '12px'}} pb={1}>
                Selected Area: {selectedArea}
            </Typography>
            <EVIMap />
            <Typography variant="body1" sx={{fontSize: '14px', fontWeight: 'bold'}} pt={1}>
                Land Cover Map
            </Typography>
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