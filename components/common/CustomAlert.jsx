import React from 'react';
import { useAtom } from 'jotai';
import { alertOpenAtom, alertMessageAtom } from '@/state/atoms';
import { Modal, Box } from '@mui/material';
import { Alert } from '@mui/material';

const CustomAlert = () => {
    const [open, setOpen] = useAtom(alertOpenAtom);
    const [message] = useAtom(alertMessageAtom);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'red', boxShadow: 24, p: 0 }}>
                <Alert severity="error" onClose={handleClose} variant="filled">
                    {message}
                </Alert>
            </Box>
        </Modal>
    );
};

export default CustomAlert;
