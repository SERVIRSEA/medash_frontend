import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CircleIcon from '@mui/icons-material/Circle';
import HomeIcon from '@mui/icons-material/Home';

const buttonStyle = {
    color: '#fff',
    fontSize: '14px',
    textTransform: 'none',
    '&:hover': {
        '.MuiSvgIcon-root, .navbar-menu-item': {
            color: '#bef264',
        },
    },
};

const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
};

function DesktopNav() {
    return (
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button 
                sx={buttonStyle}
                startIcon={<HomeIcon />}
            >
                <Link className="navbar-menu-item" href="/" underline="none" sx={linkStyle}>Home</Link>
            </Button>
            <Button 
                sx={buttonStyle}
                startIcon={<CircleIcon sx={{ width: '8px', height: '8px' }} />}
            >
                <Link className="navbar-menu-item" href="/mapviewer" underline="none" sx={linkStyle}>Map</Link>
            </Button>
            <Button 
                sx={buttonStyle}
                startIcon={<CircleIcon sx={{ width: '8px', height: '8px' }} />}
            >
                <Link 
                    className="navbar-menu-item" 
                    href="https://docs.google.com/document/d/1pcKMdQWvLO9yHbMORgFlj2WvEmbYvnbsgH5y7UZIg1c/pub" 
                    underline="none" 
                    sx={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Technical Document
                </Link>
            </Button>
            <Button 
                sx={buttonStyle}
                startIcon={<CircleIcon sx={{ width: '8px', height: '8px' }} />}
            >
                <Link 
                    className="navbar-menu-item" 
                    href="https://docs.google.com/document/d/1e_AuA3kp-cFEYYGgR5su6ri5uq_Q88qu1cP5QBaCBB4/pub" 
                    underline="none" 
                    sx={linkStyle}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    User Guide
                </Link>
            </Button>
        </Box>
    );
}

export default DesktopNav;