import * as React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import SIGLogo from '../public/assets/images/logos/sig.png';
import SEILogo from '../public/assets/images/logos/sei.png';
import DeltaresLogo from '../public/assets/images/logos/deltares.jpg';

export default function Partners(){
    return(
        <div style={{marginTop: '100px', marginBottom: '100px'}}>
            <Container>
                <Grid container spacing={2}>
                    <Grid sx={{display: { xs: 'none', sm: 'block' }}} sm={12} md={4}>
                        <Link href="https://sig-gis.com/" target="_blank" rel="noreferrer">
                            <img src={SIGLogo} style={{maxHeight: '42px'}} alt="SIG" />
                        </Link>
                    </Grid>
                    <Grid mb={2} sx={{display: { xs: 'block', sm: 'none' }}} xs={12} textAlign={'center'}>
                        <Link href="https://sig-gis.com/" target="_blank" rel="noreferrer">
                            <img src={SIGLogo} style={{maxHeight: '42px'}} alt="SIG" />
                        </Link>
                    </Grid>
                    <Grid xs={12} md={4} textAlign={'center'}>
                        <Link href="https://www.sei.org/" target="_blank" rel="noreferrer">
                            <img src={SEILogo} style={{maxHeight: '42px'}} alt="SEI" />
                        </Link>
                    </Grid>
                    <Grid sx={{display: { xs: 'none', sm: 'block' }}} md={4} textAlign={'right'}>
                        <Link href="https://www.deltares.nl/" target="_blank" rel="noreferrer">
                            <img src={DeltaresLogo} style={{maxHeight: '42px'}} alt="DELTARES" />
                        </Link>
                    </Grid>
                    <Grid mt={2} sx={{display: { xs: 'block', sm: 'none' }}} xs={12} textAlign={'center'}>
                        <Link href="https://www.deltares.nl/" target="_blank" rel="noreferrer">
                            <img src={DeltaresLogo} style={{maxHeight: '42px'}} alt="DELTARES" />
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}