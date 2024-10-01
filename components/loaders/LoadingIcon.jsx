import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingIcon = () => {
    const loaderOverlayStyles = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        zIndex: 9999, 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    return (
        <div style={loaderOverlayStyles}>
            <CircularProgress sx={{ color: '#ffff' }} />
        </div>
    );
};

export default LoadingIcon;