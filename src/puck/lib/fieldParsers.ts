export type ParsedStat = { value: string; label: string; detail?: string }
export type ParsedBentoItem = {
  span: 'default' | 'wide' | 'tall'
  icon: string
  title: string
  description: string
}
export type ParsedTestimonial = {
  name: string
  role: string
  rating: number
  quote: string
  avatarUrl?: string
}

/** One stat per line: value|label|detail (detail optional) */
export function parseStats(raw: string): ParsedStat[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [value = '', label = '', detail] = line.split('|').map((s) => s.trim())
      return { value, label, detail: detail || undefined }
    })
    .filter((s) => s.value && s.label)
}

/** One item per line: span|icon|title|description — span: default|wide|tall, icon: lucide name */
export function parseBentoItems(raw: string): ParsedBentoItem[] {
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [spanRaw = 'default', icon = 'Sparkles', title = '', description = ''] = line
        .split('|')
        .map((s) => s.trim())
      const span = (['wide', 'tall'].includes(spanRaw) ? spanRaw : 'default') as ParsedBentoItem['span']
      return { span, icon, title, description }
    })
    .filter((item) => item.title)
}

/** One testimonial per block (separated by ---) or line: name|role|rating|quote|avatarUrl */
export function parseTestimonials(raw: string): ParsedTestimonial[] {
  const blocks = raw.includes('---') ? raw.split('---') : raw.split('\n').filter(Boolean)

  return blocks
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      const [name = '', role = '', ratingRaw = '5', quote = '', avatarUrl = ''] = block
        .split('|')
        .map((s) => s.trim())
      const rating = Math.min(5, Math.max(1, Number.parseInt(ratingRaw, 10) || 5))
      return {
        name,
        role,
        rating,
        quote,
        avatarUrl: avatarUrl || undefined,
      }
    })
    .filter((t) => t.name && t.quote)
}
