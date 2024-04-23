import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar'
import getCurrentUser from './actions/getCurrentUser'
import Script from 'next/script'
import ToastProvider from '@/components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body>
        <NavBar currentUser={currentUser} />
        <ToastProvider />
        <div>
          {children}
        </div>
        <Script
          src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e3dc7ccc698288825b893e87730c0217&libraries=services,clusterer&autoload=false"
        />
      </body>
    </html>
  )
}