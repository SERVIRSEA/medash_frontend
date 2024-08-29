import * as React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';

export default function Partners() {
    const theme = useTheme();

    return (
        <div style={{ marginTop: '100px', marginBottom: '100px' }}>
            <Container>
                <h3 style={{ textAlign: 'center' }}>Our Collaboration</h3>
                <List
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' }, // Column for xs, row for sm and up
                        justifyContent: { xs: 'center', sm: 'space-around' }, // Center for xs, space-around for sm and up
                        alignItems: 'center',
                        padding: 0, // Remove default padding
                        margin: 0, // Remove default margin
                        gap: '10px' // Add some space between items
                    }}
                >
                    <ListItem sx={{ display: 'flex', justifyContent: 'center', flex: '1 1 auto' }}>
                        <Link href="https://www.usaid.gov/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src='logo-usaid.png' width={100} height={35} alt="USAID" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', justifyContent: 'center', flex: '1 1 auto' }}>
                        <Link href="https://www.nasa.gov/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src='logo-nasa.svg' width={45} height={35} alt="NASA" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', justifyContent: 'center', flex: '1 1 auto' }}>
                        <Link href="https://www.adpc.net/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src='logo-adpc.png' width={62} height={28} alt="ADPC" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', justifyContent: 'center', flex: '1 1 auto' }}>
                        <Link href="https://servir.adpc.net/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src='logo-servir-sea.png' width={160} height={26} alt="SERVIR-SEA" style={{ maxWidth: '100%', height: 'auto' }} />
                        </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', justifyContent: 'center', flex: '1 1 auto' }}>
                        <Link href="https://sig-gis.com/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src="sig.png" alt="SIG" width={200} height={50} style={{ maxWidth: '100%', height: 'auto' }} />
                        </Link>
                    </ListItem>
                    <ListItem sx={{ display: 'flex', justifyContent: 'center', flex: '1 1 auto' }}>
                        <Link href="https://www.deltares.nl/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src="deltares.jpg" alt="DELTARES" width={160} height={60} style={{ maxWidth: '100%', height: 'auto' }} />
                        </Link>
                    </ListItem>
                </List>
            </Container>
        </div>
    );
}