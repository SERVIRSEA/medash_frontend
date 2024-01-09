"use client"
import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Button } from "@mui/material";
import Image from "next/image";
import LaunchIcon from '@mui/icons-material/Launch';
import { useRouter } from "next/navigation";
import Partners from "@/components/Partners";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    // Navigate to "/mapviewer" when the button is clicked
    router.push("/mapviewer");
  };
    return (
      <div>
        <Header />
        <Navbar />
        <Box pl={3} pr={3} pt={8} pb={8}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h3" component="div" sx={{fontWeight: 'bold', color: '#0d47a1'}}>Biophysical M&E Dashboard</Typography>
              <Typography variant="body1" component="div" pt={2} pb={2}>
                Monitoring performance of landscape-scale efforts and biophysical conditions on-the-ground.
              </Typography>
              <Typography variant="body1" component="div">
                Ensuring ecological stability and biological productivity over large areas is critical for landscape management and conservation policy. USAID/Cambodia, along with other stakeholders, require insight and reports on the effectiveness of biodiversity and conservation-related project interventions. SERVIR-Mekong’s Biophysical M&E Dashboard tool was developed in response to a need expressed by stakeholders, who require insight and reports on the effectiveness of biodiversity and conservation-related project interventions.
              </Typography>
        
              <Button
                component="a"
                variant="contained"
                startIcon={<LaunchIcon />}
                onClick={handleButtonClick}
                sx={{
                  marginTop: '30px',
                  borderRadius: '20px',
                  paddingLeft: '50px',
                  paddingRight: '50px',
                }}
              >
                LAUNCH TOOL
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Box pt={0} pl={8} pr={8}>
                <Image src="/Dashboard.png" alt="Dashboard" height={400} width={400} layout="responsive" />
              </Box>
            </Grid>
          </Grid>
          
          <Typography variant="body1" component="div" pt={8}>
            The Biophysical M&E Dashboard tool builds upon SERVIR-Mekong’s existing Eco-Dash platform and consists of four key components. The default ‘biophysical monitoring’ layer evaluates changes in broad-scale biological productivity using the Enhanced Vegetation Index (EVI), a measure of relative biomass particularly suited to high-biomass areas of the globe, derived from MODIS multispectral data. The other three components are namely, forest monitoring (forest gain/loss, derived from Landsat), forest alerts (threat alerts, derived from Landsat), and fire monitoring (hotspots and burned area, derived from MODIS). The user interface leverages the power of Google Earth Engine (GEE), a cloud computing platform that links extensive data archives with substantial processing power. With the continuous time-series feature, the user is able to select a baseline and evaluation period for each of the components as well as an identified area of interest which allows for easy comparisons between ‘before’ and ‘after’ intervention timeframes. The results can be exported in report-style format enabling decision-makers and non-technical users alike to directly use this analysis and information. These components of the tool were selected based on the needs of USAID/Cambodia and their specific M&E indicators, with carbon and biomass estimations to be incorporated in the future.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="h5" component="h5" pt={8} sx={{ fontWeight: 'bold'}}>
                Application Purpose
              </Typography>
              <Typography variant="body1" component="div" pt={1}>
                Aside from monitoring performance of landscape-scale efforts and biophysical conditions on-the-ground, the Biophysical M&E Dashboard Tool can provide valuable insights into the possible drivers of change such as climate change, urban expansion and infrastructure development.
              </Typography>
              <Typography variant="h5" component="h5" pt={8} sx={{ fontWeight: 'bold'}}>
                Application Uses
              </Typography>
              <Typography variant="body1" component="div" pt={1}>
                The Biophysical M&E Dashboard tool is currently being used by USAID/Cambodia to track performance and report on landscape-scale efforts and biophysical conditions on-the-ground in accordance with the project performance indicators, including quantifying areas of biological improvement and improved natural resource management.
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Box pt={8} pl={8} pr={8}>
                <Image src="/forest-photo.jpg" alt="forest" height={400} width={400} layout="responsive" />
                <Typography variant='caption' sx={{paddingTop: '0px', marginTop: '0px'}}>Image credit: USAID Greening Prey Lang, Cambodia </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Partners />
        <Footer />
      </div>
    )
}
