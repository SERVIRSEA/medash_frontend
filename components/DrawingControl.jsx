import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const DrawingControl = () => {
    const map = useMap();
    const drawControlRef = useRef(null);

    useEffect(() => {
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        const drawOptions = {
        draw: {
            polygon: true,
            polyline: false,
            rectangle: false,
            circle: false,
            marker: false
        },
        edit: {
            featureGroup: drawnItems,
            edit: false
        }
        };

        const drawControl = new L.Control.Draw(drawOptions);
        drawControlRef.current = drawControl;

        map.addControl(drawControl);

        return () => {
        map.removeLayer(drawnItems);
        map.removeControl(drawControl);
        };
    }, [map]);

    const activateDrawingMode = () => {
        if (drawControlRef.current) {
        drawControlRef.current._toolbars.draw._modes.polygon.handler.enable();
        }
    };

    return (
        <Typography 
        variant="caption" 
        lineHeight={1} 
        pt={1} 
        sx={{ cursor: 'pointer' }} 
        onClick={activateDrawingMode}
        >
        DRAW / UPLOAD
        </Typography>
    );
};

export default DrawingControl;