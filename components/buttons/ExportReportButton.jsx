import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation'; // Import from next/navigation
import CustomButton from '../common/CustomButton';
import { 
    baselineMinYearAtom,
    baselineMaxYearAtom,
    measureMinYearAtom,
    measureMaxYearAtom,
    areaTypeAtom,
    areaIdAtom,
    selectedYearAtom, 
    lcTypeAtom,
    selectedYearFireAtom
} from '@/state/atoms';
import { Modal, Box, CircularProgress, Typography } from '@mui/material';

// Base64 encoding function
const encodeBase64 = (data) => {
    const jsonString = JSON.stringify(data); // Convert to JSON string
    return btoa(jsonString); // Encode to base64
};

const ExportReportButton = () => {
    const [refLow] = useAtom(baselineMinYearAtom);
    const [refHigh] = useAtom(baselineMaxYearAtom);
    const [studyLow] = useAtom(measureMinYearAtom);
    const [studyHigh] = useAtom(measureMaxYearAtom);
    const [areaType] = useAtom(areaTypeAtom);
    const [areaId] = useAtom(areaIdAtom);
    const [selectedYear] = useAtom(selectedYearAtom);
    const [lcType] = useAtom(lcTypeAtom);
    const [fireMapYear] = useAtom(selectedYearFireAtom)
    const [modalOpen, setModalOpen] = useState(false); // Modal visibility state
    const [loading, setLoading] = useState(false); // Loading state
    const [responseMessage, setResponseMessage] = useState(''); // Success or error message

    const router = useRouter(); // Call useRouter from next/navigation
    const [isClient, setIsClient] = useState(false); // State to track if it's client-side rendering

    // Ensure the component is rendered on the client-side
    useEffect(() => {
        setIsClient(true); // This ensures that the component is rendered client-side
    }, []);

    // Prepare the parameters as an object
    const params = {
        'common': {
            'areaType': areaType,
            'areaId': areaId,
            'refLow': refLow,
            'refHigh': refHigh,
            'studyLow': studyLow,
            'studyHigh': studyHigh
        },
        'landcover': {
            'map': {
                'year': selectedYear,
                'type': lcType,
            },
            'chart': {
                'type': lcType
            }
        },
        'fire': {
            'map': {
                'year': fireMapYear
            }
        }
    };

    // Handle the export action
    const handleExportClick = async () => {
        if (!router) return; // Ensure router is available before proceeding
        
        setModalOpen(true); // Open the modal
        setLoading(true);   // Set loading state to true
        
        // Encode parameters to base64
        const encodedParams = encodeBase64(params);
        console.log('Encoded Params:', encodedParams);

        const exportUrl = `http://localhost:3001/generate-pdf?params=${encodedParams}`;

        try {
            // Sending GET request with encoded parameters
            const response = await fetch(exportUrl);
            const data = await response.json();
            // console.log(data);

            // Assuming the backend sends a message back (could be a success message or error)
            if (response.ok) {
                setResponseMessage('PDF generated successfully');
                // Redirect to the ReportPage with encoded params in the URL
                // router.push(data.pdfPage)
                window.open(data.pdfPage, '_blank');
                // router.push(`/report?params=${encodedParams}`); // Using router.push from next/navigation
            } else {
                setResponseMessage('Error generating PDF');
            }
        } catch (error) {
            setResponseMessage('Error connecting to the server');
            console.error('Error:', error);
        } finally {
            setLoading(false); // Hide loading icon when response is received
        }
    };

    // Only render the button if it's client-side rendering
    if (!isClient) return null; // Return null during SSR

    return (
        <div>
            <CustomButton
                size="small"
                color="#0a0a0a"
                hoverColor="#404040"
                sx={{ marginLeft: '5px' }}
                onClick={handleExportClick}
            >
                Export
            </CustomButton>

            {/* MUI Modal */}
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)} // Close the modal when clicking outside
                aria-labelledby="export-modal"
                aria-describedby="modal-to-show-loading-or-success-message"
            >
                <Box sx={modalStyles.modal}>
                    {loading ? (
                        <div style={modalStyles.loadingContainer}>
                            <CircularProgress color="primary" />
                            <Typography variant="h6" sx={{ marginTop: 2 }}>Generating PDF...</Typography>
                        </div>
                    ) : (
                        <div style={modalStyles.successMessageContainer}>
                            <Typography variant="h6">{responseMessage}</Typography>
                        </div>
                    )}
                </Box>
            </Modal>
        </div>
    );
};

// Simple styles for the modal (using MUI's `sx` prop for inline styling)
const modalStyles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        textAlign: 'center',
        maxWidth: '300px',
        width: '100%',
        boxShadow: 24,
    },
    loadingContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    successMessageContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

export default ExportReportButton;
