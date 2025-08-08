import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { RemoveCzShortcut } from './RemoveCzShortcut'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Simulador de Conversa - Descubra se Seu Ex Ainda Tem Interesse',
  description: 'Simule uma conversa real e descubra se seu ex ainda tem interesse romântico por você',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Meta Pixel Code */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '762750063005792');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=762750063005792&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}
      </head>
      <body className={inter.className}>
        {children}
        <RemoveCzShortcut />
      </body>
    </html>
  )
}
