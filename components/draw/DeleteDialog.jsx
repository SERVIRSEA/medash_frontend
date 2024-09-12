// DeleteDialog.js
import React, { useCallback } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

export default function DeleteDialog({ open, onClose, onConfirm }) {
  const handleConfirm = useCallback(() => {
    onConfirm();
    onClose();
  }, [onConfirm, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        Are you sure you want to remove all drawn features?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={handleConfirm} color="error">Yes</Button>
      </DialogActions>
    </Dialog>
  );
}
