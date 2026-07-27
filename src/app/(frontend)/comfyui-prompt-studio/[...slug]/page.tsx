import type { Metadata } from 'next'
import React from 'react'

import { buildDocMetadata, renderDocPage, requireDocPage } from '../_shared/renderDocPage'

type PageProps = {
  params: Promise<{ slug: string[] }>
}

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  return buildDocMetadata(requireDocPage(slug))
}

export default async function ComfyuiPromptStudioDocPage({ params }: PageProps) {
  const { slug } = await params
  return renderDocPage(requireDocPage(slug))
}
