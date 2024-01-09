"use client"
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import '../styles/NavBarStyle.css';

const drawerWidth = 240;
const fixedWidth = 250; // Set your desired fixed width here

function Navbar(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                BIOPHYSICAL M&E DASHBOARD
            </Typography>
            <Divider />
            <List>
                <ListItem>
                    <Link className="navbar-menu-item" href="/" underline="none" sx={{ color: '#000' }}>Home</Link>
                </ListItem>
                <ListItem>
                    <Link className="navbar-menu-item" href="/about" underline="none" sx={{ color: '#000' }}>About</Link>
                </ListItem>
                <ListItem>
                    <Link className="navbar-menu-item" href="/mapviewer" underline="none" sx={{ color: '#000' }}>Mapviewer</Link>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav" position="sticky" sx={{ width: '100%' }}>
                <Toolbar sx={{ p: 0, m: 0, display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: { sm: 2, xs: 0 }, // Adjust margin based on screen size
                                ml: 1,
                                display: { sm: 'none', xs: 'block' }, // Show only on small screens (xs)
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                            BIOPHYSICAL M&E DASHBOARD
                        </Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Button sx={{ color: '#fff' }}>
                            <Link className="navbar-menu-item" href="/" underline="none" sx={{ color: '#fff' }}>Home</Link>
                        </Button>
                        <Button sx={{ color: '#fff' }}>
                            <Link className="navbar-menu-item" href="/about" underline="none" sx={{ color: '#fff' }}>About</Link>
                        </Button>
                        <Button sx={{ color: '#fff' }}>
                            <Link className="navbar-menu-item" href="/mapviewer" underline="none" sx={{ color: '#fff' }}>Mapviewer</Link>
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}

Navbar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Navbar;
