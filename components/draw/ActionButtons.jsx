// ActionButtons.js
import React from 'react';
import { ButtonGroup, Button } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

export default function ActionButtons({ onFinishClick, onCancelClick }) {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="horizontal button group"
      sx={{
        position: 'absolute',
        top: '100px',
        right: '70px',
        zIndex: 1000,
        background: '#0f172a'
      }}
      onClick={(e) => e.stopPropagation()} // Prevent map click when clicking buttons
    >
      <Button color="success" onClick={onFinishClick}>
        <CheckIcon />
        Finish
      </Button>
      <Button color="error" onClick={onCancelClick}>
        <ClearIcon />
        Cancel
      </Button>
    </ButtonGroup>
  );
}
