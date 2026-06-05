'use client'
import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'

type CodeBlockProps = {
  code: string
  language: string
}

export const CodeBlockComponent: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <div className="my-6 rounded-xl overflow-hidden text-sm shadow-lg border border-[#AEC3B0] border-opacity-20">
      <div className="bg-gradient-to-r from-[#01161E] to-[#0a0f17] text-[#AEC3B0] px-4 py-3 flex justify-between items-center text-xs select-none border-b border-[#598392] border-opacity-30">
        <span className="font-semibold uppercase tracking-wide">{language}</span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code)
          }}
          className="px-3 py-1 rounded bg-[#124559] text-[#EFF6E0] hover:bg-[#598392] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#AEC3B0] focus:ring-opacity-30"
          aria-label="Copy code to clipboard"
        >
          Copy
        </button>
      </div>
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 overflow-x-auto bg-[#01161E]`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="text-[#598392] mr-6 inline-block w-8 text-right select-none opacity-70">
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
