import React from 'react';
import { Typography, Box, IconButton, Tooltip } from '@mui/material';

const LayerNameLegendControl = ({ title, icon, tooltipTitle, onClick }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body1" sx={{ fontSize: '14px', fontWeight: 'bold' }} pt={1}>
                {title}
            </Typography>
            <Tooltip title={tooltipTitle} placement="left">
                <IconButton onClick={onClick}>
                    {icon}
                </IconButton>
            </Tooltip>
        </Box>
    );
};

export default LayerNameLegendControl;