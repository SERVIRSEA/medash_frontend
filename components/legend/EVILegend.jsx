import React from 'react'
import { Box, Typography } from '@mui/material'

const palette = ['#E76F51', '#F4A261', '#E9C46A', '#2A9D8F', '#264653'];

const EVILegend = () => {
    const colorStops = palette.map((color, index) => `${color} ${(index * 100) / (palette.length - 1)}%`).join(', ');

    const gradientStyle = {
        background: `linear-gradient(to right, ${colorStops})`,
        width: '100%',
        height: '20px',
    };

    return (
        <Box pt={2} pl={1} pb={2} pr={2}>
            <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold' }} pb={1}>EVI Legend</Typography>
            <div style={{ ...gradientStyle, height: '20px', width: '100%' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>Decrease</Typography>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>Stable</Typography>
                <Typography variant="body2" sx={{ fontSize: '12px' }}>Increase</Typography>
            </div>
        </Box>
    );
};

export default EVILegend