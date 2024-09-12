import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

export default function ConfirmDialog({ onConfirm, onCancel }) {
  return (
    <Dialog
      open={true}
      onClose={onCancel}
    >
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to remove all drawn features?
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          No
        </Button>
        <Button onClick={onConfirm} color="secondary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
