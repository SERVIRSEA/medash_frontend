import React, { useRef } from 'react';
import { Modal, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReactPlayer from 'react-player/youtube';

const VideoModal = ({ isOpen, onClose }) => {
    const playerRef = useRef(null);

    const playVideo = () => {
        if (playerRef.current) {
            playerRef.current.getInternalPlayer().playVideo();
        }
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <div className="modal" style={{ display: 'flex', justifyContent: 'center', width: '90%', height: '90%' }}>
                <div className="modal-container" style={{ width: '100%', height: '100%' }}>
                    <div
                        className="modal-window"
                        style={{ backgroundColor: '#000', width: '100%', height: '100%', position: 'relative' }}
                    >
                        <div className="modal-wrapper custom-scroll" style={{ width: '100%', height: '100%' }}>
                            <Button
                                onClick={onClose}
                                className="close"
                                style={{
                                    color: '#FFF',
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    zIndex: '999',
                                }}
                            >
                                <CloseIcon />
                            </Button>
                            <div
                                className="area-modal-title"
                                style={{ color: '#FFF', textAlign: 'center', paddingTop: '15px', fontSize: '20px' }}
                            >
                                Biophysical M&E Dashboard
                            </div>
                            <ReactPlayer
                                ref={playerRef}
                                url="https://youtu.be/pWNUVcux3KE?si=J8c9eogaQOm-g9lO"
                                width="100%"
                                height="calc(100% - 60px)" 
                                controls={true}
                                playing={false}
                                onClick={playVideo}
                                style={{ marginTop: '10px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default VideoModal;