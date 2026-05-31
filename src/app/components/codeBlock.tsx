import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'

type CodeBlockProps = {
  code: string
  language: string
}

export const CodeBlockComponent: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <div className="my-6 rounded-lg overflow-hidden text-sm">
      <div className="bg-neutral-800 text-neutral-400 px-4 py-1.5 flex justify-between text-xs select-none">
        <span>{language}</span>
      </div>
      <Highlight theme={themes.vsDark} code={code} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={`${className} p-4 overflow-x-auto`} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="text-neutral-500 mr-4 inline-block w-4 text-right select-none">
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
