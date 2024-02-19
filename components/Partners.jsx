import * as React from 'react';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

export default function Partners(){
    return(
        <div style={{marginTop: '100px', marginBottom: '100px'}}>
            <Container>
                <Grid container spacing={2}>
                    <Grid sx={{display: { xs: 'none', sm: 'block' }}} sm={12} md={4}>
                        <Link href="https://sig-gis.com/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src="/assets/images/logos/sig.png" alt="SIG" width={200} height={50} />
                        </Link>
                    </Grid>
                    <Grid xs={12} md={4} textAlign={'center'}>
                        <Link href="https://www.sei.org/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src="/assets/images/logos/sei.png" alt="SEI" width={180} height={60} />
                        </Link>
                    </Grid>
                    <Grid sx={{display: { xs: 'none', sm: 'block' }}} md={4} textAlign={'right'}>
                        <Link href="https://www.deltares.nl/" target="_blank" rel="noreferrer">
                            {/* eslint-disable-next-line */}
                            <img src="/assets/images/logos/deltares.jpg" alt="DELTARES" width={160} height={60} />
                        </Link>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}