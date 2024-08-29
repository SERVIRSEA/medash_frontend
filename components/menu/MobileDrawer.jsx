import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import CircleIcon from '@mui/icons-material/Circle';
import HomeIcon from '@mui/icons-material/Home';

const buttonStyle = {
    color: '#000',
    fontSize: '14px',
    textTransform: 'none',
    '&:hover': {
        color: '#2563eb',
        '& .MuiSvgIcon-root': {
            color: '#2563eb',
        },
    },
};

const linkStyle = {
    color: '#000',
    textDecoration: 'none',
    '&:hover': {
        color: '#2563eb',
        '& .MuiSvgIcon-root': {
            color: '#2563eb',
        },
    },
};

const listItemStyle = {
    paddingLeft: '12px', 
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: '8px'
};

function MobileDrawer({ handleDrawerToggle, mobileOpen }) {
    return (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2, fontSize: '14px' }}>
                Biophysical M&E Dashboard
            </Typography>
            <Divider />
            <List>
                <ListItem sx={listItemStyle}>
                    <Button sx={buttonStyle} startIcon={<HomeIcon style={{ml:-2}} />}>
                        <Link href="/" underline="none" sx={linkStyle}>Home</Link>
                    </Button>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Button sx={buttonStyle} startIcon={<CircleIcon sx={{ width: '8px', height: '8px' }} />}>
                        <Link href="/mapviewer" underline="none" sx={linkStyle}>Mapviewer</Link>
                    </Button>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Button sx={buttonStyle} startIcon={<CircleIcon sx={{ width: '8px', height: '8px' }} />}>
                        <Link 
                            href="https://docs.google.com/document/d/1pcKMdQWvLO9yHbMORgFlj2WvEmbYvnbsgH5y7UZIg1c/pub" 
                            underline="none" 
                            sx={linkStyle}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Technical Document
                        </Link>
                    </Button>
                </ListItem>
                <ListItem sx={listItemStyle}>
                    <Button sx={buttonStyle} startIcon={<CircleIcon sx={{ width: '8px', height: '8px' }} />}>
                        <Link 
                            href="https://docs.google.com/document/d/1e_AuA3kp-cFEYYGgR5su6ri5uq_Q88qu1cP5QBaCBB4/pub" 
                            underline="none" 
                            sx={linkStyle}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            User Guide
                        </Link>
                    </Button>
                </ListItem>
            </List>
        </Box>
    );
}

export default MobileDrawer;
