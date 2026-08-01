'use client'

import { motion, type Variants } from 'framer-motion'
import React from 'react'

import { cn } from '@/lib/cn'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

type MotionRevealProps = {
  children: React.ReactNode
  className?: string
  as?: 'section' | 'div'
  stagger?: boolean
}

export function MotionReveal({ children, className, as = 'section', stagger = true }: MotionRevealProps) {
  const Component = motion[as]

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={stagger ? containerVariants : itemVariants}
      className={cn(className)}
    >
      {stagger
        ? React.Children.map(children, (child) =>
            child ? (
              <motion.div key={(child as React.ReactElement).key ?? undefined} variants={itemVariants}>
                {child}
              </motion.div>
            ) : null,
          )
        : children}
    </Component>
  )
}

export function MotionItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div variants={itemVariants} className={cn(className)}>
      {children}
    </motion.div>
  )
}
