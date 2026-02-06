import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { IframeLoggerInit } from '@/components/IframeLoggerInit'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Impact Saathi - India AI Impact Summit 2026',
  description: 'Your AI-powered guide to India AI Impact Summit 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <IframeLoggerInit />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
