import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { dirname, resolve } from 'path'
import postcss from 'postcss'
import tailwindcss from '@tailwindcss/postcss'

const cssInput = 'src/app/(frontend)/globals.scss'
const cssOutput = 'public/puck-editor-styles.css'

const inputPath = resolve(process.cwd(), cssInput)
const outputPath = resolve(process.cwd(), cssOutput)

if (!existsSync(inputPath)) {
  console.error(`[build-puck-css] Source file not found: ${inputPath}`)
  process.exit(1)
}

const rawCss = readFileSync(inputPath, 'utf-8')
const result = await postcss([tailwindcss()]).process(rawCss, { from: inputPath })

const outputDir = dirname(outputPath)
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true })
}

writeFileSync(outputPath, result.css, 'utf-8')
console.log(`[build-puck-css] ${cssInput} -> ${cssOutput} (${(result.css.length / 1024).toFixed(1)}KB)`)
