import React, { useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { userLocationAtom } from '@/state';
import '../../styles/markerStyle.css'; // Pulse marker style

// Custom pulse marker using L.divIcon with CSS animation
const CustomMarker = () => {
    return L.divIcon({
        className: 'pulse-marker', // Only the pulse marker, no text
        iconSize: [20, 20], // Adjust size of marker if needed
    });
};

const LocationLayer = () => {
    const [userLocation] = useAtom(userLocationAtom);
    const map = useMap();
    const markerRef = useRef(null); // Ref to store the marker instance

    // Provide a fallback if userLocation is null
    const lat = userLocation?.lat ?? 0;
    const long = userLocation?.long ?? 0;

    useEffect(() => {
        if (lat !== 0 && long !== 0) {
            // Clear any existing marker
            if (markerRef.current) {
                map.removeLayer(markerRef.current);
            }

            // Add the marker
            const marker = L.marker([lat, long], {
                icon: CustomMarker(),
            }).addTo(map);

            // Store the marker in the ref
            markerRef.current = marker;

            // Zoom to the marker's location
            map.setView([lat, long], 15, { animate: true });

            // Ensure the map re-renders after the zoom
            map.once('zoomend', () => {
                map.invalidateSize(); // Force map to re-render and adjust size

                // Optional marker animation
                const markerElement = marker.getElement();
                if (markerElement) {
                    markerElement.style.transition = 'transform 0.5s';
                    markerElement.style.transform = 'scale(1.5)';
                    setTimeout(() => {
                        markerElement.style.transform = 'scale(1)';
                    }, 500);
                }
            });

            // Clean up the marker when component unmounts
            return () => {
                if (markerRef.current) {
                    map.removeLayer(markerRef.current);
                    markerRef.current = null;
                }
            };
        }
    }, [lat, long, map]);

    return null; // No visible JSX needed
};

export default LocationLayer;
