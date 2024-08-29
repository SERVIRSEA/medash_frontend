import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw';

export default function DrawingControl() {
    const map = useMap();
    const [drawControl, setDrawControl] = useState(null);

    useEffect(() => {
        if (!map) return;

        // Check if the control is already added to avoid duplication
        if (drawControl) {
            map.removeControl(drawControl);
        }

        // Create a new draw control
        const newDrawControl = new L.Control.Draw({
            draw: {
                polyline: false,
                polygon: true,
                rectangle: true,
                circle: true,
                marker: false,
            },
            edit: {
                featureGroup: new L.FeatureGroup().addTo(map),
                remove: true,
            },
        }).addTo(map);

        setDrawControl(newDrawControl);

        // Handle drawing events
        map.on(L.Draw.Event.CREATED, (e) => {
            const layer = e.layer;
            newDrawControl.options.edit.featureGroup.addLayer(layer);
        });

        // Cleanup on unmount
        return () => {
            if (drawControl) {
                map.removeControl(drawControl);
            }
        };
    }, [map, drawControl]);

    return null;
}
