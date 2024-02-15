import React from 'react';
import { Modal, Button, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CustomModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          maxWidth: 600,
          bgcolor: 'white',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          outline: 'none',
          maxHeight: '80vh',
          overflowY: 'auto',
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
        <Typography variant="h6" align="center" sx={{ mb: 2, fontWeight: 'bold', color: '#333' }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default CustomModal;