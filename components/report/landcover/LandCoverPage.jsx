import { Box, Grid, Typography } from '@mui/material';
import LandCoverMap from './LandCoverMap';
import LandCoverChart from './LandCoverChart';
import LandCoverLegend from './LandCoverLegend';

const LandCoverPage = ({ params }) => {
    const { areaType, areaId, refLow, refHigh, studyLow, studyHigh, year, type } = params;
    const mapParams = {areaType, areaId, year, type};
    const chartParams = {areaType, areaId, refLow, refHigh, studyLow, studyHigh, type};
    
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Typography pt={2} pb={1} variant='h6' sx={{ fontWeight: 'bold' }}>Land Cover</Typography>
                    <LandCoverChart chartParams={chartParams} contentType='text' />
                </Grid>
                <Grid item md={6}>
                    <LandCoverMap mapParams={mapParams} />
                </Grid>
            </Grid>
            <Grid container mt={3} spacing={2}>
                <Grid item md={6}>
                    <LandCoverChart chartParams={chartParams} contentType='baseline' />
                </Grid>
                <Grid item md={6}>
                    <LandCoverChart chartParams={chartParams} contentType='measure' />
                </Grid>
            </Grid>
            <Grid>
                <LandCoverLegend />
            </Grid>
        </Box>
    );
};

export default LandCoverPage;
