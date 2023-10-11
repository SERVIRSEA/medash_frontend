"use client"
import React from 'react';
import { useAtom } from 'jotai';
import { MapContainer, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MapviewerStyle.css'

import { Box } from '@mui/material';

import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Sidebar from '@/components/Sidebar'
import DashboardControl from '@/components/DashboardControl';

import { isLoadingAtom } from '@/state/atoms';

import LoadingIcon from '@/components/LoadingIcon';
import BasemapLayer from '@/components/layers/BasemapLayer';
import ProvinceLayer from '@/components/layers/ProvinceLayer';
import ProtectedAreaLayer from '@/components/layers/ProtectedAreaLayer';
import DistrictLayer from '@/components/layers/DistrictLayer';
import EVILayer from '@/components/layers/EVILayer';
import LandCoverLayer from '@/components/layers/LandCoverLayer';
import RiceLayer from '@/components/layers/RiceLayer';
import RubberLayer from '@/components/layers/RubberLayer';

export default function Mapviewer() {
    const [isLoading] = useAtom(isLoadingAtom);
    
    return (
        <div>
            <Header />
            <Navbar />
            <>
                <MapContainer center={[11.562108, 104.888535]} zoom={10} zoomControl={false} className="map-container"> 
                    <ZoomControl position="topright" />
                    <BasemapLayer />
                    <EVILayer />
                    <LandCoverLayer />
                    <RiceLayer />
                    <RubberLayer />
                    <ProvinceLayer />
                    <ProtectedAreaLayer />
                    <DistrictLayer />
                </MapContainer>
                <Sidebar />
                <Box sx={{zIndex: 1, width: '350px', marginLeft: '440px'}}>
                    <DashboardControl />
                </Box>
                {isLoading && <LoadingIcon />}
            </>
        </div>
    )
}