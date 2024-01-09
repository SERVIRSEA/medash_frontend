import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Grid, Typography } from "@mui/material"

export default function About() {
    return (
      <div>
        <Header />
        <Navbar />
        <Grid container>
          <Typography variant="h3">Biophysical M&E Dashboard</Typography>
        </Grid>
        <Footer />
      </div>
    )
}
