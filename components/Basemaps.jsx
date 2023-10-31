import React from 'react';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar, Avatar, Typography} from '@mui/material';

import { basemapAtom } from '@/state/atoms';

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

const activeBasemapAtom = atom(7);

const basemapData = [
    { name: 'Open Street Map', url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", thumbnail: '/assets/images/basemaps/osm.png' },
    { name: 'Mapbox Dark', url: `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, thumbnail: '/assets/images/basemaps/mapbox-dark.png' },
    { name: 'Mapbox Light', url: `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/512/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, thumbnail: '/assets/images/basemaps/mapbox-light.png' },
    { name: 'Mapbox Satellite', url: `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, thumbnail: '/assets/images/basemaps/mapbox-satellite.png' },
    { name: 'Mapbox Street', url: `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, thumbnail: '/assets/images/basemaps/mapbox-streets.png' },
    { name: 'Mapbox Outdoor', url: `https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/512/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, thumbnail: '/assets/images/basemaps/mapbox-outdoor.png' },
    { name: 'Mapbox Galaxy', url: `https://api.mapbox.com/styles/v1/kamalh27/cl6d9l03u004o14paq58pbjmc/tiles/512/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`, thumbnail: '/assets/images/basemaps/mb-galaxy.png' },
    { name: 'Esri Street', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', thumbnail: '/assets/images/basemaps/esri-street.png' },
    { name: 'Esri Satellite', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', thumbnail: '/assets/images/basemaps/esri-satellite.png' },
    { name: 'Esri Terrain', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}', thumbnail: '/assets/images/basemaps/esri-terrain.png' },
    { name: 'Esri Gray', url: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', thumbnail: '/assets/images/basemaps/esri-gray.png' },
    { name: 'OpenTopoMap', url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', thumbnail: '/assets/images/basemaps/esri-topo.png' },
    { name: 'Carto Dark', url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', thumbnail: '/assets/images/basemaps/carto-dark.png' },
    { name: 'NASA GIBS', url: 'https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg', thumbnail: '/assets/images/basemaps/esri-satellite.png' },
];

const Basemaps = () => {
    const [, setBasemap] = useAtom(basemapAtom);
    const [selectedIndex, setSelectedIndex] = useAtom(activeBasemapAtom);

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        setBasemap(basemapData[index].url);
    };
  
    return (
      <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        <List component="nav" aria-label="Basemaps" style={{height: 'calc(100vh - 200px)'}} sx={{ overflow: 'auto' }}>
          {basemapData.map((basemap, index) => (
            <ListItemButton
              key={basemap.name}
              selected={selectedIndex === index}
              onClick={() => handleListItemClick(index)}
              sx={{ cursor:'pointer' }}
            >
              <ListItemAvatar>
                <Avatar>
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
  
export default Basemaps;