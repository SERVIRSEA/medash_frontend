import React from 'react';
import { useAtom } from 'jotai';
import CropTabs from '../tabs/CropTabs';
import { Box } from '@mui/material';

export default function CropMonitoringPanel(){
    return (
        <>
            <CropTabs />
        </>
    )
}