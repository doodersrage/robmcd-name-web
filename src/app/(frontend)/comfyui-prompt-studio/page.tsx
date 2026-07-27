import type { Metadata } from 'next'
import React from 'react'

import { buildDocMetadata, renderDocPage, requireDocPage } from './_shared/renderDocPage'

export const dynamic = 'force-dynamic'

export function generateMetadata(): Metadata {
  return buildDocMetadata(requireDocPage([]))
}

export default function ComfyuiPromptStudioHubPage() {
  return renderDocPage(requireDocPage([]))
}
