import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const GLADAlertLegend = () => {
    return (
        <Box>
            {/* <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>GLAD Alert Legend</Typography> */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"#a31545"} text={"GLAD Alert"} />
            </Box>
        </Box>
    )
}

export default GLADAlertLegend