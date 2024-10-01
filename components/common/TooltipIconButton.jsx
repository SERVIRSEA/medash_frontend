import React from 'react';
import { IconButton, Tooltip, Divider } from '@mui/material';

const TooltipIconButton = ({ title, onClick, icon, showDivider = true }) => {
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    zIndex: 1000,
  };

  return (
    <>
      <Tooltip title={title} placement="left" arrow>
        <IconButton
          onClick={onClick}
          sx={{
            ...buttonStyle,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: '#555',
              borderRadius: 0,
            },
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>
      {showDivider && <Divider sx={{ backgroundColor: '#94a3b8' }} />}
    </>
  );
};

export default TooltipIconButton;