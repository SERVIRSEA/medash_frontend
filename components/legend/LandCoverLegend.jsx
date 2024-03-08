import React from 'react'
import { Box, Typography } from '@mui/material'
import ColorLegend from './ColorLegend';

// const classNames = ['evergreen', 'semi-evergreen', 'deciduous', 'mangrove', 'flooded forest', 'rubber', 'other plantations', 'rice', 'cropland', 'surface water', 'grassland', 'woodshrub', 'built-up area', 'village', 'other'];
// const palette = ['267300', '38A800', '70A800', '00A884', 'B4D79E', 'AAFF00', 'F5F57A', 'FFFFBE', 'FFD37F', '004DA8', 'D7C29E', '89CD66', 'E600A9', 'A900E6', '6f6f6f'];
const classNames = ['built-up area', 'mangrove', 'otherPlantation', 'water', 'shrub', 'rice', 'cropland', 'grass', 'evergreen', 'deciduous', 'wetland', 'rubber', 'floodedForest', 'semi-evergreen', 'village', 'others']
const palette = ['E600A9', 'FFFF00', 'c49963', '004DA8', '89CD66', 'fefdbd', 'FFD37F', 'D7C29E', '267300', '71a405', '86d8dc', 'AAFF00', 'b3d59f', '38A800', 'A900E6', 'f0f8ff']

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const LandCoverLegend = () => {
    const midIndex = Math.ceil(classNames.length / 2);

    const leftColumn = classNames.slice(0, midIndex).map((className, index) => (
        <ColorLegend key={className} color={`#${palette[index]}`} text={capitalizeFirstLetter(className)} />
    ));

    const rightColumn = classNames.slice(midIndex).map((className, index) => (
        <ColorLegend key={className} color={`#${palette[midIndex + index]}`} text={capitalizeFirstLetter(className)} />
    ));

    return (
        <Box pt={2} pl={2} pb={4}>
            <Typography variant="body2" sx={{ fontSize: '12px', fontWeight: 'bold' }}>Land Cover Map Legend</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}>
                    {leftColumn}
                </div>
                <div style={{ flex: 1 }}>
                    {rightColumn}
                </div>
            </Box>
        </Box>
    );
};

export default LandCoverLegend;