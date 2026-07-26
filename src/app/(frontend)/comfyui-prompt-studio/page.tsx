export const dynamic = 'force-dynamic'

import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ComfyUI Prompt Studio - AI Prompt Engineering Tool',
  description:
    'A powerful Next.js app that turns topics or keywords into model-specific prompts for image, 3D, video, and audio workflows in ComfyUI.',
  keywords: [
    'ComfyUI',
    'Prompt Studio',
    'AI prompts',
    'Stable Diffusion',
    'FLUX',
    'image generation',
    'prompt engineering',
  ],
}

export default function ComfyUIPromptStudioPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            ComfyUI Prompt Studio
          </h1>
          <p className="text-xl sm:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Transform your creative vision into stunning AI-generated content with intelligent
            prompt engineering for image, 3D, video, and audio models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/doodersrage/comfyui-prompt-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              View Source Code
            </Link>
            {/* {<Link 
              href="http://localhost:47832/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors"
            >
              Try Live Demo
            </Link>*/}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Powerful Features for AI Creators
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
                <div className="text-blue-600 dark:text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Comprehensive Toolset
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="text-center p-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg mb-3">
                  <span className="text-2xl">{tool.emoji}</span>
                </div>
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Case Study: Streamlining AI Art Workflows
          </h2>
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                The Challenge
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Digital artists and AI enthusiasts often struggle with crafting effective prompts
                for different AI models. Each model architecture requires specific prompt formats,
                token limits, and structural considerations. Manual prompt engineering is
                time-consuming and inconsistent across different ComfyUI workflows.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                The Solution
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                ComfyUI Prompt Studio automates prompt engineering with intelligent model-specific
                formatting. The app supports 40+ ComfyUI image model targets, organized by
                architecture family. Users can simply input topics or keywords, and the system
                generates optimized prompts tailored to their selected model.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Key Results
              </h3>
              <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                {results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-3 mt-1">✓</span>
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                Technical Highlights
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                    <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {highlight.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Support */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Extensive Model Support
          </h2>
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8">
            <p className="text-lg text-slate-600 dark:text-slate-300 text-center mb-8">
              The app includes 40+ ComfyUI image model targets, grouped by architecture family
              including:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {modelFamilies.map((family, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {family}
                </span>
              ))}
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-center mt-6 text-sm">
              Plus dedicated tools for Audio (/audio), 3D Mesh (/mesh), and Video (/video)
              generation
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your AI Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get started with ComfyUI Prompt Studio and experience the future of AI prompt
            engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://github.com/doodersrage/comfyui-prompt-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-blue-600 bg-white hover:bg-slate-100 rounded-lg transition-colors"
            >
              Get Started on GitHub
            </Link>
            <Link
              href="http://localhost:47832/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white border-2 border-white hover:bg-white/10 rounded-lg transition-colors"
            >
              Try the Demo
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: '🎯',
    title: 'Model-Specific Prompts',
    description:
      'Automatically formats prompts for 40+ ComfyUI image models, ensuring optimal results for each architecture.',
  },
  {
    icon: '⚡',
    title: 'LLM-Powered Generation',
    description:
      'Leverages AI to generate intelligent prompts from simple topics or keywords with rules-based fallback.',
  },
  {
    icon: '🔧',
    title: 'Workspace Modes',
    description:
      'Choose between Simple, Studio, or Full modes to match your experience level and workflow needs.',
  },
  {
    icon: '📊',
    title: 'Profile-Based Styles',
    description:
      'Create and share prompt styles across related checkpoints for consistent artistic output.',
  },
  {
    icon: '🎨',
    title: 'Character Generator',
    description:
      'Build detailed character prompts with solo, duo/sport, and compose-with-background modes.',
  },
  {
    icon: '💾',
    title: 'Persistent Storage',
    description:
      'All settings, history, presets, and gallery entries persist in IndexedDB with automatic migration.',
  },
]

const tools = [
  { emoji: '🖼️', name: 'Image Prompt', description: 'Generate optimized prompts for still images' },
  { emoji: '🎭', name: 'Character', description: 'Create detailed character prompts' },
  { emoji: '🎵', name: 'Audio', description: 'Generate audio content prompts' },
  { emoji: '🎬', name: 'Video', description: 'Video generation with WAN/Hunyuan' },
  { emoji: '🧊', name: '3D Mesh', description: '3D model generation workflows' },
  { emoji: '🖌️', name: 'Inpaint', description: 'Image editing and inpainting' },
  { emoji: '📐', name: 'Compose', description: 'Multi-image scene composition' },
  { emoji: '🔍', name: 'Studio', description: 'Advanced prompt management' },
]

const results = [
  'Reduced prompt engineering time by 70% through automated formatting',
  'Improved consistency across different AI model architectures',
  'Enabled batch processing of multiple prompts with Topics tool',
  'Streamlined workflow with direct ComfyUI queue integration',
  'Enhanced creative exploration with variation grid and gallery features',
]

const highlights = [
  {
    title: 'Intelligent Formatting',
    description:
      'Automatically adapts prompts to model-specific token limits and architectural requirements.',
  },
  {
    title: 'Workflow Integration',
    description: 'Direct ComfyUI queue integration with job status polling and gallery display.',
  },
  {
    title: 'Quality Profiles',
    description: 'Pre-configured Draft/Final/Max profiles for consistent output quality.',
  },
  {
    title: 'Prompt Diagnostics',
    description: 'Built-in linting to identify and fix prompt conflicts before generation.',
  },
]

const modelFamilies = [
  'Stable Diffusion',
  'FLUX',
  'Image-2.0',
  'SDXL',
  'Kandinsky',
  'WAN',
  'Hunyuan',
  'Qwen',
  'and 30+ more',
]
