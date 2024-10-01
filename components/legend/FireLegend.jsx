import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const FireLegend = () => {
    return (
        <Box>
            {/* <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>Fire Map Legend</Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"red"} text={"Fire Hotspot"} />
            </Box>
        </Box>
    )
}

export default FireLegend