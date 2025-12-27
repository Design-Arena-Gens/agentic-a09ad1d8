import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Medigo Medical Delivery Express',
  description: 'Fast & trusted medical delivery service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
