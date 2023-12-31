import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import TopBar from '@/components/topbar/TopBar'
import Navbar from '@/components/navbar/Navbar'
import QueryProvider from "@/context/QueryProvider"
import { dir } from 'i18next';
import i18nConfig from '@/next-i18next.config';
import { ApiCacheProvider } from '@/context/CacheContextApi'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function generateStaticParams() {
  return i18nConfig.locales.map(locale => ({ locale }));
}

// export default 
// function RootLayout({
// export default 
export default function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className}>
        <TopBar />
        <ApiCacheProvider>
          <QueryProvider>
            <Navbar />
            {children}
          </QueryProvider>
        </ApiCacheProvider>
      </body>
    </html>
  )
}

// export default appWithTranslation(RootLayout)
