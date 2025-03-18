import { generateStaticParams as chapterParams } from '@/app/writers/[writer]/novels/[novel]/[chapter]/page'
import { generateStaticParams as novelParams } from '@/app/writers/[writer]/novels/[novel]/page'
import { generateStaticParams as writerParams } from '@/app/writers/[writer]/page'

import logger from '@/library/logger'

async function logParams<T>(name: string, paramsFunction: () => Promise<T[]>) {
	const staticParams = await paramsFunction()
	logger.info(name, staticParams)
}

async function runTests() {
	await logParams('Novel params', novelParams)
	await logParams('Chapter params', chapterParams)
	await logParams('Writer params', writerParams)
}

runTests().catch((error) => {
	logger.error('Error while logging static params:', error)
})

/* 
pnpm tsx paramsTest
*/
