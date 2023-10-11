import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIcon = () => {
    return (
        <div className="loader-overlay">
            <CircularProgress sx={{ color: '#ffff' }} />
        </div>
    );
};

export default LoadingIcon;