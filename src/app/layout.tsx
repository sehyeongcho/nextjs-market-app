/**
 * 페이지의 공통된 레이아웃을 정의하여 각 페이지가 일관된 스타일이나 구조를 갖게 하는 파일입니다.
 * {children} 자리에 page.tsx 파일의 내용이 삽입되어 렌더링됩니다.
 */

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from '@/components/NavBar' // Next.js를 설치할 때 설정했던 `@` alias를 사용하게 되면 src 폴더를 기준으로 경로를 작성할 수 있습니다.
import getCurrentUser from './actions/getCurrentUser'
import Script from 'next/script'
import ToastProvider from '@/components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://nextjs-market-app-k8od.vercel.app/'),
  title: 'Used Market',
  description: '중고 마켓에 오신 것을 환영합니다',
  openGraph: {
    title: 'Used Market',
    description: '중고 마켓에 오신 것을 환영합니다',
    images: [
      {
        url: '/opengraph-image.jpg',
        alt: 'market'
      }
    ]
  },
  twitter: {
    title: 'Used Market',
    description: '중고 마켓에 오신 것을 환영합니다',
    images: [
      {
        url: '/twitter-image.jpg',
        alt: 'market'
      }
    ]
  }
}

export default async function RootLayout({
  children
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
        <Script src="//dapi.kakao.com/v2/maps/sdk.js?appkey=e3dc7ccc698288825b893e87730c0217&libraries=services,clusterer&autoload=false" />
      </body>
    </html>
  )
}
