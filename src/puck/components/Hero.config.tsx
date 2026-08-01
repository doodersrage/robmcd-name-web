import type { ComponentConfig } from '@puckeditor/core'

import { Hero } from '@/app/components/ui/Hero'

export type HeroBlockProps = {
  showStatus: 'yes' | 'no'
  statusLabel: string
  title: string
  gradientTitle: 'yes' | 'no'
  description: string
  primaryCtaLabel: string
  primaryCtaLink: string
  secondaryCtaLabel: string
  secondaryCtaLink: string
  skills: string
  imageUrl: string
  imageAlt: string
  badgeText: string
}

export const HeroConfig: ComponentConfig<HeroBlockProps> = {
  label: 'Hero',
  defaultProps: {
    showStatus: 'yes',
    statusLabel: 'Available for new projects',
    title: 'Building thoughtful web experiences',
    gradientTitle: 'yes',
    description:
      'Software developer specializing in modern web applications, from architecture to polished interfaces.',
    primaryCtaLabel: 'View Projects',
    primaryCtaLink: '/projects',
    secondaryCtaLabel: 'Get in Touch',
    secondaryCtaLink: '/contact',
    skills: 'React, TypeScript, Next.js, Tailwind CSS',
    imageUrl: '',
    imageAlt: '',
    badgeText: 'Payload CMS + Puck',
  },
  fields: {
    showStatus: {
      type: 'radio',
      label: 'Status Pill',
      options: [
        { label: 'Show', value: 'yes' },
        { label: 'Hide', value: 'no' },
      ],
    },
    statusLabel: { type: 'text', label: 'Status Label' },
    title: { type: 'text', label: 'Title' },
    gradientTitle: {
      type: 'radio',
      label: 'Gradient Title',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
      ],
    },
    description: { type: 'textarea', label: 'Description' },
    primaryCtaLabel: { type: 'text', label: 'Primary CTA Label' },
    primaryCtaLink: { type: 'text', label: 'Primary CTA Link' },
    secondaryCtaLabel: { type: 'text', label: 'Secondary CTA Label' },
    secondaryCtaLink: { type: 'text', label: 'Secondary CTA Link' },
    skills: {
      type: 'text',
      label: 'Skills (comma-separated)',
    },
    imageUrl: { type: 'text', label: 'Image URL' },
    imageAlt: { type: 'text', label: 'Image Alt Text' },
    badgeText: { type: 'text', label: 'Floating Badge (optional)' },
  },
  render: ({
    showStatus,
    statusLabel,
    title,
    gradientTitle,
    description,
    primaryCtaLabel,
    primaryCtaLink,
    secondaryCtaLabel,
    secondaryCtaLink,
    skills,
    imageUrl,
    imageAlt,
    badgeText,
  }) => (
    <Hero
      showStatus={showStatus === 'yes'}
      statusLabel={statusLabel}
      title={title}
      gradientTitle={gradientTitle === 'yes'}
      description={description}
      skills={skills ? skills.split(',').map((skill) => skill.trim()) : []}
      primaryCta={
        primaryCtaLabel && primaryCtaLink
          ? { label: primaryCtaLabel, href: primaryCtaLink }
          : null
      }
      secondaryCta={
        secondaryCtaLabel && secondaryCtaLink
          ? { label: secondaryCtaLabel, href: secondaryCtaLink }
          : null
      }
      imageUrl={imageUrl || undefined}
      imageAlt={imageAlt || undefined}
      badgeText={badgeText || undefined}
    />
  ),
}
