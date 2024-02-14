import React from 'react';
import { Box, Typography } from '@mui/material';

const ColorLegend = ({ color, text, hasBorder = false }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }} pt={1}>
            <Box 
                sx={{ 
                    width: 15, 
                    height: 15, 
                    backgroundColor: color, 
                    marginRight: 1, 
                    border: hasBorder ? '1px solid black' : 'none' 
                }} 
            />
            <Typography variant="body2" sx={{fontSize: '12px'}}>{text}</Typography>
        </Box>
    );
};

export default ColorLegend;