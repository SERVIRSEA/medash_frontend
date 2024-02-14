import React from 'react'
import { Box, Typography } from '@mui/material'

const EVILegend = () => {
    return (
        <Box pt={2} pl={2} pb={4}>
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>EVI Legend</Typography>
            <img src="evi-legend.png" width="100px" alt="EVI" />
        </Box>
    )
}

export default EVILegend