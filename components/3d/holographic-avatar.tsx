"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export default function HolographicAvatar() {
  return (
    <div className="relative w-44 h-44 mx-auto mb-8">
      {/* Holographic Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
      />

      {/* Inner Ring */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute inset-2 rounded-full border border-purple-400/40"
      />

      {/* Avatar Container */}
      <motion.div
        animate={{ y: [-5, 5, -5] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="absolute inset-3 rounded-full overflow-hidden border-2 border-white/20 shadow-lg shadow-cyan-400/20"
      >
        <Image
          src="/avatar.png"
          alt="Justin Boatman"
          fill
          sizes="176px"
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl animate-pulse" />
    </div>
  )
}
