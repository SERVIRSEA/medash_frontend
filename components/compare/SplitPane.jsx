import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Box } from '@mui/material';

const MapComponent = ({ mapData }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return (
    <MapContainer center={mapData.center} zoom={mapData.zoom} style={{ height: '100%', width: '100%' }} scrollWheelZoom={false}>
      <TileLayer url={mapData.tileLayerUrl} attribution={mapData.attribution} />
    </MapContainer>
  );
};

const SplitPane = ({ leftMapData, rightMapData }) => {
  const [leftWidth, setLeftWidth] = useState(50);

  const handleMouseDown = (e) => {
    e.preventDefault();

    const startX = e.clientX;

    const onMouseMove = (moveEvent) => {
      const newWidth = Math.max(10, Math.min(90, ((moveEvent.clientX / window.innerWidth) * 100)));
      setLeftWidth(newWidth);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const styles = {
    splitPane: {
      display: 'flex',
      height: '80vh',
      position: 'relative',
    },
    pane: {
      overflow: 'hidden',
      height: '100%',
      position: 'relative',
    },
    separator: {
      width: '2px',
      backgroundColor: '#334155',
      height: '100%',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    circularIcon: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
      cursor: 'col-resize',
      zIndex: 1000,
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      border: '2px solid #334155',
    },
    icon: {
      fontSize: '30px',
      color: '#2563eb',
    },
  };

  return (
    <Box>
      <Box style={styles.splitPane}>
        <Box style={{ ...styles.pane, width: `${leftWidth}%` }}>
          <MapComponent mapData={leftMapData} />
        </Box>

        <Box style={styles.separator} onMouseDown={handleMouseDown}>
          <div style={styles.circularIcon}>
            <CompareArrowsIcon style={styles.icon} />
          </div>
        </Box>

        <Box style={{ ...styles.pane, width: `${100 - leftWidth}%` }}>
          <MapComponent mapData={rightMapData} />
        </Box>
      </Box>
    </Box>
  );
};

export default SplitPane;
