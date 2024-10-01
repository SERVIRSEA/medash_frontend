import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Box } from "@mui/material";
import LayersIcon from '@mui/icons-material/Layers';
import HeaderWithClose from "../common/HeaderWithClose";
import AdminLayerList from './AdminLayerList';
import { layerPanelPopperAtom } from '@/state';

const AdminLayerToggle = () => {
    const [, setOpen] = useAtom(layerPanelPopperAtom);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <HeaderWithClose 
                title="Layer Panel" 
                onClose={handleClose}
                icon={<LayersIcon sx={{ color: '#fff' }}/>}
            />
            <Box>
                <AdminLayerList />
            </Box>
        </div>
    )
}
export default AdminLayerToggle;