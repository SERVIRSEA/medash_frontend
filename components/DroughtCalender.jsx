import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import CustomDatePicker from './CustomDatePicker';
import { Fetcher } from '@/fetchers/Fetcher';
import LoadingCard from './LoadingCard';
import { Box, Typography } from '@mui/material';
import { selectedDroughtIndexAtom } from '@/state/atoms';

const DroughtCalendar = () => {
    const [availableDates, setAvailableDates] = useState([]);
    const [index, setIndex] = useAtom(selectedDroughtIndexAtom); 
    const [loading, setLoading] = useState(true);
    
    const fetchDates = async (selectedIndex) => {
        try {
            const params = {
                'index': selectedIndex,
            };
            const key = JSON.stringify(params);
            const action = 'get-drought-index-dates';
            const data = await Fetcher(action, params);
            setAvailableDates(data);
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    useEffect(() => {
        setLoading(true); 
        fetchDates(index);
    }, [index]);

    // Render CustomDatePicker only when data is loaded
    return (
        <Box pl={2} pr={2}>
            <Typography variant="body2" pl={1}>
                Select Date 
            </Typography>
            {loading ? (
                <LoadingCard />
            ) : (
                <CustomDatePicker availableDates={availableDates} />
            )}
        </Box>
    );
}

export default DroughtCalendar;
