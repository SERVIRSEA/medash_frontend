import React from 'react';
import { atom, useAtom } from 'jotai';
import Image from 'next/image';
import { Box } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListItemAvatar, Avatar, Typography} from '@mui/material';

import OSMImage from '../public/assets/images/basemaps/osm.png';
import MapboxDarkImage from '../public/assets/images/basemaps/mapbox-dark.png';
import MapboxLightImage from '../public/assets/images/basemaps/mapbox-light.png';
import MapboxStreetsImage from '../public/assets/images/basemaps/mapbox-streets.png';
import MapboxSatelliteImage from '../public/assets/images/basemaps/mapbox-satellite.png';
import MapboxOutdoorImage from '../public/assets/images/basemaps/mapbox-outdoor.png';
import MapboxGalaxyImage from '../public/assets/images/basemaps/mb-galaxy.png';
import EsriStreetImage from '../public/assets/images/basemaps/esri-street.png';
import EsriSatelliteImage from '../public/assets/images/basemaps/esri-satellite.png';
import EsriGrayImage from '../public/assets/images/basemaps/esri-gray.png';
import EsriTerrainImage from '../public/assets/images/basemaps/esri-terrain.png';
import OpenTopoImage from '../public/assets/images/basemaps/esri-topo.png';
import CartoDarkImage from '../public/assets/images/basemaps/carto-dark.png';
import NasaGibsImage from '../public/assets/images/basemaps/esri-satellite.png';

import { basemapAtom } from '@/state/atoms';

const activeBasemapAtom = atom(4);

const Basemaps = () => {
    const [, setBasemap] = useAtom(basemapAtom);
    const [selectedIndex, setSelectedIndex] = useAtom(activeBasemapAtom);
  
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);

        const osm = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
        const mapboxDark = 'https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtYWxoMjciLCJhIjoiY2t3b2Roc2M3MDF2bDJ2cDY0ZmppdXl0MCJ9.Gn5rUJgaap_KDcnhyROMzQ';
        const mapboxLight = 'https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtYWxoMjciLCJhIjoiY2t3b2Roc2M3MDF2bDJ2cDY0ZmppdXl0MCJ9.Gn5rUJgaap_KDcnhyROMzQ';
        const mapboxSatellite = 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtYWxoMjciLCJhIjoiY2t3b2Roc2M3MDF2bDJ2cDY0ZmppdXl0MCJ9.Gn5rUJgaap_KDcnhyROMzQ';
        const mapboxStreet = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtYWxoMjciLCJhIjoiY2t3b2Roc2M3MDF2bDJ2cDY0ZmppdXl0MCJ9.Gn5rUJgaap_KDcnhyROMzQ';
        const mapboxOutdoor = 'https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtYWxoMjciLCJhIjoiY2t3b2Roc2M3MDF2bDJ2cDY0ZmppdXl0MCJ9.Gn5rUJgaap_KDcnhyROMzQ';
        const mapboxGalaxy = 'https://api.mapbox.com/styles/v1/kamalh27/cl6d9l03u004o14paq58pbjmc/tiles/512/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia2FtYWxoMjciLCJhIjoiY2t3b2Roc2M3MDF2bDJ2cDY0ZmppdXl0MCJ9.Gn5rUJgaap_KDcnhyROMzQ';
        const esriStreet = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}';
        const esriSatellite = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
        const esriTerrain = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}';
        const esriGray = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}';
        const openTopo = 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
        const cartoDark = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
        const nasaGIBS = 'https://gibs-{s}.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default//EPSG3857_500m/{z}/{y}/{x}.jpeg';
  
        if(index==0){   
            setBasemap(osm);
        } else if (index==1){
            setBasemap(mapboxDark);
        }
        else if (index==2){
            setBasemap(mapboxLight);
        }
        else if (index==3){
            setBasemap(mapboxSatellite);
        }
        else if (index==4){
            setBasemap(mapboxStreet);
        }
        else if (index==5){
            setBasemap(mapboxOutdoor);
        }
        else if (index==6){
            setBasemap(mapboxGalaxy);
        }
        else if (index==7){
            setBasemap(esriStreet);
        }
        else if (index==8){
            setBasemap(esriSatellite);
        }
        else if (index==9){
            setBasemap(esriTerrain);
        }
        else if (index==10){
            setBasemap(esriGray);
        }
        else if (index==11){
            setBasemap(openTopo);
        }
        else if (index==12){
            setBasemap(cartoDark);
        }
        else if (index==13){
            setBasemap(nasaGIBS);
        } else {
            setBasemap(osm);
        }
    };

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <Typography variant="body1">
                Basemaps
            </Typography>
            <List component="nav" aria-label="Basemaps" style={{height: 'calc(100vh - 200px)'}} sx={{ overflow: 'auto' }}>
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event) => handleListItemClick(event, 0)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={OSMImage} alt={"OSM"}></Image>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Open Street Map (OSM)"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                    sx={{ cursor:'pointer' }}
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={MapboxDarkImage} alt={"Mapbox Dark"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Mapbox Dark"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={MapboxLightImage} alt={"Mapbox Light"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Mapbox Light"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={MapboxSatelliteImage} alt={"Mapbox Satellite"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Mapbox Satellite"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={MapboxStreetsImage} alt={"Mapbox Streets"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Mapbox Streets"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 5}
                    onClick={(event) => handleListItemClick(event, 5)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar src={MapboxOutdoorImage} alt={"Mapbox Outdoor"} />
                    </ListItemAvatar>
                    <ListItemText primary={"Mapbox Outdoor"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 6}
                    onClick={(event) => handleListItemClick(event, 6)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={MapboxGalaxyImage} alt={"Mapbox Galaxy"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Mapbox Galaxy"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 7}
                    onClick={(event) => handleListItemClick(event, 7)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={EsriStreetImage} alt={"Esri Street"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Esri Street"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 8}
                    onClick={(event) => handleListItemClick(event, 8)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar src={EsriSatelliteImage} alt={"Esri Satellite"} />
                    </ListItemAvatar>
                    <ListItemText primary={"Esri Satellite"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 9}
                    onClick={(event) => handleListItemClick(event, 9)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Avatar src={EsriTerrainImage} alt={"Esri Terrain"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Esri Terrain"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 10}
                    onClick={(event) => handleListItemClick(event, 10)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={EsriGrayImage} alt={"Esri Gray"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Esri Gray"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 11}
                    onClick={(event) => handleListItemClick(event, 11)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={OpenTopoImage} alt={"Open TOPO"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Open TOPO"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 12}
                    onClick={(event) => handleListItemClick(event, 12)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={CartoDarkImage} alt={"Carto Dark"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"Carto Dark"} />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 13}
                    onClick={(event) => handleListItemClick(event, 13)}
                    sx={{ cursor:'pointer' }} 
                >
                    <ListItemAvatar>
                        <Avatar>
                            <Image src={NasaGibsImage} alt={"NASA GIBS Satellite"} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={"NASA GIBS Satellite"} />
                </ListItemButton>
            </List>
        </Box>
    );
  };
  
  export default Basemaps;