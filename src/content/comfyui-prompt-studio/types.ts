export type DocInteractive =
  | 'workspace-modes'
  | 'model-families'
  | 'quality-profiles'
  | 'workflow-pipeline'
  | 'prompt-detail'
  | 'tool-routes'
  | 'gallery-review'
  | 'api-endpoint'
  | 'sales-pitch'
  | 'case-study'

export type DocBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'callout'; variant: 'info' | 'tip' | 'warn'; title?: string; text: string }
  | { type: 'code'; code: string }
  | { type: 'links'; items: { label: string; href: string; external?: boolean }[] }
  | { type: 'stats'; items: { value: string; label: string; detail?: string }[] }
  | { type: 'quote'; text: string; attribution: string; role?: string }
  | { type: 'comparison'; before: string[]; after: string[] }
  | { type: 'timeline'; items: { phase: string; title: string; body: string }[] }
  | { type: 'interactive-slot' }

export type DocPage = {
  slug: string[]
  title: string
  description: string
  section: string
  order: number
  layout?: 'default' | 'marketing'
  interactive?: DocInteractive
  blocks: DocBlock[]
  related?: string[]
}

export type DocSection = {
  id: string
  title: string
  pages: DocPage[]
}
