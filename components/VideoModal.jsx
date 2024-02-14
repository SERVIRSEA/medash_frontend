import React, { useRef } from 'react';
import { Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const VideoModal = ({ isOpen, onClose }) => {
    const videoRef = useRef(null);

    const playVideo = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="modal" style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="modal-container">
                    <div className="modal-window" style={{ backgroundColor: '#000', width: '80%', maxWidth: '800px' }}>
                        <div className="modal-wrapper custom-scroll">
                            <Button
                                onClick={onClose}
                                className="close"
                                style={{ color: '#FFF', position: 'absolute', top: '10px', right: '10px', zIndex: '999' }}
                            >
                                <CloseIcon />
                            </Button>
                            <div className="area-modal-title" style={{ color: '#FFF', textAlign: 'center', paddingTop: '15px' }}>
                                Biophysical M&E Dashboard
                            </div>
                            <video
                                ref={videoRef}
                                width="100%"
                                height="auto"
                                controls
                                onClick={playVideo}
                                style={{ marginTop: '10px' }}
                            >
                                <source src="https://me-dashboard-servir.adpc.net/media/demo-clip.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default VideoModal;

