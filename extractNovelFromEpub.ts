import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import EPub from 'epub'
import { JSDOM as jsDom } from 'jsdom'
import logger from './src/library/logger'
import type { Chapter, Novel, NovelDisplayTitle, NovelSlug, WriterDisplayName, WriterSlug } from './src/types'

async function extractNovelFromEpub({ titleSlug }: { titleSlug: NovelSlug }): Promise<void> {
	return new Promise((resolve, reject) => {
		const epubPath = path.join(os.homedir(), 'Desktop', `${titleSlug}.epub`)
		const epub = new EPub(epubPath)

		epub.on('error', (error) => {
			reject(error)
		})

		epub.on('end', async () => {
			try {
				const chapters: Chapter[] = []

				for (const chapter of epub.flow) {
					try {
						// ToDo: Ignore standardebooks.org copyright notice chapters
						if (!chapter.id) continue // Skip frontmatter

						const content = await new Promise<string>((resolveChapter, rejectChapter) => {
							epub.getChapter(chapter.id, (error, text) => {
								if (error) {
									rejectChapter(error)
								} else {
									resolveChapter(text)
								}
							})
						})

						const dom = new jsDom(content)
						const document = dom.window.document

						const paragraphs = Array.from(document.querySelectorAll('p'))
							.map((paragraph) => paragraph.textContent?.trim())
							.filter((text) => text && text.length > 0) as string[]

						if (paragraphs.length > 0) {
							chapters.push({ content: paragraphs })
						}
					} catch (error) {
						logger.error(`Error processing chapter ${chapter.id}:`, error)
					}
				}

				const novel: Novel = {
					writerDisplay,
					writerSlug,
					titleDisplay,
					titleSlug,
					chapters,
				}

				const outputPath = path.join(process.cwd(), 'src', 'library', 'data', 'novels', `${titleSlug}.ts`)

				const existingFile = await fs
					.stat(outputPath)
					.then(() => true)
					.catch(() => false)

				if (existingFile) {
					logger.error('File already exists: ', outputPath)
					return resolve()
				}

				const output = `import type { Novel } from '@/types'
		
		export const novel: Novel = {
		  titleDisplay: ${JSON.stringify(novel.titleDisplay)},
		  titleSlug: ${JSON.stringify(novel.titleSlug)},
		  writerDisplay: ${JSON.stringify(novel.writerDisplay)},
		  writerSlug: ${JSON.stringify(novel.writerSlug)},
		  chapters: ${JSON.stringify(novel.chapters, null, 2)}
		};`

				await fs.writeFile(outputPath, output)
				logger.info(`Novel data saved to ${outputPath}`)

				resolve()
			} catch (error) {
				reject(error)
			}
		})

		epub.parse()
	})
}

const titleDisplay: NovelDisplayTitle = 'Clarissa'
const titleSlug: NovelSlug = 'clarissa'
const writerDisplay: WriterDisplayName = 'Samuel Richardson'
const writerSlug: WriterSlug = 'samuel-richardson'
;(async () => {
	try {
		await extractNovelFromEpub({ titleSlug })
	} catch (error) {
		logger.error('Error extracting novel from epub: ', error instanceof Error ? error.message : error)
	}
})()

/* 
pnpm tsx extractNovelFromEpub
*/
