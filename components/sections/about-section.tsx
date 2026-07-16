"use client"
import { motion } from "framer-motion"
import InteractiveTimeline from "@/components/interactive-timeline"
import CurrentlyLearningWidget from "@/components/widgets/currently-learning-widget"

export default function AboutSection() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 liquid-gradient font-sora">About Me</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Results-driven software engineer with over 13 years of experience in the IT industry, specializing in field
            service management solutions. Demonstrated expertise in designing and developing scalable applications using
            Click Software solutions, including ClickSchedule, ClickMobile, and ClickOptimize. Proficient in integrating
            enterprise systems such as ERP and CRM with field service applications. Strong background in Java,
            JavaScript, SQL Server, and Oracle — passionate about leveraging technology to optimize business processes
            and enhance operational efficiency.
          </p>
          <p className="text-lg text-white/60 max-w-3xl mx-auto mt-4">
            Bachelor of Science in Computer Science
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-16"
        >
          <InteractiveTimeline />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="w-full"
        >
          <CurrentlyLearningWidget />
        </motion.div>
      </div>
    </section>
  )
}
