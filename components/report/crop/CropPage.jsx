import { Box, Grid, Typography } from '@mui/material';
import FireMap from './CropMap';

const CropPage = ({ decodedParams }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <Typography pt={2} pb={1} variant='h6' sx={{ fontWeight: 'bold' }}>Fire Hotspot</Typography>
                </Grid>
                <Grid item md={6}>
                    <FireMap />
                </Grid>
            </Grid>
        </Box>
    )
}

export default CropPage;
