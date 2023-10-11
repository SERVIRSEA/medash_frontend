import Image from 'next/image';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import USAIDLogo from '../public/assets/images/logos/usaid.png';
import ADPCLogo from '../public/assets/images/logos/adpc.png'
import NASALogo from '../public/assets/images/logos/nasa-logo.svg'
import SERVIR_SEA_Logo from '../public/assets/images/logos/servir-sea.png'


export default function Header() {
  return (
    <Container style={{marginTop: '10px'}}>
            <Grid container sx={{ display: { xs: 'block', sm: 'none' } }} spacing={0}>
                <Grid item xs={12} style={{display: 'flex', justifyContent:'space-between'}}>
                    <Link href="#">
                        <div style={{paddingTop: '0px'}}>
                            <Image src={USAIDLogo} alt="USAID" />
                        </div>
                    </Link>
                    <Link href="#">
                        <div style={{paddingTop: '4px'}}>
                            <Image src={ADPCLogo} width={82} alt="ADPC" />
                        </div>
                    </Link> 
                    <Link href="#">
                        <div style={{paddingTop: '0px'}}>
                            <Image src={NASALogo} width={62} alt="NASA" />
                        </div>
                    </Link>
                </Grid> 
                <Grid item xs={12} style={{display: 'flex', justifyContent:'center'}}>
                    <Link href="#">
                        <div style={{paddingTop: '0px', paddingBottom: '4px'}} >
                            <Image src={SERVIR_SEA_Logo} width={200} alt="SERVIR-SEA" />
                        </div>
                    </Link>
                </Grid>
            </Grid>
            <Grid container sx={{ display: { xs: 'none', sm: 'block' }, flexDirection: 'row' }}>
                <Grid container sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid item container sm={8} md={8} lg={8} xl={8}>
                        <Link href="https://www.usaid.gov/" target="_blank" rel="noreferrer">
                            <div>
                                <Image src={USAIDLogo} height={42} alt="USAID" />
                            </div>
                        </Link>
                        <Link href="https://www.nasa.gov/" px={2} target="_blank" rel="noreferrer">
                            <Image src={NASALogo} width={52} alt="NASA" />
                        </Link>
                        <Link href="https://www.adpc.net/" target="_blank" rel="noreferrer">
                            <div style={{paddingTop: '4px', paddingBottom: '0px'}}>
                                <Image src={ADPCLogo} width={72} alt="ADPC" />
                            </div>
                        </Link>   
                    </Grid>
                    <Grid item container sm={4} md={4} lg={4} xl={4} justifyContent='flex-end'>
                        <Link href="https://servir.adpc.net/" target="_blank" rel="noreferrer">
                            <div style={{paddingTop: '6px'}}>
                                <Image src={SERVIR_SEA_Logo} width={200} alt="SERVIR-SEA" />
                            </div>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>
    </Container>
  );
}