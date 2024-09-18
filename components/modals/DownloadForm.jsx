import React, { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { Close as CloseIcon } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Button, Modal, TextField, Box, Typography, IconButton, CircularProgress } from '@mui/material';
import { downloadEviMap } from '@/services/EviService';
import { landcoverService, eviService } from '@/services';
import { 
    nameAtom, 
    emailAtom, 
    institutionAtom, 
    jobTitleAtom, 
    purposeOfDownloadAtom, 
    isFormSubmittedAtom
} from '@/state/atoms';

const DownloadForm = ({ isOpen, onClose, downloadParams }) => {
    const [name, setName] = useAtom(nameAtom);
    const [email, setEmail] = useAtom(emailAtom);
    const [institution, setInstitution] = useAtom(institutionAtom);
    const [jobTitle, setJobTitle] = useAtom(jobTitleAtom);
    const [purposeOfDownload, setPurposeOfDownload] = useAtom(purposeOfDownloadAtom);
    const [isFormSubmitted, setIsFormSubmitted] = useAtom(isFormSubmittedAtom);
    const [downloadURL, setDownloadURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [metaData, setMetaData] = useState(null);

    const metaDataURL = '/metadata_landcover.csv';
    const isFormFilled = name && email && institution && jobTitle && purposeOfDownload;

    useEffect(() => {
        if (downloadParams && downloadParams.dataset === 'landcover'){
            setMetaData(true);
        } else {
            setMetaData(false);
        }
    }, [downloadParams]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'name':
                setName(value);
                break;
            case 'email':
                setEmail(value);
                break;
            case 'institution':
                setInstitution(value);
                break;
            case 'jobTitle':
                setJobTitle(value);
                break;
            case 'purposeOfDownload':
                setPurposeOfDownload(value);
                break;
            default:
                break;
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setIsFormSubmitted(true);
        setError('');
        try {
            const formSubmissionData = {
                name,
                email,
                institution,
                job_title: jobTitle,
                purpose_of_download: purposeOfDownload,
                ...downloadParams
            };

            let response;
            switch (formSubmissionData.dataset) {
                case 'landcover':
                    response = await landcoverService.downloadMap(formSubmissionData);
                    break;
                case 'evi':
                    response = await eviService.downloadMap(formSubmissionData);
                    break;
                default:
                    throw new Error('Unsupported dataset');
            }

            if (response.success === true && response.data) {
                setDownloadURL(response.data);
            } else {
                setError(response.error || 'Failed to get download link');
            }
        } catch (error) {
            setError('Your selected area is too large to download. Please choose a specific province, district, or protected area, or draw a smaller area on the map. Once you have updated the map accordingly, click the download icon again to initiate the download process. Otherwise, contact the support team.');
            console.error('Error submitting form:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', width: 450 }}>
                {isFormFilled && isFormSubmitted ? (
                    <Box>
                        <Typography variant="body1" component="body1">
                            Download the dataset -
                        </Typography>
                        <Box style={{ textAlign: 'center' }} p={4}>
                            {isLoading ? (
                                <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                    <CircularProgress />
                                    <Typography variant="body2" component="p" style={{ marginTop: '10px' }}>
                                        Data processing, please wait...
                                    </Typography>
                                </Box>
                            ) : downloadURL ? (
                                <>
                                    <Button 
                                        href={downloadURL} 
                                        variant="outlined" 
                                        color="primary" 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        endIcon={<OpenInNewIcon />}
                                        style={{ marginTop: '10px' }} 
                                        onClick={() => setDownloadURL('')}
                                    >
                                        Download Link
                                    </Button>
        
                                    {metaData && (
                                        <Button 
                                            href={metaDataURL} 
                                            variant="outlined" 
                                            color="secondary" 
                                            download
                                            startIcon={<DownloadIcon />}
                                            style={{ marginTop: '10px', marginLeft: '10px' }}
                                        >
                                            Download Metadata
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <Button onClick={handleFormSubmit} variant="outlined" color="primary" style={{ marginTop: '10px' }}>
                                    Get Download Link
                                </Button>
                            )}
                            {error && (
                                <Typography variant="body2" color="error" style={{ marginTop: '10px' }}>
                                    {error}
                                </Typography>
                            )}
                            <IconButton onClick={() => { setDownloadURL(''); onClose(); }} style={{ position: 'absolute', top: '5px', right: '5px' }}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <Box mb={2}>
                            <h4>Download Request Form</h4>
                            <TextField
                                label="Name"
                                name="name"
                                value={name}
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
                                value={email}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Institution"
                                name="institution"
                                value={institution}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Job Title"
                                name="jobTitle"
                                value={jobTitle}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Box>
                        <Box mb={2}>
                            <TextField
                                label="Purpose of Download"
                                name="purposeOfDownload"
                                value={purposeOfDownload}
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
                )}
            </div>
        </Modal>
    );
};

export default DownloadForm;