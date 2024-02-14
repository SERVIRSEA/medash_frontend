import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const RiceLegend = () => {
    return (
        <Box pt={2} pl={2} pb={4}>
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>Rice Map Legend</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"#FFFFBE"} text={"Rice"} hasBorder={true} />
            </Box>
        </Box>
    )
}

export default RiceLegend