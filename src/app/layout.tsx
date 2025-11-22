import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '诗意星空 - Poetry Converter',
  description: '在浩瀚星空中，让文字化作诗意，在宇宙深处绽放最美的光芒',
  keywords: ['poetry', 'converter', 'chinese', '星空', '诗意'],
  authors: [{ name: 'Poetry Converter' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

