import React from 'react'
import { Box, Typography } from '@mui/material'

const LandCoverLegend = () => {
    return (
        <Box pt={2} pl={2} pb={2}>
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>Land Cover Legend</Typography>
            <img src="lc-legend.png" width="125px" alt="EVI" />
        </Box>
    )
}

export default LandCoverLegend;