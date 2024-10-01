import React from 'react';
import { Box } from '@mui/material';
import CustomButton from '../common/CustomButton';

const FormActions = ({ handleClose, handleSubmit }) => {
    return (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'start' }}>
            <CustomButton 
                onClick={handleClose}
                color="#ff5722" 
                variant="outlined"
                hoverColor="#ff5722"
                textColor="#ff5722" 
                hoverTextColor="#fff"
                sx={{ marginRight: 2 }}
            >
                Close
            </CustomButton>

            <CustomButton
                onClick={handleSubmit}
                variant="contained"
                color="#2563eb"  
                hoverColor="#1e3a8a"
                textColor="#fff" 
                hoverTextColor="#fff" 
            >
                Submit Feedback
            </CustomButton>
        </Box>
    );
};

export default FormActions;