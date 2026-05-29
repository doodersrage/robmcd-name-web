'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'
import { useEffect, useRef } from 'react'

import { useState } from 'react'

const MyFormComponent = ({ formId }: { formId: string }) => {
  const [cmsForm, setCmsForm] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [success, setSuccess] = useState<boolean>(false)

  // 1) get the form from payload
  useEffect(() => {
    // Fetch the form configuration
    const formUrl = `/api/forms/${formId}`
    console.log('Fetching form from:', formUrl)
    fetch(formUrl)
      .then((res) => res.json())
      .then((data) => {
        setCmsForm(data)
        console.log('cmsForm', data)
      })
      .catch((err) => setError('Error loading form'))
  }, [formId])

  // 2) render the form based on field types

  // handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    let fileUploadedId = null

    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    // get the file from the form data, if it exists
    const file = formData.get('file')
    if (file) {
      console.log('file', file)
      // upload the file to payload
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
      console.log('response', response)
      if (!response.ok) {
        throw new Error('Failed to upload file')
      }
      const data: { doc: { id: string } } = await response.json()
      // console.log('data', data)
      // debugger

      fileUploadedId = data?.doc?.id
      // add the file id to the form data
    }

    // delete the file from the form data, so it's not sent to payload,
    // because it's already uploaded
    if (file) {
      formData.delete('file')
    }

    // convert the form data to a json object, for fields that are not files
    const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
      field: name,
      value: value.toString(),
    }))

    // send the form data to payload
    const response = await fetch('/api/form-submissions', {
      method: 'POST',
      body: JSON.stringify({
        form: formId,
        submissionData: dataToSend,
        ...(cmsForm?.hasAttachment && fileUploadedId ? { file: fileUploadedId } : {}),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('response', response)
    if (response.ok) {
      setSuccess(true)
    } else {
      setError('Form submission failed')
      setSuccess(false)
    }

    // reset the form
    formRef.current?.reset()
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
    <div style={{ padding: '2rem' }}>
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
        <button
          className="inline-block rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default MyFormComponent
