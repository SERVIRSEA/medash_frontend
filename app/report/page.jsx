"use client"
import React, { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation'; // Use Next.js navigation hooks
import { Box, Typography } from '@mui/material';
import Report from '@/components/report/Report';

// Function to decode Base64 to JSON
const decodeBase64 = (encodedData) => {
    try {
        const jsonString = atob(encodedData); // Decode from base64
        return JSON.parse(jsonString); // Parse as JSON
    } catch (error) {
        throw new Error('Invalid base64 data');
    }
};

const ReportPage = () => {
    const pathname = usePathname(); // Access the current pathname
    const searchParams = useSearchParams(); // Access the query params
    const [decodedParams, setDecodedParams] = useState(null); // State to store decoded params
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state for decoding issues

    useEffect(() => {
        const encodedParams = searchParams.get('params'); // Get 'params' query parameter from the URL

        if (encodedParams) {
            try {
                const decodedData = decodeBase64(encodedParams); // Decode the Base64 string
                setDecodedParams(decodedData); // Store decoded data in state
            } catch (error) {
                setError('Error decoding parameters.');
                console.error('Error decoding the parameters:', error);
                setDecodedParams(null); // Reset decoded params on error
            }
        } else {
            setError('No parameters found in the URL.');
            setDecodedParams(null);
        }
        setLoading(false);
    }, [searchParams]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return <Report decodedParams={decodedParams} />;
};

export default ReportPage;