import React from 'react';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar, Avatar } from '@mui/material';
import { basemapAtom, activeBasemapAtom } from '@/state';

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;


const basemapData = [
    { name: 'Street', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', thumbnail: '/assets/images/basemaps/esri-street.png' },
    { name: 'Satellite', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', thumbnail: '/assets/images/basemaps/esri-satellite.png' },
    { name: 'Terrain', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', thumbnail: '/assets/images/basemaps/esri-terrain.png' },
    { name: 'Gray', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', thumbnail: '/assets/images/basemaps/esri-gray.png' },
    { name: 'Topographic', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', thumbnail: '/assets/images/basemaps/esri-topo.png' },
    { name: 'Dark', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', thumbnail: '/assets/images/basemaps/carto-dark.png' },
    { name: 'OSM', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", thumbnail: '/assets/images/basemaps/osm.png' },
];

const BasemapList = () => {
    const [, setBasemap] = useAtom(basemapAtom);
    const [selectedIndex, setSelectedIndex] = useAtom(activeBasemapAtom);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        setBasemap(basemapData[index].url);
    };
  
    return (
        <Box pl={1} pr={1} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <List component="nav" aria-label="Basemaps" style={{ height: 'calc(100vh - 500px)' }} sx={{ overflow: 'auto' }}>
                {basemapData.map((basemap, index) => (
                    <ListItemButton
                        key={basemap.name}
                        selected={selectedIndex === index}
                        onClick={() => handleListItemClick(index)}
                        sx={{ 
                            cursor: 'pointer', 
                            border: selectedIndex === index ? '2px solid #2563eb' : 'none', // Add border for active basemap
                            borderRadius: '4px', // Optional: adds rounded corners to the border
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                {/* eslint-disable-next-line */}
                                <img src={basemap.thumbnail} alt={basemap.name} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={basemap.name} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    );
};
  
export default BasemapList;