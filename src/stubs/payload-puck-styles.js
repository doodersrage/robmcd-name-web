/**
 * Stub for @delmaredigital/payload-puck's runtime CSS endpoint.
 * The real handler imports PostCSS/Tailwind native binaries that cannot
 * be bundled for Cloudflare Workers. We pre-compile CSS to public/ instead.
 */
export function createStylesHandler() {
  return async () =>
    new Response('/* Puck editor styles are served from /puck-editor-styles.css */', {
      status: 404,
      headers: { 'Content-Type': 'text/css' },
    })
}

export const PUCK_STYLES_ENDPOINT = '/api/puck/styles'
