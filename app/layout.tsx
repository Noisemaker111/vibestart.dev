import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { SandboxState } from '@/components/modals/sandbox-state'
import { Toaster } from '@/components/ui/sonner'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VibeStart.dev — AI Coding Platform',
  description: '',
}

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NuqsAdapter>{children}</NuqsAdapter>
        <footer className="mt-12 border-t border-border py-4 text-center text-xs text-muted-foreground">
          About VibeStart.dev —{' '}
          <a
            className="underline underline-offset-2"
            href="https://github.com/Noisemaker111/vibestart.dev"
            rel="noopener noreferrer"
            target="_blank"
          >
            github.com/Noisemaker111/vibestart.dev
          </a>{' '}
          · Community‑driven — contributions welcome
        </footer>
        <Toaster />
        <SandboxState />
      </body>
    </html>
  )
}
