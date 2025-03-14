import type { writerDetails } from '@/library/constants'

export type WriterSlug = keyof typeof writerDetails
export type WriterDisplayName = (typeof writerDetails)[WriterSlug]
