import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'LLM Prompt Studio — model-aware prompts for ComfyUI and cloud engines'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '72px',
          background: 'linear-gradient(145deg, #09090b 0%, #18181b 50%, #0f172a 100%)',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 22, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Open source · robmcd.name
        </div>
        <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: '-0.03em', marginTop: 20, maxWidth: 980 }}>
          LLM Prompt Studio
        </div>
        <div style={{ fontSize: 28, lineHeight: 1.45, color: '#cbd5e1', marginTop: 24, maxWidth: 900 }}>
          Model-aware prompts for image, video, audio & 3D — ComfyUI, Cast, Roleplay, and cloud engines.
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 40, fontSize: 22, color: '#a1a1aa' }}>
          <span>28+ tools</span>
          <span>·</span>
          <span>40+ models</span>
          <span>·</span>
          <span>MIT</span>
        </div>
      </div>
    ),
    size,
  )
}
