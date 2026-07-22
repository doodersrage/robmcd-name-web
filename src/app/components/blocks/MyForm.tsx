'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { Form } from '@/payload-types'

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
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormField = NonNullable<Form['fields']>[number]
type FieldErrors = Record<string, string>
type CmsForm = Form & {
  hasAttachment?: boolean | null
  hasAttachmentLabel?: string | null
}

function getFieldLabel(field: FormField): string {
  if (field.blockType === 'message') {
    return 'Message'
  }

  return field.label || field.name
}

function getFieldValue(formData: FormData, field: FormField): string {
  if (field.blockType === 'message') {
    return ''
  }

  if (field.blockType === 'checkbox') {
    return formData.get(field.name) === 'true' ? 'true' : ''
  }

  const value = formData.get(field.name)
  return typeof value === 'string' ? value : (value?.toString() ?? '')
}

function validateField(field: FormField, value: string): string | null {
  if (field.blockType === 'message') {
    return null
  }

  const label = getFieldLabel(field)
  const trimmed = value.trim()
  const required = Boolean(field.required)

  if (field.blockType === 'checkbox') {
    if (required && value !== 'true') {
      return `${label} is required`
    }
    return null
  }

  if (required && !trimmed) {
    return `${label} is required`
  }

  if (!trimmed) {
    return null
  }

  switch (field.blockType) {
    case 'email':
      if (!EMAIL_PATTERN.test(trimmed)) {
        return 'Please enter a valid email address'
      }
      break
    case 'number':
      if (Number.isNaN(Number(trimmed))) {
        return 'Please enter a valid number'
      }
      break
    case 'select':
      if (field.options?.length && !field.options.some((option) => option.value === trimmed)) {
        return `Please select a valid ${label.toLowerCase()}`
      }
      break
    default:
      break
  }

  return null
}

function validateFormFields(
  fields: FormField[] | null | undefined,
  formData: FormData,
): FieldErrors {
  const errors: FieldErrors = {}

  for (const field of fields ?? []) {
    if (field.blockType === 'message') {
      continue
    }

    const error = validateField(field, getFieldValue(formData, field))
    if (error) {
      errors[field.name] = error
    }
  }

  return errors
}

const inputClassName = 'input-field w-full md:max-w-md'
const inputErrorClassName = 'input-field input-field--error w-full md:max-w-md'

const MyForm = ({ formId }: { formId: string }) => {
  const [cmsForm, setCmsForm] = useState<CmsForm | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
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

  const clearFieldError = useCallback((fieldName: string) => {
    setFieldErrors((current) => {
      if (!current[fieldName]) {
        return current
      }

      const next = { ...current }
      delete next[fieldName]
      return next
    })
  }, [])

  const validateSingleField = useCallback((field: FormField) => {
    if (!formRef.current || field.blockType === 'message') {
      return
    }

    const formData = new FormData(formRef.current)
    const fieldError = validateField(field, getFieldValue(formData, field))

    setFieldErrors((current) => {
      if (!fieldError) {
        if (!current[field.name]) {
          return current
        }

        const next = { ...current }
        delete next[field.name]
        return next
      }

      return { ...current, [field.name]: fieldError }
    })
  }, [])

  useEffect(() => {
    if (
      !turnstileSiteKey ||
      !turnstileReady ||
      !turnstileContainerRef.current ||
      !window.turnstile
    ) {
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
        setCmsForm(data as CmsForm)
      })
      .catch(() => setError('Error loading form'))
  }, [formId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let fileUploadedId = null

    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const validationErrors = validateFormFields(cmsForm?.fields, formData)

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors)
      setError('Please fix the errors below before submitting')
      return
    }

    setFieldErrors({})

    if (turnstileSiteKey && !turnstileToken) {
      setError('Please complete the security check')
      return
    }

    const file = formData.get('file')
    if (file instanceof File && file.size > 0) {
      const formDataToSend = new FormData()
      formDataToSend.append('file', file)
      formDataToSend.append(
        '_payload',
        JSON.stringify({
          alt: file.name,
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

  const renderField = (field: FormField) => {
    if (field.blockType === 'message') {
      return field.message ? <RichText data={field.message} /> : null
    }

    const fieldId = field.name
    const errorId = `${fieldId}-error`
    const hasError = Boolean(fieldErrors[field.name])
    const commonProps = {
      id: fieldId,
      name: field.name,
      'aria-invalid': hasError,
      'aria-describedby': hasError ? errorId : undefined,
      onBlur: () => validateSingleField(field),
      onChange: () => clearFieldError(field.name),
      className: hasError ? inputErrorClassName : inputClassName,
      style: { width: '60%' },
    }

    switch (field.blockType) {
      case 'textarea':
        return (
          <textarea
            {...commonProps}
            defaultValue={field.defaultValue ?? undefined}
            placeholder={undefined}
            rows={4}
          />
        )
      case 'select':
        return (
          <select {...commonProps} defaultValue={field.defaultValue ?? ''}>
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option.id ?? option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'checkbox':
        return (
          <input
            {...commonProps}
            type="checkbox"
            value="true"
            defaultChecked={Boolean(field.defaultValue)}
            style={{ width: 'auto' }}
          />
        )
      case 'number':
        return (
          <input {...commonProps} type="number" defaultValue={field.defaultValue ?? undefined} />
        )
      case 'email':
        return <input {...commonProps} type="email" autoComplete="email" />
      default:
        return (
          <input
            {...commonProps}
            type="text"
            defaultValue={
              'defaultValue' in field && typeof field.defaultValue === 'string'
                ? field.defaultValue
                : undefined
            }
            placeholder={
              'placeholder' in field && typeof field.placeholder === 'string'
                ? field.placeholder
                : undefined
            }
          />
        )
    }
  }

  if (!cmsForm) return <div className="text-base text-slate-600 dark:text-zinc-400">Loading...</div>

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
      <div>
        {error && (
          <p role="alert" className="form-error mb-6">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} ref={formRef} noValidate className="space-y-6">
          {cmsForm.fields?.map((field) => {
            if (field.blockType === 'message') {
              return (
                <div
                  key={field.id ?? field.blockName ?? 'message'}
                  className="prose-site prose-sm mb-6 max-w-none"
                >
                  {renderField(field)}
                </div>
              )
            }

            return (
              <div key={field.id ?? field.name} className="flex flex-col gap-2">
                <label className="form-label" htmlFor={field.name}>
                  {getFieldLabel(field)}
                  {field.required ? <span className="text-red-500"> *</span> : ''}
                </label>
                <div style={{ width: '100%' }}>{renderField(field)}</div>
                {fieldErrors[field.name] && (
                  <p
                    id={`${field.name}-error`}
                    role="alert"
                    className="form-field-error"
                  >
                    {fieldErrors[field.name]}
                  </p>
                )}
              </div>
            )
          })}
          {cmsForm.hasAttachment && (
            <div className="flex flex-col gap-2">
              <label htmlFor="file" className="form-label">
                {cmsForm.hasAttachmentLabel || 'Attachment'}
              </label>
              <input className="input-field w-full file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-accent-hover" type="file" name="file" id="file" />
            </div>
          )}
          {turnstileSiteKey && <div ref={turnstileContainerRef} className="mb-6" />}
          <button
            className="group btn btn-primary mt-8 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={Boolean(turnstileSiteKey && !turnstileToken)}
          >
            {cmsForm.submitButtonLabel || 'Submit'}
          </button>
        </form>
      </div>
    </>
  )
}

export default MyForm
