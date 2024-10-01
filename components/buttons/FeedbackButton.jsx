import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { Fab, Tooltip } from '@mui/material';
import FeedbackIcon from '@mui/icons-material/Feedback';
import CustomDialog from '../common/CustomDialog';
import FeedbackForm from '../forms/FeedbackForm';
import { feedbackModalCloseAtom } from '@/state';

const FeedbackButton = () => {
    const [open, setOpen] = useAtom(feedbackModalCloseAtom);;

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Tooltip title="Give Feedback" arrow>
                <Fab
                    aria-label="feedback"
                    onClick={handleOpen}
                    size="small" 
                    sx={{
                        background: '#b45309',
                        position: 'fixed',
                        bottom: '25px',
                        right: '10px',
                        zIndex: 1000,
                        '&:hover': {
                            background: '#a05207', 
                        }
                    }}
                >
                    <FeedbackIcon sx={{ color: '#fff' }} />
                </Fab>
            </Tooltip>
            <CustomDialog
                open={open}            
                onClose={handleClose}  
                title="Give Us Your Feedback"    
                content={<FeedbackForm />}
                // width="100%" 
                icon={<FeedbackIcon sx={{ color: '#fff' }} />}
            />
        </>
    );
};

export default FeedbackButton;
