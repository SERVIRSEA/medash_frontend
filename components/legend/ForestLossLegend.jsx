import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const ForestLossLegend = () => {
    return (
        <Box pt={0} pl={2} pb={1}>
            {/* <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>Forest Loss</Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"#fdb827"} text={"Forest Loss"} hasBorder={false} />
            </Box>
        </Box>
    )
}

export default ForestLossLegend