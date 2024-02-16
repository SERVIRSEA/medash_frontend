import React from 'react';
import { useAtom } from 'jotai';
import { Box, Typography } from '@mui/material';
import { selectedDroughtIndexAtom } from '@/state/atoms';

const indexStyles = {
    cdi: {
        palette: ['#88A541', '#F89F1D', '#B97A57', '#880015'],
        text: ['Normal', 'Watch', 'Warning', 'Alert'],
    },
    spi3: {
        palette:['#880015', '#B97A57', '#F89F1D', '#FFFFFF'],
        text:['Extreme', 'Severe', 'Moderate', 'Normal']
    },
    vhi: {
        palette: ['#1A9641','#58B453','#97D265','#C4E687','#F7FCDF','#FFEDAB','#FEC981','#F99E59','#E85B3A'],
        text: ['0', '10000'],
    },
    ndvi: {
        palette: ['#E85B3A', '#F99E59', '#FEC981', '#FFEDAB', '#F7FCDF', '#C4E687', '#97D265', '#58B453', '#1A9641'],
        text: ['-10000', '10000'],
    },
    cwsi: {
        palette: ['#1A9641','#58B453','#97D265','#C4E687','#F7FCDF','#FFEDAB','#FEC981','#F99E59','#E85B3A'],
        text: ['0', '1'],
    },
    soil_moist: {
        palette: ['#880015', '#B97A57', '#F89F1D', '#FFFFFF'],
        text: ['Extreme', 'Severe', 'Moderate', 'Normal'],
    },
    surf_temp: {
        palette: ['#0370AF', '#348DBF', '#75B4D4', '#A5CEE2', '#CDE2EC', '#F6F6F6', '#F4D5C7', '#F4B599', '#EB846E', '#DA4247', '#CA0020'],
        text: ['10', '13', '16', '19', '22', '25', '28', '31', '34', '36'],
    },
    rainfall: {
        palette: ['#FFFFFF', '#E5B42C', '#E3B022', '#F2B464', '#F2B464', '#F3E976', '#91CE7E', '#89CE74', '#43BE87', '#34B485', '#30B282', '#069B42', '#069B42'],
        text: ['1', '2', '3', '4', '5', '10', '20', '30', '40', '50', '60', '70', '100'],
    },
    rel_humid: {
        palette: ['#7C3595', '#9B65AE', '#BA98C9', '#D4C1DD', '#ECE5EF', '#E5F1E4', '#C1E5BD', '#95D295', '#4AAD66', '#008837'],
        text: ['<10', '20', '30', '40', '50', '60', '70', '80', '90', '>90'],
    },
};

const DroughtLegend = () => {
    const [index] = useAtom(selectedDroughtIndexAtom);
    const { palette, text } = indexStyles[index] || { palette: [], text: [] };

    const colorStops = palette.map((color, index) => `${color} ${(index * 100) / (palette.length - 1)}%`).join(', ');

    const gradientStyle = {
        background: `linear-gradient(to right, ${colorStops})`,
        width: '100%',
        height: '20px',
    };

    return (
        <Box pt={2} pl={1} pb={2} pr={2}>
            <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '12px' }} pb={1}>{index.toUpperCase()} Legend </Typography>
            <div style={{ ...gradientStyle, height: '20px', width: '100%' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {text.map((label, i) => (
                    <Typography key={i} variant="body2" fontWeight="normal" sx={{ fontSize: '12px' }}>{label}</Typography>
                ))}
            </div>
        </Box>
    );
};

export default DroughtLegend;