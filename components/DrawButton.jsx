// DrawButton.js
import React, { useState } from 'react';
import { Button, Modal, Box, Typography, Grid, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HexagonIcon from '@mui/icons-material/Hexagon';
import SquareIcon from '@mui/icons-material/Square';
import CircleIcon from '@mui/icons-material/Circle';

export default function DrawButton({ setDrawMode }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleDrawMode = (mode) => {
        setDrawMode(mode);
        handleClose();
    };

    return (
        <>
            <Button
                onClick={handleOpen}
                variant="contained"
                color="primary"
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 400,
                    zIndex: 1000,
                }}
            >
                Draw
            </Button>
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    width: 300,
                    margin: 'auto',
                    padding: 2,
                    marginTop: '10%',
                    backgroundColor: 'white',
                    borderRadius: 1,
                    position: 'relative',
                }}>
                    <IconButton
                        onClick={handleClose}
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" align="center">Select Draw Type</Typography>
                    <Grid container spacing={2} justifyContent="center" style={{ marginTop: 20 }}>
                        <Grid item xs={4} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleDrawMode('polygon')}>
                            <HexagonIcon style={{ fontSize: 40 }} />
                            <Typography variant="caption">Polygon</Typography>
                        </Grid>
                        <Grid item xs={4} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleDrawMode('rectangle')}>
                            <SquareIcon style={{ fontSize: 40 }} />
                            <Typography variant="caption">Rectangle</Typography>
                        </Grid>
                        <Grid item xs={4} style={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => handleDrawMode('circle')}>
                            <CircleIcon style={{ fontSize: 40 }} />
                            <Typography variant="caption">Circle</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </>
    );
}
