"use client"
import React, { useState } from "react"
import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography, Button } from "@mui/material";
import LaunchIcon from '@mui/icons-material/Launch';
import YouTubeIcon from '@mui/icons-material/YouTube';
import DescriptionIcon from '@mui/icons-material/Description';
import { useRouter } from "next/navigation";
import Partners from "@/components/Partners";
import VideoModal from "@/components/VideoModal";

export default function Home() {
  const router = useRouter();

  const handleButtonClick = () => {
    // Navigate to "/mapviewer" when the button is clicked
    router.push("/mapviewer");
  };
    
  const [isOpen, setIsOpen] = useState(false);

  const handleVideoButtonClick = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

    return (
      <div>
        <Header />
        <Navbar />
        <Box pl={3} pr={3} pt={8} pb={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography
                  variant="h3"
                  component="div"
                  sx={{
                      fontWeight: 'bold',
                      color: '#1e40af',
                      fontSize: {
                          xs: '1.75rem', 
                          sm: '2.25rem', 
                      },
                      lineHeight: {
                          xs: '2rem',
                          sm: '3rem',
                      },
                  }}
              >
                  Biophysical M&E Dashboard
              </Typography>
              <Typography variant="body2" component="div" pt={2} pb={2}>
                Monitoring performance of landscape-scale efforts and biophysical conditions on-the-ground.
              </Typography>
              <Typography variant="body2" component="div">
                Ensuring ecological stability and biological productivity over large areas is critical for landscape management and conservation policy. USAID/Cambodia, along with other stakeholders, require insight and reports on the effectiveness of biodiversity and conservation-related project interventions. SERVIR-SEA Biophysical M&E Dashboard tool was developed in response to a need expressed by stakeholders, who require insight and reports on the effectiveness of biodiversity and conservation-related project interventions.
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
                  marginRight: '30px',
                  backgroundColor: '#2563eb',
                  color: '#fff', 
                  '&:hover': {
                      backgroundColor: '#1e40af', 
                      color: '#fff', 
                  }
                }}
              >
                LAUNCH TOOL
              </Button>
              <Button
                component="a"
                variant="contained"
                startIcon={<YouTubeIcon />}
                onClick={handleVideoButtonClick}
                sx={{
                  marginTop: '30px',
                  borderRadius: '20px',
                  paddingLeft: '50px',
                  paddingRight: '50px',
                  marginRight: { xs: '0', sm: '30px' },
                  backgroundColor: '#2563eb',
                  color: '#fff', 
                  '&:hover': {
                      backgroundColor: '#1e40af', 
                      color: '#fff', 
                  }
                }}
              >
                WATCH A DEMO VIDEO
              </Button>
              <Button
                variant="contained"
                startIcon={<DescriptionIcon />}
                color="primary"
                href="https://docs.google.com/document/d/e/2PACX-1vTGOYwxTtm_RARo78PDBVTSw3xIqPEfZCG_4LOntU1VjBqQlz3UoTLMYFpBhbDDp53i1zGMqEx_GxfQ/pub"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  marginTop: '30px',
                  borderRadius: '20px',
                  paddingLeft: '50px',
                  paddingRight: '50px',
                  backgroundColor: '#2563eb',
                  color: '#fff', 
                  '&:hover': {
                      backgroundColor: '#1e40af', 
                      color: '#fff', 
                  }
                }}
              >
                USER GUIDELINE
              </Button>
              <VideoModal isOpen={isOpen} onClose={handleCloseModal} />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* <Box pt={0} pl={8} pr={8}>
                
                <img src="/Dashboard.png" alt="Dashboard" height={400} width={500} layout="responsive" />
              </Box> */}
              <Box
                  sx={{
                      pt: { xs: 4, sm: 2 }, 
                      pl: { xs: 0, sm: 8 }, 
                      pr: { xs: 0, sm: 8 },
                      pb: { xs: 2, sm: 8 },
                      display: 'flex',
                      justifyContent: 'center', 
                      alignItems: 'center', 
                  }}
              >
                {/* eslint-disable-next-line */}
                <img
                  src="/Dashboard.png"
                  alt="Dashboard"
                  style={{
                      width: '100%', 
                      maxWidth: { xs: '100%', sm: '500px' }, 
                      height: 'auto', 
                      maxHeight: { xs: '200px', sm: '400px' }, 
                      display: 'block' 
                  }}
                />
              </Box>
            </Grid>
          </Grid>
          
          <Typography variant="body2" component="div" pt={8}>
            The Biophysical M&E Dashboard tool builds upon SERVIR-SEA existing Eco-Dash platform and consists of four key components. The default ‘biophysical monitoring’ layer evaluates changes in broad-scale biological productivity using the Enhanced Vegetation Index (EVI), a measure of relative biomass particularly suited to high-biomass areas of the globe, derived from MODIS multispectral data. The other three components are namely, forest monitoring (forest gain/loss, derived from Landsat), forest alerts (threat alerts, derived from Landsat), and fire monitoring (hotspots and burned area, derived from MODIS). The user interface leverages the power of Google Earth Engine (GEE), a cloud computing platform that links extensive data archives with substantial processing power. With the continuous time-series feature, the user is able to select a baseline and evaluation period for each of the components as well as an identified area of interest which allows for easy comparisons between ‘before’ and ‘after’ intervention timeframes. The results can be exported in report-style format enabling decision-makers and non-technical users alike to directly use this analysis and information. These components of the tool were selected based on the needs of USAID/Cambodia and their specific M&E indicators, with carbon and biomass estimations to be incorporated in the future.
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h5" pt={8} sx={{ fontWeight: 'bold'}}>
                Application Purpose
              </Typography>
              <Typography variant="body2" component="div" pt={1}>
                Aside from monitoring performance of landscape-scale efforts and biophysical conditions on-the-ground, the Biophysical M&E Dashboard Tool can provide valuable insights into the possible drivers of change such as climate change, urban expansion and infrastructure development.
              </Typography>
              <Typography variant="h5" component="h5" pt={8} sx={{ fontWeight: 'bold'}}>
                Application Uses
              </Typography>
              <Typography variant="body2" component="div" pt={1}>
                The Biophysical M&E Dashboard tool is currently being used by USAID/Cambodia to track performance and report on landscape-scale efforts and biophysical conditions on-the-ground in accordance with the project performance indicators, including quantifying areas of biological improvement and improved natural resource management.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                  sx={{
                      pt: { xs: 4, sm: 8 }, 
                      pl: { xs: 0, sm: 8 }, 
                      pr: { xs: 0, sm: 8 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center', 
                      textAlign: 'center' 
                  }}
              >
                {/* eslint-disable-next-line */}
                <img
                    src="/forest-photo.jpg"
                    alt="forest"
                    style={{
                        width: '100%', 
                        maxWidth: { xs: '100%', sm: '600px' }, 
                        height: 'auto', 
                        maxHeight: { xs: '200px', sm: '400px' }, 
                    }}
                />
                <Typography 
                    variant='caption' 
                    sx={{
                        paddingTop: { xs: '0px', sm: '8px' }, // Padding top for sm and up
                        marginTop: { xs: '0px', sm: '8px' }, // Margin top for sm and up
                        color: '#555' 
                    }}
                >
                    Image credit: USAID Greening Prey Lang, Cambodia
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Partners />
        <Footer />
      </div>
    )
}
