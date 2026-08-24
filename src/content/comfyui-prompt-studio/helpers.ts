import type { DocBlock, DocPage, DocSection } from './types'

export const GH = 'https://github.com/doodersrage/llm-prompt-studio'
export const LIVE = 'http://localhost:47832'
export const DOCS = `${GH}/tree/main/docs`
export const DOCS_SITE = 'https://doodersrage.github.io/llm-prompt-studio'
export const RELEASES = `${GH}/releases`
export const DOCKER_IMAGE = 'ghcr.io/doodersrage/llm-prompt-studio:latest'
export const DOCS_BASE_PATH = '/llm-prompt-studio'
/** Legacy path — still routed; prefer DOCS_BASE_PATH in new links */
export const LEGACY_DOCS_BASE_PATH = '/comfyui-prompt-studio'
export const CPS_GITHUB = GH
export const CPS_LIVE = LIVE

const SECTION_ORDER = [
  'Hub',
  'Sales & stories',
  'Introduction',
  'Getting started',
  'Generate',
  'Format & lint',
  'Character',
  'Play',
  'Image tools',
  'Media',
  'Studio',
  'Gallery',
  'Models',
  'Integration',
]

let docPagesRef: DocPage[] = []

function sectionIndex(section: string): number {
  const i = SECTION_ORDER.indexOf(section)
  return i === -1 ? 999 : i
}

export function setDocPages(pages: DocPage[]): void {
  docPagesRef = pages
}

export function p(...text: string[]): DocBlock[] {
  return text.map((t) => ({ type: 'p' as const, text: t }))
}

export function page(
  slug: string[],
  title: string,
  description: string,
  section: string,
  order: number,
  blocks: DocBlock[],
  extras?: Pick<DocPage, 'interactive' | 'related' | 'layout'>,
): DocPage {
  return { slug, title, description, section, order, blocks, ...extras }
}

export function slugToPath(slug: string[]): string {
  if (slug.length === 0) return DOCS_BASE_PATH
  return `${DOCS_BASE_PATH}/${slug.join('/')}`
}

export function slugKey(slug: string[]): string {
  return slug.join('/') || 'index'
}

export function getPageBySlug(slug: string[] | undefined): DocPage | undefined {
  const key = slugKey(slug ?? [])
  return docPagesRef.find((p) => slugKey(p.slug) === key)
}

export function getAllPages(): DocPage[] {
  return [...docPagesRef].sort((a, b) => {
    const bySection = sectionIndex(a.section) - sectionIndex(b.section)
    if (bySection !== 0) return bySection
    return a.order - b.order
  })
}

export function getSections(): DocSection[] {
  const map = new Map<string, DocPage[]>()
  for (const doc of getAllPages()) {
    const list = map.get(doc.section) ?? []
    list.push(doc)
    map.set(doc.section, list)
  }
  const entries = Array.from(map.entries()).map(([title, pages]) => ({
    id: title.toLowerCase().replace(/\s+/g, '-'),
    title,
    pages: pages.sort((a, b) => a.order - b.order),
  }))
  return entries.sort((a, b) => {
    const ai = SECTION_ORDER.indexOf(a.title)
    const bi = SECTION_ORDER.indexOf(b.title)
    if (ai === -1 && bi === -1) return a.title.localeCompare(b.title)
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}
