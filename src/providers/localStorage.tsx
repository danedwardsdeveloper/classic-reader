'use client'
import logger from '@/library/logger'
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'

export type ChapterStatus = Record<string, Record<number, boolean>>

type LocalStorageContextType = {
	chapterStatus: ChapterStatus
	toggleChapter: (bookSlug: string, chapterNumber: number) => void
	markChapterAsRead: (bookSlug: string, chapterNumber: number) => void
	markChapterAsUnread: (bookSlug: string, chapterNumber: number) => void
	getBookChapters: (bookSlug: string) => Record<number, boolean>
	isLoading: boolean
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined)

// Use a prefix to identify book-related localStorage items
const prefix = 'book_chapters_'

export function LocalStorageProvider({ children }: { children: ReactNode }) {
	const [chapterStatus, setChapterStatus] = useState<ChapterStatus>({})
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (typeof window === 'undefined') return
		setIsLoading(true)

		try {
			// Only look for keys that match our book chapter prefix
			const allKeys = Object.keys(localStorage).filter((key) => key.startsWith(prefix))
			const loadedStatus: ChapterStatus = {}

			for (const key of allKeys) {
				try {
					const storedData = localStorage.getItem(key)
					if (storedData) {
						const parsed = JSON.parse(storedData)
						// Extract the book slug from the key
						const bookSlug = key.replace(prefix, '')
						loadedStatus[bookSlug] = parsed
					}
				} catch (error) {
					logger.error('Error loading chapter status from localStorage:', error)
				}
			}

			setChapterStatus(loadedStatus)
		} catch (error) {
			logger.error('Error initializing localStorage provider:', error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		if (typeof window === 'undefined') return

		try {
			const entries = Object.entries(chapterStatus)
			for (const [bookSlug, chapters] of entries) {
				if (Object.keys(chapters).length > 0) {
					// Store with the prefix
					localStorage.setItem(`${prefix}${bookSlug}`, JSON.stringify(chapters))
				}
			}
		} catch (error) {
			logger.error('Error saving chapter status to localStorage:', error)
		}
	}, [chapterStatus])

	function getBookChapters(bookSlug: string): Record<number, boolean> {
		return chapterStatus[bookSlug] || {}
	}

	function toggleChapter(bookSlug: string, chapterNumber: number) {
		setChapterStatus((previousStatus) => {
			const bookChapters = previousStatus[bookSlug] || {}

			return {
				...previousStatus,
				[bookSlug]: {
					...bookChapters,
					[chapterNumber]: !bookChapters[chapterNumber],
				},
			}
		})
	}

	function markChapterAsRead(bookSlug: string, chapterNumber: number) {
		setChapterStatus((previousStatus) => {
			const bookChapters = previousStatus[bookSlug] || {}

			return {
				...previousStatus,
				[bookSlug]: {
					...bookChapters,
					[chapterNumber]: true,
				},
			}
		})
	}

	function markChapterAsUnread(bookSlug: string, chapterNumber: number) {
		setChapterStatus((previousStatus) => {
			const bookChapters = previousStatus[bookSlug] || {}

			return {
				...previousStatus,
				[bookSlug]: {
					...bookChapters,
					[chapterNumber]: false,
				},
			}
		})
	}

	return (
		<LocalStorageContext.Provider
			value={{
				chapterStatus,
				toggleChapter,
				markChapterAsRead,
				markChapterAsUnread,
				getBookChapters,
				isLoading,
			}}
		>
			{children}
		</LocalStorageContext.Provider>
	)
}

export function useLocalStorage() {
	const context = useContext(LocalStorageContext)

	if (context === undefined) {
		throw new Error('useLocalStorage must be used within a LocalStorageProvider')
	}

	return context
}
