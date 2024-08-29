import Image from 'next/image';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

export default function Header() {
  return (
    <>
      <Grid container sx={{ width: '100%', display: { xs: 'block', sm: 'none' } }} spacing={0}>
          <Grid item xs={12} pt={2} pl={4} pr={4} style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link href="https://www.usaid.gov/" target="_blank" rel="noreferrer">
                  <div style={{ paddingTop: '0px' }}>
                      {/* eslint-disable-next-line */}
                      <img src='logo-usaid.png' width={130} height={45} alt="USAID" />
                  </div>
              </Link>
              <Link href="https://www.nasa.gov/" target="_blank" rel="noreferrer">
                  <div style={{ paddingTop: '0px' }}>
                      {/* eslint-disable-next-line */}
                      <img src='logo-nasa.svg' width={62} height={50} alt="NASA" />
                  </div>
              </Link>
              <Link href="https://www.adpc.net/" target="_blank" rel="noreferrer">
                  <div style={{ paddingTop: '4px' }}>
                      {/* eslint-disable-next-line */}
                      <img src='logo-adpc.png' width={82} height={40} alt="ADPC" />
                  </div>
              </Link> 
          </Grid> 
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Link href="https://servir.adpc.net/" target="_blank" rel="noreferrer">
                  <div style={{ paddingTop: '0px', paddingBottom: '4px' }}>
                      {/* eslint-disable-next-line */}
                      <img src='logo-servir-sea.png' width={200} height={30} alt="SERVIR-SEA" />
                  </div>
              </Link>
          </Grid>
      </Grid>
      <Grid sx={{ ml: 2, mr: 2, display: { xs: 'none', sm: 'block' } }}>
          <Grid container sx={{ marginTop: '10px', display: 'flex', flexDirection: 'row', width: '100%' }}>
            <Grid item sm={8} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
              <Link href="https://www.usaid.gov/" target="_blank" rel="noreferrer">
                <div style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                  {/* eslint-disable-next-line */}
                  <img src='logo-usaid.png' width={100} height={35} alt="USAID" />
                </div>
              </Link>
              <Link href="https://www.nasa.gov/" target="_blank" rel="noreferrer">
                {/* eslint-disable-next-line */}
                <img src='logo-nasa.svg' width={45} height={35} alt="NASA" />
              </Link>
              <Link href="https://www.adpc.net/" target="_blank" rel="noreferrer">
                <div style={{ paddingTop: '4px', paddingBottom: '0px' }}>
                  {/* eslint-disable-next-line */}
                  <img src='logo-adpc.png' width={62} height={28} alt="ADPC" />
                </div>
              </Link>
            </Grid>
            <Grid item sm={4} sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <Link href="https://servir.adpc.net/" target="_blank" rel="noreferrer">
                <div style={{ paddingTop: '4px' }}>
                  {/* eslint-disable-next-line */}
                  <img src='logo-servir-sea.png' width={160} height={26} alt="SERVIR-SEA" />
                </div>
              </Link>
            </Grid>
          </Grid>
      </Grid>
    </>
  );
}