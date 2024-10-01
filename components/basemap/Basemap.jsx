import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Box } from "@mui/material";
import PublicIcon from "@mui/icons-material/Public";
import HeaderWithClose from "../common/HeaderWithClose";
import BasemapList from "./BasemapList";
import { basemapPopperAtom } from '@/state';

const Basemap = () => {
    const [, setOpen] = useAtom(basemapPopperAtom);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <HeaderWithClose 
                title="Basemap" 
                onClose={handleClose}
                icon={<PublicIcon sx={{ color: '#fff' }}/>}
            />
            <Box>
                <BasemapList />
            </Box>
        </div>
    )
}
export default Basemap;