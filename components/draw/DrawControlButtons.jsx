import React from 'react';
import { IconButton, Tooltip, Divider } from '@mui/material';
import HexagonIcon from '@mui/icons-material/Hexagon';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function DrawControlButtons({ onDrawClick, onUploadClick, onDeleteClick }) {
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

  const containerStyle = {
    position: 'absolute',
    top: '100px',
    right: '10px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    background: '#0f172a',
    borderRadius: '4px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  };

  return (
    <div style={containerStyle} onClick={(e) => e.stopPropagation()}>
      <Tooltip title="Draw & Generate Insights" placement="left" arrow>
        <IconButton
          onClick={onDrawClick}
          sx={{
            ...buttonStyle,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: '#555',
              borderRadius: 0,
            },
          }}
        >
          <HexagonIcon style={{ color: '#fff' }} />
        </IconButton>
      </Tooltip>
      <Divider sx={{ backgroundColor: '#94a3b8' }} />
      <Tooltip title="Upload Layer & Generate Insights" placement="left" arrow>
        <IconButton
          onClick={onUploadClick}
          sx={{
            ...buttonStyle,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: '#555',
              borderRadius: 0,
            },
          }}
        >
          <CloudUploadIcon style={{ color: '#fff' }} />
        </IconButton>
      </Tooltip>
      <Divider sx={{ backgroundColor: '#94a3b8' }} />
      <Tooltip title="Clear Layer" placement="left" arrow>
        <IconButton
          onClick={onDeleteClick}
          sx={{
            ...buttonStyle,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: '#555',
              borderRadius: 0,
            },
          }}
        >
          <DeleteIcon style={{ color: '#fff' }} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
