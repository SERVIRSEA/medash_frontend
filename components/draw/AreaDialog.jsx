import React from 'react';
import { Dialog, DialogContent, DialogActions, Button, Typography, Card, CardContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AreaDialog = ({ open, handleClose, handleGenerateInsights, area }) => {
  // Convert the area to hectares and format with commas
  const areaInHectares = area != null ? area.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 'N/A';

  return (
    <Dialog open={open} onClose={handleClose}>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ paddingTop: '48px' }}>
        <Card sx={{ background: '#2563eb', color: '#fff' }}>
          <CardContent>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              The area of your selected location has approximately -
            </Typography>
            <Typography pt={2} variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#a3e635' }}>
              {areaInHectares} Ha
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'flex-start', marginLeft: '16px', marginBottom: '15px' }}>
        <Button
          variant="outlined"
          onClick={handleClose}
          // color="#ff5722"
          size='small'
          sx={{
            // borderRadius: '10px', 
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
          onClick={handleGenerateInsights}
          size='small'
          sx={{
            ml: 2,
            textTransform: 'none',
            borderColor: '#2563eb',
            '&:hover': {
              backgroundColor: '#2563eb',
              borderColor: '#2563eb',
              color: '#fff',
            },
          }}
        >
          Generate Insights
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AreaDialog;
