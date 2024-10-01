import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const SARAlertLegend = () => {
    return (
        <Box>
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>SAR Alert Legend</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"red"} text={"SAR Alert"} />
            </Box>
        </Box>
    )
}

export default SARAlertLegend