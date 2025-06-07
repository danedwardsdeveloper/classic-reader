import type { Thing, WithContext } from 'schema-dts'

interface StructuredDataProps {
	data: WithContext<Thing>
}

export default function StructuredData({ data }: StructuredDataProps) {
	return (
		<script
			type="application/ld+json"
			// biome-ignore lint/security/noDangerouslySetInnerHtml: <build-time only>
			dangerouslySetInnerHTML={{
				__html: JSON.stringify(data),
			}}
		/>
	)
}
