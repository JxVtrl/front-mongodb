import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"

import { AppProvider } from "@/contexts/contextApi"
import Header from "../components/Header"
import Footer from "../components/Footer"
import SeatModal from "../components/SeatModal"

import "../styles/globals.css"
import "../styles/home.css"
import "../styles/register.css"
import "../styles/login.css"
import "../styles/footer.css";
import "../styles/header.css";
import "../styles/helpbox.css";
import Script from "next/script"
import FaceIdWidget from "@/components/FaceIdWidget"

const inter = Inter({ subsets: ["latin"] })

const montserrat = Montserrat({
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "NextAuto",
  description: "Sistema de reserva de passagem de ônibus",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <html lang="pt-br">
      <body>
        <AppProvider>
          <main className={`${inter.className} ${montserrat.className}`}>
          <FaceIdWidget/>
            
          <SeatModal/>
          <Header />
          {children}
            <Footer />
        </main>
      </AppProvider>
    </body>
    </html>
  )
}
