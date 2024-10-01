import Image from 'next/image';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider'; 
import { useEffect, useState } from 'react';

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const footerLogoUrl = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/logo-servir-sea-white.png`;
    
    useEffect(() => {
        const year = new Date().getFullYear();
        setCurrentYear(year);
    }, []);

    return (
        <div style={{ position: 'relative', bottom: 0, left: 0, right: 0 }}>
            <div style={{ marginTop: '0px', marginBottom: '0px', background: "#1e3a8a" }}>
                <Grid container spacing={3} p={4}>
                    <Grid item sm={6} xs={12} style={{ marginTop: '20px', marginBottom: '20px' }}>
                        <Link href="https://servir.adpc.net/" target="_blank" rel="noreferrer">
                            <Image src={footerLogoUrl} width={200} height={30} alt="SERVIR-SEA" />
                        </Link>
                        <Typography pt={1} variant="body1" style={{ fontWeight: 'bold', color: '#fff' }}>
                            ASIAN DISASTER PREPAREDNESS CENTER (ADPC)
                        </Typography>
                        <Typography pt={1} variant="body2" style={{ color: '#fff' }}>
                            SM Tower, 24th Floor, 979/69 Paholyothin Road, Samsen Nai Phayathai,
                            <br />
                            Bangkok 10400 Thailand
                            <br />
                            BTS Skytrain: Sanam Pao, Exit 1
                            <br />
                            <span style={{ fontWeight: 'bold' }}>Phone: </span>+66 2 298 0681-92
                            <br />
                            <span style={{ fontWeight: 'bold' }}>Fax: </span>+66 2 298 0012
                        </Typography>
                    </Grid>
                    <Grid 
                        item 
                        sm={4} 
                        xs={12} 
                        sx={{ 
                            marginTop: '20px', 
                            marginBottom: '20px',
                            display: 'flex'
                        }}
                    >
                        <List 
                            sx={{ 
                                display: 'flex',
                                flexDirection: { xs: 'column', sm: 'row' }, 
                                justifyContent: { xs: 'center', sm: 'center' },
                                padding: 0, 
                                margin: 0,
                                width: '100%',
                                gap: { xs: '10px', sm: '20px' }, // Adding gap for spacing
                                // flexWrap: 'wrap' 
                            }}
                        >
                            <ListItem sx={{ padding: 0, marginBottom: { xs: '10px', sm: 0 } }}>
                                <ListItemText 
                                    primary={<Link href="/" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { color: '#bef264' } }}>Home</Link>}
                                />
                            </ListItem>
                            <ListItem sx={{ padding: 0, marginBottom: { xs: '10px', sm: 0 } }}>
                                <ListItemText 
                                    primary={<Link href="/mapviewer" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { color: '#bef264' } }}>Map</Link>}
                                />
                            </ListItem>
                            <ListItem sx={{ padding: 0, marginBottom: { xs: '10px', sm: 0 } }}>
                                <ListItemText 
                                    primary={<Link href="https://docs.google.com/document/d/1pcKMdQWvLO9yHbMORgFlj2WvEmbYvnbsgH5y7UZIg1c/pub" target="_blank" rel="noreferrer" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { color: '#bef264' } }}>Technical Document</Link>}
                                />
                            </ListItem>
                            <ListItem sx={{ padding:0, marginBottom: { xs: '10px', sm: 0 } }}>
                                <ListItemText 
                                    primary={<Link href="https://docs.google.com/document/d/1e_AuA3kp-cFEYYGgR5su6ri5uq_Q88qu1cP5QBaCBB4/pub" target="_blank" rel="noreferrer" sx={{ color: '#fff', textDecoration: 'none', '&:hover': { color: '#bef264' } }}>User Guide</Link>}
                                />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
                <Box p={4}>
                    <Divider style={{ background: '#fff'}} />
                </Box>
                <Typography variant="body2" pb={2} sx={{ fontSize: '12px', color: '#fff', textAlign: 'center' }}>
                    Copyright © {currentYear} Biophysical M&E Dashboard by
                    <br />
                    <Link 
                        href="https://servir.adpc.net/" 
                        target="_blank" 
                        rel="noreferrer" 
                        style={{ color: '#7dd3fc', textDecoration: 'none' }}
                        onMouseOver={e => e.currentTarget.style.color = '#bef264'} 
                        onMouseOut={e => e.currentTarget.style.color = '#7dd3fc'}
                    >
                        SERVIR SEA
                    </Link>
                </Typography>
            </div>
        </div>
    );
}
