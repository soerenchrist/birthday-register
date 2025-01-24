"use client";

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeUnit {
  value: number
  label: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>(calculateTimeLeft())

  function calculateTimeLeft(): TimeUnit[] {
    const difference = +targetDate - +new Date()

    if (difference > 0) {
      return [
        {
          value: Math.floor(difference / (1000 * 60 * 60 * 24)),
          label: "Tage",
        },
        {
          value: Math.floor((difference / (1000 * 60 * 60)) % 24),
          label: "Stunden",
        },
        {
          value: Math.floor((difference / 1000 / 60) % 60),
          label: "Minuten",
        },
        {
          value: Math.floor((difference / 1000) % 60),
          label: "Sekunden",
        },
      ]
    }
    return Array(4).fill({ value: 0, label: "" })
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {timeLeft.map((unit, index) => (
        <Card key={unit.label} className="overflow-hidden">
          <CardContent className="p-6">
            <motion.div
              key={unit.value}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center"
            >
              <span className="block text-5xl md:text-6xl font-bold text-indigo-600 mb-2">{unit.value}</span>
              <span className="text-sm text-muted-foreground font-medium">{unit.label}</span>
            </motion.div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


