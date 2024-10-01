import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend'

const ForestGainLossLegend = () => {
    const Legends = [
        { color: '#173F5F', text: 'Forest Gain' },
        { color: '#fdb827', text: 'Forest Loss' },
    ];
    return (
        <Box>
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