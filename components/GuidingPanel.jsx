import React, { useState } from 'react';
import { Modal, Button, Typography, Grid, Box, Link } from '@mui/material';
import VideoModal from "@/components/VideoModal";
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';

const GuidingPanel = ({ isOpen, onClose }) => {
  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleCloseModal = () => {
    setShowVideoModal(false);
    onClose();
  };

  const handleVideoButtonClick = () => {
    setShowVideoModal(true);
  };

  return (
    <>
      <Modal open={isOpen && !showVideoModal} onClose={onClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 800,
            bgcolor: 'white',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Button
            onClick={onClose}
            variant="text"
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <CloseIcon />
          </Button>
          <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
            Welcome to the Biophysical M&E Dashboard
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, color: 'info.main' }}>
            GET STARTED WITH FOUR EASY STEPS
          </Typography>
          <Grid container spacing={2}>
            {steps.map((step, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img src={step.icon} alt={step.alt} width="25%" />
                </Box>
                <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                  <b>{step.title}</b> {step.description}
                </Typography>
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            startIcon={<YouTubeIcon />}
            onClick={handleVideoButtonClick}
            sx={{
              marginTop: '30px',
              borderRadius: '20px',
              paddingLeft: '50px',
              paddingRight: '50px',
            }}
          >
            WATCH A DEMO VIDEO
          </Button>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <Link href="https://docs.google.com/document/d/e/2PACX-1vTGOYwxTtm_RARo78PDBVTSw3xIqPEfZCG_4LOntU1VjBqQlz3UoTLMYFpBhbDDp53i1zGMqEx_GxfQ/pub" target="_blank" rel="noopener noreferrer">
              READ OUR TOOL GUIDELINES TO DISCOVER MORE…
            </Link>
          </Typography>
        </Box>
      </Modal>
      {showVideoModal && <VideoModal isOpen={isOpen} onClose={handleCloseModal} />}
    </>
  );
};

export default GuidingPanel;

const steps = [
  {
    title: 'Step 1',
    description: 'Select Baseline and Evaluation period (Baseline period: period before project intervention / Evaluation period: period of project intervention)',
    icon: 'https://me-dashboard-servir.adpc.net/static/images/icons/guide/time-period.png',
    alt: 'Time Period',
  },
  {
    title: 'Step 2',
    description: 'Define area of interest (administrative boundaries, protected area(s) or customized)',
    icon: 'https://me-dashboard-servir.adpc.net/static/images/icons/guide/define-area.png',
    alt: 'Define Area',
  },
  {
    title: 'Step 3',
    description: 'Update map',
    icon: 'https://me-dashboard-servir.adpc.net/static/images/icons/guide/img-processing.png',
    alt: 'Update Map',
  },
  {
    title: 'Step 4',
    description: 'Select information of interest',
    icon: 'https://me-dashboard-servir.adpc.net/static/images/icons/guide/components.png',
    alt: 'Select Information',
  },
];
