"use client"
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Box } from '@mui/material';
import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Sidebar from '@/components/Sidebar'
import DashboardControl from '@/components/DashboardControl';
import { isLoadingAtom } from '@/state/atoms';
import LoadingIcon from '@/components/LoadingIcon';
import dynamic from 'next/dynamic';
import GuidingPanel from '@/components/GuidingPanel';
import { guidingModalAtom } from '@/state/atoms';

const DynamicMapView = dynamic(() => import('./MapView'), {
    loading: () => <LoadingIcon />,
    ssr: false
});

export default function Mapviewer() {
    const [isLoading] = useAtom(isLoadingAtom);
    const [isGuidingPanelOpen, setIsGuidingPanelOpen] = useAtom(guidingModalAtom);
    
    const handleCloseGuidingPanel = () => {
        setIsGuidingPanelOpen(false);
    };
    return (
        <div>
            <Header />
            <Navbar />
            <GuidingPanel isOpen={isGuidingPanelOpen} onClose={handleCloseGuidingPanel} />
            <>
                <div id="map">
                    <DynamicMapView />
                </div>
                <Sidebar />
                <Box sx={{zIndex: 1, width: '350px', marginLeft: '440px'}}>
                    <DashboardControl />
                </Box>
                {isLoading && <LoadingIcon />}
            </>
        </div>
    )
}