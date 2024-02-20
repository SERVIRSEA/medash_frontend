import React from 'react';
import { useAtom } from 'jotai';
import { Box, Typography } from '@mui/material';
import {
    pastRainfallVisAtom,
    pastTempVisAtom,
    forecastRainfallVisAtom,
    forecastTempVisAtom
} from '@/state/atoms';

const styles = {
    past_precipitation: {
        title: 'Accumulated Rainfall (past 7 days)(mm)',
        palette: ['#88A541', '#F89F1D', '#B97A57', '#880015'],
        text: ['Normal', 'Watch', 'Warning', 'Alert'],
    },
    past_temperature: {
        title: 'Average Temperature (past 7 days)(°C)',
        palette:['#880015', '#B97A57', '#F89F1D', '#FFFFFF'],
        text:['Extreme', 'Severe', 'Moderate', 'Normal']
    },
    forecast_precipitation: {
        title: 'Accumulated Rainfall (next 7 days)(mm)',
        palette: ['#1A9641','#58B453','#97D265','#C4E687','#F7FCDF','#FFEDAB','#FEC981','#F99E59','#E85B3A'],
        text: ['0', '10000'],
    },
    forecast_temperature: {
        title: 'Average Temperature (next 7 days)(°C)',
        palette: ['#E85B3A', '#F99E59', '#FEC981', '#FFEDAB', '#F7FCDF', '#C4E687', '#97D265', '#58B453', '#1A9641'],
        text: ['-10000', '10000'],
    }
};

const ShortTermWeatherLegend = () => {
    const [isPastRainfallVisible] = useAtom(pastRainfallVisAtom);
    const [isPastTempVisible] = useAtom(pastTempVisAtom);
    const [isForecastRainfallVisible] = useAtom(forecastRainfallVisAtom);
    const [isForecastTempVisible] = useAtom(forecastTempVisAtom);

    const determineLegends = () => {
        const legends = [];

        if (isPastRainfallVisible) {
            legends.push('past_precipitation');
        }
        if (isPastTempVisible) {
            legends.push('past_temperature');
        }
        if (isForecastRainfallVisible) {
            legends.push('forecast_precipitation');
        }
        if (isForecastTempVisible) {
            legends.push('forecast_temperature');
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

export default ShortTermWeatherLegend;