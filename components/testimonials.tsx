"use client"

import { useState, useEffect, useCallback } from "react"
import useSWR from "swr"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  image: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function Testimonials() {
  const { data: testimonials, isLoading } = useSWR<Testimonial[]>("/api/testimonials", fetcher)
  const [startIndex, setStartIndex] = useState(0)

  const handleNext = useCallback(() => {
    if (testimonials) {
      setStartIndex((prev) => (prev >= testimonials.length - 2 ? 0 : prev + 1))
    }
  }, [testimonials])

  const handlePrev = () => {
    if (testimonials) {
      setStartIndex((prev) => (prev === 0 ? testimonials.length - 2 : prev - 1))
    }
  }

  // Auto-rotate every 1.5 seconds
  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return
    
    const interval = setInterval(() => {
      handleNext()
    }, 1500)

    return () => clearInterval(interval)
  }, [testimonials, handleNext])

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="h-60 bg-muted rounded" />
              <div className="h-60 bg-muted rounded" />
              <div className="h-60 bg-muted rounded" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const visibleTestimonials = testimonials?.slice(startIndex, startIndex + 2) || []

  return (
    <section className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-[300px_1fr] gap-12">
          {/* Left Column - Title */}
          <div>
            <p className="text-primary font-medium tracking-wider uppercase mb-3">
              TOP PROPERTIES
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              {"What's People Say's"}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our seasoned team excels in real estate with years of successful market navigation, offering informed decisions and optimal results.
            </p>
            {/* Navigation Arrows */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg border-2 bg-transparent"
                onClick={handlePrev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-lg border-2 bg-transparent"
                onClick={handleNext}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Column - Testimonial Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-card rounded-xl p-6 shadow-sm border border-border"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={`star-${testimonial.id}-${i}`}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                {/* Content */}
                <p className="text-foreground leading-relaxed mb-6">
                  {testimonial.content}
                </p>
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
