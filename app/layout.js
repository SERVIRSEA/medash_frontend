import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Biophysical M&E Dashboard',
  description: 'SERVIR SEA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="favicon.ico" sizes="any" /></head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
