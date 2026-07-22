import { ImageResponse } from 'next/og'

import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '@/lib/site'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`

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
          background: 'linear-gradient(145deg, #09090b 0%, #18181b 45%, #1e1b4b 100%)',
          color: '#fafafa',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            marginBottom: '36px',
          }}
        >
          <div
            style={{
              width: 88,
              height: 88,
              borderRadius: 22,
              background: '#27272a',
              border: '1px solid rgba(255,255,255,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 42,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: '-0.03em' }}>{SITE_NAME}</div>
            <div style={{ fontSize: 28, color: '#a1a1aa' }}>{SITE_TAGLINE}</div>
          </div>
        </div>
        <div style={{ fontSize: 30, lineHeight: 1.5, color: '#d4d4d8', maxWidth: 900 }}>{SITE_DESCRIPTION}</div>
      </div>
    ),
    size,
  )
}
