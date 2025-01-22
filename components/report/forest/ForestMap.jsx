"use client"
import React, { useEffect, useState } from 'react';
import { landcoverService } from '@/services';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../MapComponent'), {
    ssr: false 
});

const ForestMap = () => {
    return (
        <div>
        <MapComponent />
        </div>
    )
}

export default ForestMap;
