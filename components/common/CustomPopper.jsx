import React from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';

const CustomPopper = ({ open, anchorEl, setOpen, children, placement = 'left' }) => {
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement={placement} 
      transition
      modifiers={[
        {
          name: 'offset',
          options: {
            offset: [0, 10], 
          },
        },
      ]}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            {children} 
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default CustomPopper;