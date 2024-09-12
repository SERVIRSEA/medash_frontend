import React, { useState, useCallback } from 'react';
import * as toGeoJSON from '@mapbox/togeojson';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

export default function UploadDialog({ open, onClose, onUpload }) {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(''); // State to handle error message
    const [fileName, setFileName] = useState(''); // State to handle the file name display

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && !['application/vnd.google-earth.kml+xml', 'application/geo+json'].includes(selectedFile.type)) {
            setError('Invalid file type. Please select a .geojson or .kml file.');
            setFile(null);
            setFileName(''); // Clear file name on error
        } else {
            setError('');
            setFile(selectedFile);
            setFileName(selectedFile.name); // Set file name when valid file is selected
        }
    };

    const handleUpload = useCallback(() => {
        if (file) {
                setFile(null); // Clear the file input after upload
        setFileName(''); // Clear the file name after upload
        setError('');  // Reset error after a successful upload
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;

            if (file.name.endsWith('.geojson')) {
                try {
                    const geojsonData = JSON.parse(content);
                    onUpload(geojsonData);
                } catch (error) {
                    setError('Invalid GeoJSON file.');
                }
            } else if (file.name.endsWith('.kml')) {
                try {
                    const kml = new DOMParser().parseFromString(content, 'text/xml');
                    const geojsonData = toGeoJSON.kml(kml); // Convert KML to GeoJSON
                    onUpload(geojsonData);
                } catch (error) {
                    setError('Invalid KML file.');
                }
            }
        };

        reader.readAsText(file); // Read the file content as text
        }

        onClose();
    }, [file, onUpload, onClose]);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Upload Polygon</DialogTitle>
            <DialogContent>
                <TextField
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={fileName} // Display the file name in the input
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <CloudUpload />
                        </InputAdornment>
                        ),
                        endAdornment: (
                        <InputAdornment position="end">
                            <input
                            accept=".geojson,.kml,.json,.zip"
                            style={{ display: 'none' }}
                            id="upload-file"
                            type="file"
                            onChange={handleFileChange}
                            />
                            <label htmlFor="upload-file">
                            <Button 
                                component="span" 
                                variant="contained" 
                                color="primary"
                                size='small'
                                sx={{ 
                                textTransform: 'none',
                                backgroundColor: '#2563eb',
                                '&:hover': {
                                    backgroundColor: '#1e40af',
                                    color: '#fff',
                                    borderColor: '#1e40af',
                                },
                                }}
                            >
                                Browse
                            </Button>
                            </label>
                        </InputAdornment>
                        )
                    }}
                    helperText={error ? error : "Select a GIS file (e.g., GeoJSON, KML, etc.)"}
                    placeholder="No file chosen"
                    error={Boolean(error)} // Highlight input field in red if there is an error
                />
            </DialogContent>
            <DialogActions sx={{ mb: 2, mr: 2 }}>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    size='small'
                    sx={{
                        textTransform: 'none',
                        borderColor: '#ff5722',
                        color: '#ff5722',
                        '&:hover': {
                        backgroundColor: '#ff5722',
                        color: '#fff',
                        borderColor: '#ff5722',
                        },
                    }}
                >
                    Close
                </Button>
                <Button 
                    variant="outlined"
                    onClick={handleUpload} 
                    size='small'
                    disabled={!file || Boolean(error)} // Disable upload if no valid file or error
                    sx={{
                        textTransform: 'none',
                        borderColor: '#2563eb',
                        '&:hover': {
                            backgroundColor: '#2563eb',
                            borderColor: '#2563eb',
                            color: '#fff',
                        },
                    }}
                >
                    Upload
                </Button>
            </DialogActions>
        </Dialog>
    );
}
