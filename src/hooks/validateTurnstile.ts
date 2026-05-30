import type { CollectionBeforeChangeHook } from 'payload'
import { APIError } from 'payload'

import { verifyTurnstile } from '@/utilities/verifyTurnstile'

const turnstileEnabled = Boolean(process.env.TURNSTILE_SECRET_KEY)

export const validateTurnstile: CollectionBeforeChangeHook = async ({ req }) => {
  if (!turnstileEnabled) {
    return
  }

  const token = req.headers.get('cf-turnstile-response')
  if (!token) {
    throw new APIError('Turnstile verification required', 403)
  }

  const remoteip =
    req.headers.get('cf-connecting-ip') ??
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    null

  const valid = await verifyTurnstile(token, remoteip)
  if (!valid) {
    throw new APIError('Turnstile verification failed', 403)
  }
}
