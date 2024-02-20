import React from 'react';
import { useAtom } from 'jotai';
import { Box, Typography } from '@mui/material';
import {
    seasonalRainfallVisAtom,
    seasonalTempVisAtom
} from '@/state/atoms';

const styles = {
    precipitation: {
        title: 'Rainfall Anomaly (next 3 months)(mm)',
        palette: ['#88A541', '#F89F1D', '#B97A57', '#880015'],
        text: ['Normal', 'Watch', 'Warning', 'Alert'],
    },
    temperature: {
        title: 'Temperature Anomaly (next 3 months)(°C)',
        palette:['#880015', '#B97A57', '#F89F1D', '#FFFFFF'],
        text:['Extreme', 'Severe', 'Moderate', 'Normal']
    }
};

const SeasonalWeatherLegend = () => {
    const [isSeasonalRainfallVisible] = useAtom(seasonalRainfallVisAtom);
    const [isSeasonalTempVisible] = useAtom(seasonalTempVisAtom);

    const determineLegends = () => {
        const legends = [];

        if (isSeasonalRainfallVisible) {
            legends.push('precipitation');
        }
        if (isSeasonalTempVisible) {
            legends.push('temperature');
        }

        return legends;
    };

    const legends = determineLegends();

    return (
        <>
            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px' }} pt={2}>Legend</Typography>
            {legends.map((legendType, index) => {
                const { title, palette, text } = styles[legendType];

                const colorStops = palette.map((color, index) => `${color} ${(index * 100) / (palette.length - 1)}%`).join(', ');

                const gradientStyle = {
                    background: `linear-gradient(to right, ${colorStops})`,
                    width: '100%',
                    height: '20px',
                };

                return (
                    <Box key={index} pt={2} pl={1} pb={2} pr={2}>
                        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: '12px' }} pb={1}>{title}</Typography>
                        <div style={{ ...gradientStyle, height: '20px', width: '100%' }}></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            {text.map((label, i) => (
                                <Typography key={i} variant="body2" fontWeight="normal" sx={{ fontSize: '12px' }}>{label}</Typography>
                            ))}
                        </div>
                    </Box>
                );
            })}
        </>
    );
};

export default SeasonalWeatherLegend;