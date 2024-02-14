import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const ForestGainLossLegend = () => {
    const Legends = [
        { color: 'green', text: 'Forest Gain' },
        { color: 'red', text: 'Forest Loss' },
    ];
    return (
        <Box pt={2} pl={2} pb={4}>
            <Typography variant="body2" sx={{fontSize: '12px', fontWeight: 'bold'}}>Forest Gain & Loss Legend</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {Legends.map((legend, index) => (
                <React.Fragment key={index}>
                    <ColorLegend color={legend.color} text={legend.text} />
                    {index < Legends.length - 1 && <Box sx={{ width: 20 }} />} {/* Add gap except for the last one */}
                </React.Fragment>
            ))}
            </Box>
        </Box>
    )
}

export default ForestGainLossLegend