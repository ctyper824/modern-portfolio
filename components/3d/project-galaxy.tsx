"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Text } from "@react-three/drei"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { Card, CardContent } from "@/components/ui/card"

const projectsData = [
  {
    id: 1,
    name: "AI Chat Platform",
    category: "ai",
    position: [2, 1, 0],
    color: "#00ffff",
    description: "Real-time AI-powered chat application with natural language processing.",
    technologies: ["React", "Node.js", "OpenAI", "WebSocket"],
  },
  {
    id: 2,
    name: "E-commerce Platform",
    category: "frontend",
    position: [-2, -1, 1],
    color: "#ff00ff",
    description: "Modern e-commerce platform with advanced filtering and payment integration.",
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
  },
  {
    id: 3,
    name: "API Gateway",
    category: "backend",
    position: [0, 2, -2],
    color: "#ffff00",
    description: "Scalable API gateway with rate limiting, authentication, and monitoring.",
    technologies: ["Node.js", "Redis", "Docker", "AWS"],
  },
  {
    id: 4,
    name: "Open Source UI Library",
    category: "opensource",
    position: [-1, 0, 2],
    color: "#00ff00",
    description: "Comprehensive React component library with TypeScript support.",
    technologies: ["React", "TypeScript", "Storybook", "Rollup"],
  },
]

function ProjectPlanet({ project, onClick, isSelected }: any) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <group position={project.position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          document.body.style.cursor = "pointer"
        }}
        onPointerOut={() => {
          document.body.style.cursor = "auto"
        }}
      >
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={project.color}
          emissive={project.color}
          emissiveIntensity={isSelected ? 0.2 : 0.05}
          transparent
          opacity={0.7}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.6, 16]} />
        <meshBasicMaterial color={project.color} transparent opacity={0.2} />
      </mesh>

      <Text position={[0, -0.8, 0]} fontSize={0.15} color="white" anchorX="center" anchorY="middle">
        {project.name}
      </Text>
    </group>
  )
}

function FallbackProjectGrid({ projects, onProjectClick }: any) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project: any) => (
        <motion.div
          key={project.id}
          whileHover={{ scale: 1.05 }}
          onClick={() => onProjectClick(project)}
          className="cursor-pointer"
        >
          <Card className="glass-morphism border-white/20 hover:border-cyan-400/50 transition-all duration-300">
            <CardContent className="p-4">
              <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
              <p className="text-white/70 text-sm line-clamp-2">{project.description}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

interface ProjectGalaxyProps {
  selectedFilter: string
}

export default function ProjectGalaxy({ selectedFilter }: ProjectGalaxyProps) {
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [webglSupported, setWebglSupported] = useState(true)
  const [canvasError, setCanvasError] = useState(false)

  const filteredProjects = projectsData.filter(
    (project) => selectedFilter === "all" || project.category === selectedFilter,
  )

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }
  }, [])

  const handleCanvasError = () => {
    setCanvasError(true)
    setWebglSupported(false)
  }

  return (
    <div className="relative w-full h-full">
      {webglSupported && !canvasError ? (
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          onError={handleCanvasError}
          gl={{
            antialias: false,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} />
          <pointLight position={[-5, -5, -5]} intensity={0.4} color="#ff00ff" />

          {filteredProjects.map((project) => (
            <ProjectPlanet
              key={project.id}
              project={project}
              isSelected={selectedProject?.id === project.id}
              onClick={() => setSelectedProject(project)}
            />
          ))}

          <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} maxDistance={10} minDistance={3} />
        </Canvas>
      ) : (
        <FallbackProjectGrid projects={filteredProjects} onProjectClick={setSelectedProject} />
      )}

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-10"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-morphism rounded-lg p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{selectedProject.name}</h3>

              <p className="text-white/80 mb-4">{selectedProject.description}</p>

              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech: string) => (
                  <span key={tech} className="px-2 py-1 bg-white/10 rounded text-sm text-white">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
