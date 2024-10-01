import React from 'react';
import { Box, Typography } from '@mui/material';

const IconWithText = ({ icon, title, color = '#fafafa', fontSize = '16px', fontWeight = 'bold' }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon && (
                <Box sx={{ paddingTop: '4px', paddingRight: 1 }}>
                    {icon}
                </Box>
            )}
            <Typography 
                variant="h6" 
                sx={{ 
                    fontSize: fontSize, 
                    fontWeight: fontWeight, 
                    color: color 
                }}
            >
                {title}
            </Typography>
        </Box>
    );
};

export default IconWithText;