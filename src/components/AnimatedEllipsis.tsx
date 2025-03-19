'use client'
import { useEffect, useState } from 'react'

export default function AnimatedEllipsis({ className }: { className?: string }) {
	const [dots, setDots] = useState(0)

	useEffect(() => {
		const interval = setInterval(() => {
			setDots((prev) => (prev + 1) % 4)
		}, 500)
		return () => clearInterval(interval)
	}, [])

	const ellipsis = '.'.repeat(dots)
	return <span className={className}>{ellipsis}</span>
}
