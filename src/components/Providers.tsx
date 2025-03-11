'use client'
import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'

const LocalStorageProvider = dynamic(() => import('@/providers/localStorage').then((module) => module.LocalStorageProvider))

export default function Providers({ children }: { children: ReactNode }) {
	return <LocalStorageProvider>{children}</LocalStorageProvider>
}
