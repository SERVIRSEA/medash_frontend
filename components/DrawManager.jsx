import React, { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

export default function DrawManager({ drawMode, setDrawMode }) {
    const map = useMap();
    const [drawLayer, setDrawLayer] = useState(null);
    const [popup, setPopup] = useState(null);

    useEffect(() => {
        if (!map || drawMode !== 'polygon') return; // Only run if drawMode is 'polygon'

        // Remove existing draw layer if it exists
        if (drawLayer) {
            map.removeLayer(drawLayer);
        }

        // Create a new layer for drawing the polygon
        const newLayer = L.polygon([]).addTo(map);
        setDrawLayer(newLayer);

        function onMapClick(e) {
            const latlngs = newLayer.getLatLngs()[0];
            // Add the clicked point to the polygon
            newLayer.addLatLng(e.latlng);
        }

        function finishDrawing() {
            if (drawLayer) {
                // Close the polygon by connecting the last point to the first point
                const latlngs = drawLayer.getLatLngs()[0];
                if (latlngs.length > 0 && (latlngs[0] !== latlngs[latlngs.length - 1])) {
                    latlngs.push(latlngs[0]);
                    drawLayer.setLatLngs(latlngs);
                }

                // Remove the popup
                if (popup) {
                    map.closePopup(popup);
                    setPopup(null);
                }

                // Stop drawing
                map.off('click', onMapClick);
                setDrawMode(null); // Reset drawMode or handle as needed
            }
        }

        // Display the popup when there is at least one point
        map.on('click', (e) => {
            if (newLayer.getLatLngs()[0].length > 0 && !popup) {
                const popupContent = `
                    <button id="finish-drawing" style="padding: 5px; cursor: pointer;">Finish</button>
                `;
                const newPopup = L.popup()
                    .setLatLng(e.latlng)
                    .setContent(popupContent)
                    .openOn(map);

                setPopup(newPopup);

                // Add event listener for the Finish button
                map.once('popupopen', () => {
                    document.getElementById('finish-drawing')?.addEventListener('click', finishDrawing);
                });
            } else {
                // Add the point to the polygon
                onMapClick(e);
            }
        });

        return () => {
            map.off('click', onMapClick);
            if (drawLayer) {
                map.removeLayer(drawLayer);
            }
            if (popup) {
                map.closePopup(popup);
                setPopup(null);
            }
        };
    }, [map, drawMode]);

    return null;
}
