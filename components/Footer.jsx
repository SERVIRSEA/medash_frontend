import Image from 'next/image';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Footer() {
    return (
        <div style={{position:'relative', left: 0, bottom: 0, right: 0}}>
            <div style={{marginTop: '0px', marginBottom: '0px', background: "#e1f5fe"}}>
                <Container maxWidth="xxl">
                    <Grid container spacing={0}>
                        <Grid md={6} style={{marginTop: '50px', marginBottom: '50px'}}>
                            <Link href="https://servir.adpc.net/" target="_blank" rel="noreferrer">
                                {/* eslint-disable-next-line */}
                                <img src='/assets/images/logos/servir-sea.png' width={200} height={30} alt="SERVIR-SEA" />
                            </Link>
                            <Typography pt={1} variant="body1" style={{fontWeight: 'bold'}}>
                                ASIAN DISASTER PREPAREDNESS CENTER (ADPC)
                            </Typography>
                            <Typography pt={1} variant="body2">
                                SM Tower, 24th Floor, 979/69 Paholyothin Road, Samsen Nai Phayathai,
                                <br />
                                Bangkok 10400 Thailand
                                <br />
                                BTS Skytrain: Sanam Pao, Exit 1
                                <br />
                                <span style={{fontWeight: 'bold'}}>Phone: </span>+66 2 298 0681-92
                                <br />
                                <span style={{fontWeight: 'bold'}}>Fax: </span>+66 2 298 0012
                            </Typography>
                        </Grid>
                        <Grid md={6} style={{marginTop: '50px', marginBottom: '50px'}}>
                        <Typography pt={10} variant="body1" style={{fontWeight: 'bold', textAlign: 'right'}}>
                            Disclaimer
                        </Typography> 
                        <Typography pt={1} variant="body2" align='right'>
                            SERVIR-SEA, NASA, USAID and ADPC make no express or implied warranty of this data as to the merchantability or fitness for a particular purpose. SERVIR-SEA, NASA, USAID and ADPC make no express or implied warranty as to the accuracy of the map or as to the merchantability or fitness for a particular purpose of the data. Neither the US Government nor its contractors shall be liable for special, consequential or incidental damages attributed to this data.
                        </Typography>  
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <div style={{background: "#01579b", color: '#fff', textAlign: 'center'}}>
                <Typography pt={2} pb={2} variant="body1">
                    © 2023 SERVIR SEA | Asian Disaster Preparedness Center (ADPC). All Rights Reserved.
                </Typography>  
            </div>
        </div>
    );
}