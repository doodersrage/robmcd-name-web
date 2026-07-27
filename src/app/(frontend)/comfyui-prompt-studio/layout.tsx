import type { Metadata } from 'next'
import React from 'react'

import { ComfyuiDocsLayout } from '@/app/components/comfyui-prompt-studio/ComfyuiDocsLayout'

export const metadata: Metadata = {
  title: 'ComfyUI Prompt Studio — Documentation',
  description:
    '50-page guide to ComfyUI Prompt Studio: tools, gallery, studio workflows, models, and ComfyUI integration.',
}

export default function ComfyuiPromptStudioLayout({ children }: { children: React.ReactNode }) {
  return <ComfyuiDocsLayout>{children}</ComfyuiDocsLayout>
}
