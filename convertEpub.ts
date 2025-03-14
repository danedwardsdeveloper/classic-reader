import fs from 'node:fs/promises'
import path from 'node:path'
import EPub from 'epub'
import { JSDOM } from 'jsdom'
import logger from './src/library/logger'
import type { Novel, NovelSlug } from './src/types'

function parseEpub(epubPath: string): Promise<Novel> {
	logger.info('Parsing epub...')
	return new Promise((resolve, reject) => {
		const epub = new EPub(epubPath)

		epub.on('error', (err) => {
			reject(err)
		})

		epub.on('end', async () => {
			try {
				const title = epub.metadata.title
				const writer = epub.metadata.creator || 'Unknown writer'
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
					writer,
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
		const novel = await parseEpub(epubPath)
		const novelName = path.basename(epubPath, '.epub') as NovelSlug
		const outputDir = path.join(process.cwd(), 'src', 'library', 'data', 'novels')
		const outputPath = path.join(outputDir, `${novelName}.ts`)

		const output = `
import type { Novel } from '@/types'

export const novel: Novel = {
  slug: ${novel.slug},
  title: ${JSON.stringify(novel.title)},
  writer: ${JSON.stringify(novel.writer)},
  chapters: ${JSON.stringify(novel.chapters, null, 2)}
};`

		await fs.writeFile(outputPath, output)

		logger.info(`Novel data saved to ${outputPath}`)
	} catch (error) {
		logger.error('Error parsing EPUB:', error)
	}
}

main().catch(logger.error)

/* 
pnpm tsx convertEpub.ts /Users/dan/Desktop/fanny-hill.epub
*/
