import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const ForestGainLegend = () => {
    return (
        <Box>
            {/* <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>Forest Gain</Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"#16a34a"} text={"Forest Gain"} hasBorder={false} />
            </Box>
        </Box>
    )
}

export default ForestGainLegend