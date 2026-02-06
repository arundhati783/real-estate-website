"use client"

import { useEffect, useState, useRef } from "react"

const stats = [
  { number: 90, label: "SATISFIED", sublabel: "CLIENTS" },
  { number: 50, label: "DEALS", sublabel: "CLOSED" },
  { number: 50, label: "SUCCESSFUL", sublabel: "TRANSACTIONS" },
  { number: 80, label: "MONTHLY", sublabel: "TRAFFIC" },
]

function AnimatedNumber({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [isVisible, target, duration])

  return <span ref={ref}>{count}</span>
}

export function Stats() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center md:text-left flex items-center gap-4 justify-center md:justify-start">
              <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary">
                <AnimatedNumber target={stat.number} />
              </span>
              <div className="flex flex-col">
                <span className="text-sm md:text-base font-bold text-slate-800 tracking-wide">
                  {stat.label}
                </span>
                <span className="text-sm md:text-base font-bold text-slate-800 tracking-wide">
                  {stat.sublabel}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
