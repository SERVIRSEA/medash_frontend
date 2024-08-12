import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const ForestCoverLegend = () => {
    return (
        <Box pt={2} pl={2} pb={0}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ColorLegend color={"#138D75"} text={"Forest Cover"} />
            </Box>
        </Box>
    )
}

export default ForestCoverLegend