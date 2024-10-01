import React from 'react';
import { Button } from '@mui/material';

const CustomButton = ({
    onClick,
    color,
    hoverColor,
    textColor,
    hoverTextColor,
    variant = 'contained',
    size="medium",
    sx, 
    children,
    ...props
}) => {
    return (
        <Button
            onClick={onClick}
            variant={variant}
            size={size}
            sx={{
                textTransform: 'none',
                borderColor: color,
                color: textColor,
                backgroundColor: variant === 'contained' ? color : 'transparent', // Ensure contained buttons have background
                '&:hover': {
                    backgroundColor: hoverColor,
                    color: hoverTextColor,
                    borderColor: hoverColor,
                },
                ...sx, 
            }}
            {...props} 
        >
            {children}
        </Button>
    );
};

export default CustomButton;