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
import { guidingModalAtom, activeMenuAtom, activeTabAtom } from '@/state/atoms';
import CustomAlert from '@/components/CustomAlert';
import MapLegend from '@/components/MapLegend';

const DynamicMapView = dynamic(() => import('./MapView'), {
    loading: () => <LoadingIcon />,
    ssr: false
});

export default function Mapviewer() {
    const [activeMenu] = useAtom(activeMenuAtom);
    const [isLoading] = useAtom(isLoadingAtom);
    const [isGuidingPanelOpen, setIsGuidingPanelOpen] = useAtom(guidingModalAtom);
    const [isCollapse] = useAtom(activeTabAtom);

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
                <Box 
                    sx={{
                        zIndex: 1, 
                        width: '265px', 
                        // marginLeft: '390px', 
                        marginLeft: `${isCollapse === 'block' ? '440px' : '90px'}`,
                        display: activeMenu === 5 ? 'none' : 'block'
                    }}
                >
                    <DashboardControl />
                </Box>
                {/* <Box sx={{position: 'fixed', zIndex: 999, width: '350px', marginLeft: '440px', display: activeMenu === 7 ? 'none' : 'block' }}>
                    <DashboardControl />
                </Box> */}
                {isLoading && <LoadingIcon />}
            </>
            <MapLegend />
            <CustomAlert />
        </div>
    )
}