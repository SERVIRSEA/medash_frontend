import React from 'react';
import TooltipIconButton from '../common/TooltipIconButton';
import { Button, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

const RefreshMap = () => {
    const handleRefreshClick = () => {
        // Reload the entire page
        window.location.reload();
    };

    const iconStyle = { color: "#fff" };

    return (
        <TooltipIconButton
            title="Refresh Map"
            onClick={handleRefreshClick}
            icon={<RefreshIcon style={iconStyle} />}
        />
    );
};

export default RefreshMap;