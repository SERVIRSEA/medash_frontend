import React from 'react';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function HeaderWithClose({ title, onClose, icon }) {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                alignItems: 'center',  
                justifyContent: 'space-between', 
                padding: '0 8px',      
                background: '#2563eb', 
                height: '48px'         
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {icon && (
                    <Box pt={1} sx={{ paddingRight: 1 }}> 
                        {icon}
                    </Box>
                )}
                <Typography 
                    variant="h6" 
                    sx={{ 
                        fontSize: '16px', 
                        fontWeight: 'bold', 
                        color: '#fafafa' 
                    }}
                >
                    {title}
                </Typography>
            </Box>
            <Tooltip title='Close' placement="bottom">
                <IconButton 
                    sx={{ 
                        color: '#fafafa', 
                        paddingRight: 1 
                    }} 
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton> 
            </Tooltip>
        </Box>
    );
}