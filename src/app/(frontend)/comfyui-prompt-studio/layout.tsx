import type { Metadata } from 'next'
import React from 'react'

import { ComfyuiDocsLayout } from '@/app/components/comfyui-prompt-studio/ComfyuiDocsLayout'

export const metadata: Metadata = {
  title: 'LLM Prompt Studio — Documentation',
  description:
    'Guide to LLM Prompt Studio: ComfyUI and cloud engines, Cast, Roleplay, gallery, studio workflows, and 40+ model targets.',
}

export default function ComfyuiPromptStudioLayout({ children }: { children: React.ReactNode }) {
  return <ComfyuiDocsLayout>{children}</ComfyuiDocsLayout>
}
