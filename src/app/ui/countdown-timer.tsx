"use client";

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { poppins } from "../lib/fonts";

interface CountdownTimerProps {
  targetDate: Date
}

interface TimeUnit {
  value: number
  label: string
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [isLoading, setIsLoading] = useState(true)

  const calculateTimeLeft = useCallback((): TimeUnit[] => {
    const currentDate = new Date();
    const difference = targetDate.getTime() - currentDate.getTime()

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
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState<TimeUnit[]>(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setIsLoading(false)

    return () => clearInterval(timer)
  }, [targetDate, calculateTimeLeft])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
      {
        timeLeft.map((unit) => (
          <Card key={unit.label} className="overflow-hidden">
            <CardContent className="p-6 text-center">
              <motion.div
                key={unit.value}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center"
              >
                {isLoading ? (<span className={`${poppins.className} block text-5xl md:text-6xl font-bold text-indigo-600 mb-2`}>0</span>)
                  : <span className={`${poppins.className} block text-5xl md:text-6xl font-bold text-indigo-600 mb-2`}>{unit.value}</span>
                }
              </motion.div>
              <span className="text-sm text-muted-foreground font-medium">{unit.label}</span>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}


