'use client'
import React from 'react'

type RawHtmlBlockProps = {
  html: string
}

export const RawHtmlBlockComponent: React.FC<RawHtmlBlockProps> = ({ html }) => {
  return (
    <div
      className="raw-html-block"
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
