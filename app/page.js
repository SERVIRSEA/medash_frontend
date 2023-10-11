import Navbar from "@/components/Navbar"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function Home() {
    return (
      <div>
        <Header />
        <Navbar />
        <h1 sx={{textAlign:"center"}}>This is home page</h1>
        <Footer />
      </div>
    )
}
