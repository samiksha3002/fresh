"use client"

import { motion } from "framer-motion"
import React from "react"

type RevealSectionProps = {
  children: React.ReactNode
  className?: string
}

const RevealSection = ({
  children,
  className = "",
}: RevealSectionProps) => {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 45,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  )
}

export default RevealSection