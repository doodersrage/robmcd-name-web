'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string
          callback?: (token: string) => void
          'expired-callback'?: () => void
          'error-callback'?: () => void
        },
      ) => string
      reset: (widgetId?: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

const MyFormComponent = ({ formId }: { formId: string }) => {
  const [cmsForm, setCmsForm] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const [turnstileReady, setTurnstileReady] = useState(false)
  const turnstileContainerRef = useRef<HTMLDivElement>(null)
  const turnstileWidgetIdRef = useRef<string | null>(null)

  const resetTurnstile = useCallback(() => {
    if (window.turnstile && turnstileWidgetIdRef.current) {
      window.turnstile.reset(turnstileWidgetIdRef.current)
    }
    setTurnstileToken(null)
  }, [])

  useEffect(() => {
    if (!turnstileSiteKey || !turnstileReady || !turnstileContainerRef.current || !window.turnstile) {
      return
    }

    if (turnstileWidgetIdRef.current) {
      window.turnstile.remove(turnstileWidgetIdRef.current)
      turnstileWidgetIdRef.current = null
    }

    turnstileWidgetIdRef.current = window.turnstile.render(turnstileContainerRef.current, {
      sitekey: turnstileSiteKey,
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken(null),
      'error-callback': () => setTurnstileToken(null),
    })

    return () => {
      if (window.turnstile && turnstileWidgetIdRef.current) {
        window.turnstile.remove(turnstileWidgetIdRef.current)
        turnstileWidgetIdRef.current = null
      }
    }
  }, [turnstileReady])

  useEffect(() => {
    const formUrl = `/api/forms/${formId}`
    fetch(formUrl)
      .then((res) => res.json())
      .then((data) => {
        setCmsForm(data)
      })
      .catch(() => setError('Error loading form'))
  }, [formId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let fileUploadedId = null

    e.preventDefault()
    setError(null)

    if (turnstileSiteKey && !turnstileToken) {
      setError('Please complete the security check')
      return
    }

    const formData = new FormData(e.currentTarget)

    const file = formData.get('file')
    if (file) {
      const formDataToSend = new FormData()
      formDataToSend.append('file', file as File)
      formDataToSend.append(
        '_payload',
        JSON.stringify({
          alt: (file as File).name,
        }),
      )
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formDataToSend,
      })
      if (!response.ok) {
        setError('Failed to upload file')
        return
      }
      const data: { doc: { id: string } } = await response.json()

      fileUploadedId = data?.doc?.id
    }

    if (file) {
      formData.delete('file')
    }

    const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
      field: name,
      value: value.toString(),
    }))

    const response = await fetch('/api/form-submissions', {
      method: 'POST',
      body: JSON.stringify({
        form: formId,
        submissionData: dataToSend,
        ...(cmsForm?.hasAttachment && fileUploadedId ? { file: fileUploadedId } : {}),
      }),
      headers: {
        'Content-Type': 'application/json',
        ...(turnstileToken ? { 'cf-turnstile-response': turnstileToken } : {}),
      },
    })

    if (response.ok) {
      setSuccess(true)
      formRef.current?.reset()
      resetTurnstile()
    } else {
      setError('Form submission failed')
      setSuccess(false)
      resetTurnstile()
    }

    fileUploadedId = null
  }

  if (!cmsForm) return <div>Loading...</div>

  if (success && cmsForm.confirmationMessage) {
    setTimeout(() => {
      setSuccess(false)
    }, 5000)
    return <RichText data={cmsForm.confirmationMessage} />
  }

  return (
    <>
      {turnstileSiteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onLoad={() => setTurnstileReady(true)}
        />
      )}
      <div style={{ padding: '2rem' }}>
        {error && (
          <p role="alert" style={{ color: '#b91c1c', marginBottom: '1rem' }}>
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} ref={formRef}>
          {cmsForm.fields.map((field: any) => (
            <div
              key={field.id}
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type={field.blockType}
                name={field.name}
                id={field.name}
                {...(field.required && { required: true })}
                style={{ width: '60%' }}
              />
            </div>
          ))}
          {cmsForm.hasAttachment && (
            <div
              style={{
                marginTop: '1rem',
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <label htmlFor="file">{cmsForm.hasAttachmentLabel || 'Attachment'}</label>
              <input
                className="inline-block rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                type="file"
                name="file"
                id="file"
              />
            </div>
          )}
          {turnstileSiteKey && <div ref={turnstileContainerRef} style={{ marginBottom: '1rem' }} />}
          <button
            className="inline-block rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            type="submit"
            disabled={Boolean(turnstileSiteKey && !turnstileToken)}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default MyFormComponent
