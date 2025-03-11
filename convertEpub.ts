import fs from 'node:fs/promises'
import path from 'node:path'
import logger from '@/library/logger'
import type { Book, BookSlug } from '@/types'
import EPub from 'epub'
import { JSDOM } from 'jsdom'

function parseEpub(epubPath: string): Promise<Book> {
	logger.info('Parsing epub...')
	return new Promise((resolve, reject) => {
		const epub = new EPub(epubPath)

		epub.on('error', (err) => {
			reject(err)
		})

		epub.on('end', async () => {
			try {
				const title = epub.metadata.title
				const author = epub.metadata.creator || 'Unknown Author'
				const chapters: Array<Array<string>> = []

				for (const chapter of epub.flow) {
					try {
						// Skip non-chapter items (like cover, etc)
						if (!chapter.id) continue

						const content = await new Promise<string>((resolveChapter, rejectChapter) => {
							epub.getChapter(chapter.id, (err, text) => {
								if (err) {
									rejectChapter(err)
								} else {
									resolveChapter(text)
								}
							})
						})

						const dom = new JSDOM(content)
						const document = dom.window.document

						const paragraphs = Array.from(document.querySelectorAll('p'))
							.map((p) => p.textContent?.trim())
							.filter((text) => text && text.length > 0) as string[]

						if (paragraphs.length > 0) {
							chapters.push(paragraphs)
						}
					} catch (error) {
						logger.error(`Error processing chapter ${chapter.id}:`, error)
					}
				}

				resolve({
					slug: 'change or error',
					title,
					author,
					chapters,
				})
			} catch (error) {
				reject(error)
			}
		})

		epub.parse()
	})
}

async function main() {
	if (process.argv.length < 3) {
		logger.error('Usage: pnpm tsx script.ts <path-to-epub>')
		process.exit(1)
	}

	const epubPath = process.argv[2]

	try {
		const book = await parseEpub(epubPath)
		const bookName = path.basename(epubPath, '.epub') as BookSlug
		const outputDir = path.join(process.cwd(), 'src', 'library', 'books', 'data')
		const outputPath = path.join(outputDir, `${bookName}.ts`)

		const output = `
import type { Book } from '@/types'

export const book: Book = {
  slug: ${book.slug},
  title: ${JSON.stringify(book.title)},
  author: ${JSON.stringify(book.author)},
  chapters: ${JSON.stringify(book.chapters, null, 2)}
};`

		await fs.writeFile(outputPath, output)

		logger.info(`Book data saved to ${outputPath}`)
	} catch (error) {
		logger.error('Error parsing EPUB:', error)
	}
}

main().catch(logger.error)

/* 
pnpm tsx convertEpub.ts /Users/dan/Desktop/treasure-island.epub
pnpm tsx convertEpub.ts /Users/dan/Desktop/the-tenant-of-wildfell-hall.epub
pnpm tsx convertEpub.ts /Users/dan/Desktop/cranford.epub
*/
