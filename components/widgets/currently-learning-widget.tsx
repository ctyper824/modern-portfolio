"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Zap } from "lucide-react"

const learningData = [
  { name: "Click Field Service Edge", progress: 80, icon: "📱" },
  { name: "Kubernetes", progress: 65, icon: "⚙️" },
  { name: "GraphQL", progress: 55, icon: "🔗" },
  { name: "Terraform", progress: 45, icon: "☁️" },
]

export default function CurrentlyLearningWidget() {
  return (
    <Card className="glass-morphism border-white/20 hover:border-purple-400/50 transition-all duration-300 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <BookOpen className="h-5 w-5 text-purple-400" />
          Currently Learning
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-6">
          {learningData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-white/80">{item.name}</span>
                </div>
                <span className="text-sm text-white/60">{item.progress}%</span>
              </div>
              <Progress value={item.progress} className="h-2 bg-white/10" />
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mt-8 p-4 rounded-lg bg-gradient-to-r from-purple-400/20 to-cyan-400/20 border border-white/10"
        >
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-white font-semibold">Next Up:</span>
          </div>
          <div className="text-white/80">Exploring cloud-native patterns for enterprise field service platforms</div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
