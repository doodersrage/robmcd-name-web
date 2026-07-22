'use client'
import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'

type CodeBlockProps = {
  code: string
  language: string
}

export const CodeBlockComponent: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <div className="hover-lift my-6 overflow-hidden rounded-2xl border border-slate-200/80 text-sm shadow-sm dark:border-zinc-800/80">
      <div className="flex items-center justify-between border-b border-slate-200/80 bg-zinc-900/95 px-4 py-3 text-xs text-zinc-400 select-none dark:border-zinc-800/80">
        <span className="font-semibold uppercase tracking-wide">{language}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code)
          }}
          className="btn btn-secondary px-3 py-1 text-xs"
          aria-label="Copy code to clipboard"
        >
          Copy
        </button>
      </div>
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} overflow-x-auto bg-zinc-950/98 p-4`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="mr-6 inline-block w-8 text-right text-zinc-500 select-none opacity-70">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
