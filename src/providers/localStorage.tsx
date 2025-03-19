'use client'
import logger from '@/library/logger'
import { type ReactNode, createContext, useContext, useEffect, useState } from 'react'

export type ChapterStatus = Record<string, Record<number, boolean>>

type LocalStorageContextType = {
	chapterStatus: ChapterStatus
	toggleChapter: (novelSlug: string, chapterNumber: number) => void
	markChapterAsRead: (novelSlug: string, chapterNumber: number) => void
	markChapterAsUnread: (novelSlug: string, chapterNumber: number) => void
	getBookChapters: (novelSlug: string) => Record<number, boolean>
	getNextUnreadChapter: (novelSlug: string, totalChapters?: number) => number | null
	getNovelProgress: (chaptersProgressData: Record<number, boolean>) => boolean
	isLoading: boolean
}

const LocalStorageContext = createContext<LocalStorageContextType | undefined>(undefined)

const prefix = 'book_chapters_'

export function LocalStorageProvider({ children }: { children: ReactNode }) {
	const [chapterStatus, setChapterStatus] = useState<ChapterStatus>({})
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		setIsLoading(true)

		try {
			const allKeys = Object.keys(localStorage).filter((key) => key.startsWith(prefix))
			const loadedStatus: ChapterStatus = {}

			for (const key of allKeys) {
				try {
					const storedData = localStorage.getItem(key)
					if (storedData) {
						const parsed = JSON.parse(storedData)
						const novelSlug = key.replace(prefix, '')
						loadedStatus[novelSlug] = parsed
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
			for (const [novelSlug, chapters] of entries) {
				if (Object.keys(chapters).length > 0) {
					// Store with the prefix
					localStorage.setItem(`${prefix}${novelSlug}`, JSON.stringify(chapters))
				}
			}
		} catch (error) {
			logger.error('Error saving chapter status to localStorage:', error)
		}
	}, [chapterStatus])

	function getBookChapters(novelSlug: string): Record<number, boolean> {
		return chapterStatus[novelSlug] || {}
	}

	function toggleChapter(novelSlug: string, chapterNumber: number) {
		setChapterStatus((previousStatus) => {
			const bookChapters = previousStatus[novelSlug] || {}

			return {
				...previousStatus,
				[novelSlug]: {
					...bookChapters,
					[chapterNumber]: !bookChapters[chapterNumber],
				},
			}
		})
	}

	function markChapterAsRead(novelSlug: string, chapterNumber: number) {
		setChapterStatus((previousStatus) => {
			const bookChapters = previousStatus[novelSlug] || {}

			return {
				...previousStatus,
				[novelSlug]: {
					...bookChapters,
					[chapterNumber]: true,
				},
			}
		})
	}

	function markChapterAsUnread(novelSlug: string, chapterNumber: number) {
		setChapterStatus((previousStatus) => {
			const bookChapters = previousStatus[novelSlug] || {}

			return {
				...previousStatus,
				[novelSlug]: {
					...bookChapters,
					[chapterNumber]: false,
				},
			}
		})
	}

	function getNextUnreadChapter(novelSlug: string, totalChapters?: number): number | null {
		const bookChapters = getBookChapters(novelSlug)

		if (Object.keys(bookChapters).length === 0) return 1

		let nextChapter = 1
		const maxChapter = totalChapters || Math.max(...Object.keys(bookChapters).map(Number))

		while (nextChapter <= maxChapter - 1) {
			if (!bookChapters[nextChapter]) {
				return nextChapter + 1
			}
			nextChapter++
		}

		return null
	}

	function getNovelProgress(chaptersProgressData: Record<number, boolean>) {
		return Object.values(chaptersProgressData).some((hasProgress) => hasProgress)
	}

	return (
		<LocalStorageContext.Provider
			value={{
				chapterStatus,
				toggleChapter,
				markChapterAsRead,
				markChapterAsUnread,
				getBookChapters,
				getNextUnreadChapter,
				getNovelProgress,
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
