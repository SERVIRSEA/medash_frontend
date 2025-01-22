import { Box, Grid, Typography } from '@mui/material';
import FireMap from './FireMap';

const FirePage = ({ params }) => {
    const { areaType, areaId, refLow, refHigh, studyLow, studyHigh, year } = params;

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Typography pt={2} pb={1} variant='h6' sx={{ fontWeight: 'bold' }}>Fire Hotspot</Typography>
                </Grid>
                <Grid item md={6}>
                    <FireMap mapParams={{ areaType, areaId, year }}/>
                </Grid>
            </Grid>
        </Box>
    )
}

export default FirePage
