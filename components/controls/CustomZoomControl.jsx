import React, { useState } from 'react';
import { useMap } from 'react-leaflet';
import { IconButton, Tooltip, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const CustomZoomControl = () => {
  const map = useMap();
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const controlContainerStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px', 
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    background: '#0f172a', 
    borderRadius: '4px', 
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
  };
  
  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    margin: '0', 
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    zIndex: 1000,
  };

  return (
    <div style={controlContainerStyle}>
      <Tooltip title="Zoom In" placement="left" arrow>
        <IconButton
          onClick={handleZoomIn}
          onMouseEnter={() => handleMouseEnter('zoomIn')}
          onMouseLeave={handleMouseLeave}
          sx={{
            ...buttonStyle,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: '#555',
              borderRadius: 0,
            },
          }}
        >
          <AddIcon style={{ color: '#fff' }} />
        </IconButton>
      </Tooltip>
      <Divider sx={{ backgroundColor: '#94a3b8' }} />
      <Tooltip title="Zoom Out" placement="left" arrow>
        <IconButton
          onClick={handleZoomOut}
          onMouseEnter={() => handleMouseEnter('zoomOut')}
          onMouseLeave={handleMouseLeave}
          sx={{
            ...buttonStyle,
            borderRadius: 0,
            '&:hover': {
              backgroundColor: '#555',
              borderRadius: 0,
            },
          }}
        >
          <RemoveIcon style={{ color: '#fff' }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CustomZoomControl;