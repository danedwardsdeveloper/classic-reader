import type { writers } from '@/library/constants'

export type WriterSlug = keyof typeof writers
export type WriterDisplayName = (typeof writers)[WriterSlug]
