import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const SARFDASAlertLegend = () => {
    return (
        <Box pt={2} pl={2} pb={4}>
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>SARFDAS Alert Legend</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"red"} text={"SARFDAS Alert"} />
            </Box>
        </Box>
    )
}

export default SARFDASAlertLegend;