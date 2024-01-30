import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingCard() {
    const cardStyle = {
        boxShadow: 'none', 
        border: 'none', 
    };
    return (
        <Card style={cardStyle}>
            <CardContent>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                >
                    <CircularProgress />
                </Box>
            </CardContent>
        </Card>
    );
}

export default LoadingCard;