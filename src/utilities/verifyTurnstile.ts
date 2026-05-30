type TurnstileVerifyResponse = {
  success: boolean
  'error-codes'?: string[]
}

export async function verifyTurnstile(
  token: string,
  remoteip?: string | null,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) {
    return false
  }

  const body = new URLSearchParams({
    secret,
    response: token,
  })

  if (remoteip) {
    body.set('remoteip', remoteip)
  }

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
  })

  if (!response.ok) {
    return false
  }

  const data = (await response.json()) as TurnstileVerifyResponse
  return data.success === true
}
