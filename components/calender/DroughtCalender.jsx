import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import CustomDatePicker from '../common/CustomDatePicker';
import { Fetcher } from '@/fetchers/Fetcher';
import LoadingCard from '../loaders/LoadingCard';
import { Box, Typography } from '@mui/material';
import { selectedDroughtIndexAtom } from '@/state/atoms';

const DroughtCalendar = () => {
    const [availableDatesByIndex, setAvailableDatesByIndex] = useState({});
    const [index] = useAtom(selectedDroughtIndexAtom); 
    const [loading, setLoading] = useState(true);
    
    const fetchDates = async (selectedIndex) => {
        try {
            const params = {
                'index': selectedIndex,
            };
            const action = 'get-drought-index-dates';
            const data = await Fetcher(action, params);
            setAvailableDatesByIndex(prevState => ({
                ...prevState,
                [selectedIndex]: data
            }));
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        } finally {
            setLoading(false); // Set loading to false after data is fetched
        }
    };

    useEffect(() => {
        setLoading(true); 
        if (!availableDatesByIndex[index]) {
            fetchDates(index);
        } else {
            setLoading(false); // Data is already available, no need to fetch again
        }
    }, [index, availableDatesByIndex]);

    // Render CustomDatePicker only when data is loaded
    return (
        <Box pl={1} pr={2}>
            <Typography variant="body2" sx={{fontSize: '12px'}} pl={1}>
                Select Date 
            </Typography>
            {loading ? (
                <LoadingCard />
            ) : (
                <CustomDatePicker availableDates={availableDatesByIndex[index] || []} />
            )}
        </Box>
    );
}

export default DroughtCalendar;
