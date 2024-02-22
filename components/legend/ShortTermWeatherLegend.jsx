import React from 'react';
import { useAtom } from 'jotai';
import { Box, Typography } from '@mui/material';
import {
    pastRainfallVisAtom,
    pastTempVisAtom,
    forecastRainfallVisAtom,
    forecastTempVisAtom,
    weatherDataStoreAtom,
    areaTypeAtom,
    areaIdAtom,
} from '@/state/atoms';

const precipitationColors = ["#8c510a","#bf812d","#dfc27d","#f6e8c3","#c7eae5","#80cdc1","#35978f","#01665e","#003c30","#011f4b","#08306b"];
const temperatureColors = ["#2b83ba","#5ea7b1","#91cba8","#bce4a9","#ddf1b4","#ffffbf","#fedf99","#fdbe74","#f59053","#e65538","#d7191c"];

const styles = {
    past_precipitation: {
        title: 'Accumulated Rainfall (past 7 days)(mm)',
        palette: precipitationColors,
    },
    past_temperature: {
        title: 'Average Temperature (past 7 days)(°C)',
        palette: temperatureColors,
    },
    forecast_precipitation: {
        title: 'Accumulated Rainfall (next 7 days)(mm)',
        palette: precipitationColors,
    },
    forecast_temperature: {
        title: 'Average Temperature (next 7 days)(°C)',
        palette: temperatureColors,
    }
};

function distributeIntoClasses(min, max, numClasses) {
    const avg = (min + max) / 2;
    const quarter1 = (min + avg) / 2;
    const quarter3 = (max + avg) / 2;
    return [min, quarter1, avg, quarter3, max];
}

const ShortTermWeatherLegend = () => {
    const [isPastRainfallVisible] = useAtom(pastRainfallVisAtom);
    const [isPastTempVisible] = useAtom(pastTempVisAtom);
    const [isForecastRainfallVisible] = useAtom(forecastRainfallVisAtom);
    const [isForecastTempVisible] = useAtom(forecastTempVisAtom);
    const [weatherDataStore] = useAtom(weatherDataStoreAtom);
    const [areaType] = useAtom(areaTypeAtom);
    const [areaId] = useAtom(areaIdAtom);

    const determineLegends = () => {
        const legends = [];

        if (isPastRainfallVisible && weatherDataStore) {
            const params = {
                'area_type': areaType,
                'area_id': areaId,
                'weather_param': 'precipitation',
                'weather_type': 'past',
            };
            const key = JSON.stringify(params);
            const data = weatherDataStore[key];

            if (data) {
                const min = data.min;
                const max = data.max;
                const { title, palette } = styles.past_precipitation;
                const text = distributeIntoClasses(min, max, 11).map(value => value.toFixed(1));
                legends.push({ title, palette, text });
            }
        }

        if (isPastTempVisible && weatherDataStore) {
            const params = {
                'area_type': areaType,
                'area_id': areaId,
                'weather_param': 'temperature',
                'weather_type': 'past',
            };
            const key = JSON.stringify(params);
            const data = weatherDataStore[key];

            if (data) {
                const min = data.min;
                const max = data.max;
                const { title, palette } = styles.past_temperature;
                const text = distributeIntoClasses(min, max, 11).map(value => value.toFixed(1));
                legends.push({ title, palette, text });
            }
        }

        if (isForecastRainfallVisible && weatherDataStore) {
            const params = {
                'area_type': areaType,
                'area_id': areaId,
                'weather_param': 'precipitation',
                'weather_type': 'forecast',
            };
            const key = JSON.stringify(params);
            const data = weatherDataStore[key];

            if (data) {
                const min = data.min;
                const max = data.max;
                const { title, palette } = styles.forecast_precipitation;
                const text = distributeIntoClasses(min, max, 11).map(value => value.toFixed(1));
                legends.push({ title, palette, text });
            }
        }

        if (isForecastTempVisible && weatherDataStore) {
            const params = {
                'area_type': areaType,
                'area_id': areaId,
                'weather_param': 'temperature',
                'weather_type': 'forecast',
            };
            const key = JSON.stringify(params);
            const data = weatherDataStore[key];

            if (data) {
                const min = data.min;
                const max = data.max;
                const { title, palette } = styles.forecast_temperature;
                const text = distributeIntoClasses(min, max, 11).map(value => value.toFixed(1));
                legends.push({ title, palette, text });
            }
        }

        return legends;
    };

    const legends = determineLegends();

    return (
        <>
            <Typography variant="body1" fontWeight="bold" sx={{ fontSize: '14px' }} pt={2}>Legend</Typography>
            {legends.map((legend, index) => {
                const { title, palette, text } = legend;

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
