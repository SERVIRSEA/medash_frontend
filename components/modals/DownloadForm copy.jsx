import React, { useState, useEffect } from 'react';
import { Close as CloseIcon } from '@mui/icons-material';
import { Button, Modal, TextField, Box, Typography, IconButton } from '@mui/material';
import { postFetcher } from '@/fetchers/Fetcher';

const DownloadForm = ({ isOpen, onClose, downloadAction, downloadParams, dataset }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        institution: '',
        jobTitle: '',
        dataset: '',
        purposeOfDownload: '',
    });

    const [downloadURL, setDownloadURL] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    

    useEffect(() => {
        if (dataset == 'Landcover'){
            setMetaData(True);
        } else {
            setMetaData(false);
        }
        setIsSubmitted(false); // Reset form submission status when the modal is opened again
    }, [isOpen], dataset);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formSubmissionData = { ...formData, dataset, year: downloadParams.year };
            const action = 'post-download-form-data'; 
            const response = await postFetcher(action, formSubmissionData);
            
            if (response.success === 'success' && response.downloadURL) {
                setDownloadURL(response.downloadURL);
                setIsSubmitted(true);
            } else {
                console.error('Failed to submit form or no download URL returned');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };    

    const handleGetDownloadLink = async () => {
        try {
            const formSubmissionData = { ...formData, dataset, year: downloadParams.year };
            const action = 'post-download-form-data'; 
            const response = await postFetcher(action, formSubmissionData);

            if (response.success === 'success' && response.downloadURL) {
                setDownloadURL(response.downloadURL);
            } else {
                console.error('Failed to submit form or no download URL returned');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', width: 450 }}>
                {!isSubmitted ? (
                    <form onSubmit={handleSubmit}>
                        <Box mb={2}>
                            <h4>Download Request Form</h4>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Institution"
                                name="institution"
                                value={formData.institution}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Job Title"
                                name="jobTitle"
                                value={formData.jobTitle}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Purpose of Download"
                                name="purposeOfDownload"
                                value={formData.purposeOfDownload}
                                onChange={handleChange}
                                multiline
                                rows={4}
                                fullWidth
                                required
                            />
                        </Box>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </form>
                ) : (
                    <Box>
                        <Typography variant="body1" component="body1">
                            Download the dataset -
                        </Typography>
                        <Box style={{ textAlign: 'center' }} p={4}>
                            {downloadURL ? (
                                <Button href={downloadURL} variant="outlined" color="primary" target="_blank" rel="noopener noreferrer" style={{ marginTop: '10px' }} onClick={() => setDownloadURL('')}>
                                    Download Link
                                </Button>
                            ) : (
                                <Button onClick={handleGetDownloadLink} variant="outlined" color="primary" style={{ marginTop: '10px' }}>
                                    Get Download Link
                                </Button>
                            )}
                            <IconButton onClick={onClose} style={{ position: 'absolute', top: '5px', right: '5px' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </div>
        </Modal>
    );
};

export default DownloadForm;
