import type { LogLevel } from '@/types'

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

export const customBareDomain = 'classicreader.org'
export const productionBaseURL = `https://${customBareDomain}`
export const developmentBaseURL = 'http://localhost:3000'
export const dynamicBaseURL = isProduction ? productionBaseURL : developmentBaseURL

export const serverLogLevel: LogLevel = 'level5debug'
export const browserLogLevel: LogLevel = isDevelopment ? 'level5debug' : 'level0none'

export const metaTitleTemplate = 'ClassicReader.org - Read classic novels online.'
export const _metadataExtensionPhrases = [
	'ClassicReader.org.',
	'ClassicReader.org - Read classic novels online.',
	'Read classic novels online for free at ClassicReader.org.',
	'ClassicReader.org lets you read classic novels in the browser with no ads, clutter, or distractions.',
]
