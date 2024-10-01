import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';

const CustomDialog = ({ open, onClose, title, content, width, icon }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="custom-dialog-title"
      PaperProps={{
        sx: {
          width: fullScreen ? '100%' : width || '600px',  // Default width is 600px, but can be passed dynamically
          maxWidth: '100%',  // Ensure the dialog doesn't overflow the screen width
        },
      }}
    >
      <DialogTitle
        id="custom-dialog-title"
        sx={{
          bgcolor: '#2563eb',
          color: 'white',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 16px', 
          margin: 0, 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {icon && <div style={{ marginRight: '8px', display: 'flex', alignItems: 'center', paddingTop: '2px' }}>{icon}</div>}
          <span style={{ display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold' }}>{title}</span>
        </div>
        <IconButton
          onClick={onClose}
          sx={{ color: 'white' }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {content}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;