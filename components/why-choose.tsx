"use client"

import useSWR from "swr"
import type { Benefit } from "@/lib/data"

const fetcher = (url: string) => fetch(url).then(res => res.json())

// Icon components
function ExpertiseIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20" stroke="currentColor" strokeWidth="1.5">
      <circle cx="40" cy="25" r="12" />
      <path d="M25 60c0-10 7-18 15-18s15 8 15 18" />
      <path d="M55 20l8-8M60 25l10 0M55 35l8 5" />
      <rect x="18" y="45" width="44" height="25" rx="3" />
      <circle cx="30" cy="57" r="5" fill="currentColor" />
      <path d="M40 52v15M50 52v15" />
    </svg>
  )
}

function SolutionsIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20" stroke="currentColor" strokeWidth="1.5">
      <circle cx="40" cy="20" r="8" />
      <path d="M36 28l-4 20h16l-4-20" />
      <path d="M32 48h16v8H32z" />
      <path d="M40 56v12" />
      <circle cx="40" cy="72" r="4" />
      <path d="M25 35l-10 5M55 35l10 5" />
      <circle cx="12" cy="42" r="6" />
      <circle cx="68" cy="42" r="6" />
    </svg>
  )
}

function PartnershipsIcon() {
  return (
    <svg viewBox="0 0 80 80" fill="none" className="w-20 h-20" stroke="currentColor" strokeWidth="1.5">
      <path d="M15 45c-5-5-5-13 0-18s13-5 18 0l7 7 7-7c5-5 13-5 18 0s5 13 0 18L40 70 15 45z" />
      <path d="M25 50l10-10c3-3 7-3 10 0l10 10" />
      <path d="M30 55l5-5M45 55l5-5" />
    </svg>
  )
}

function BenefitIcon({ type }: { type: string }) {
  switch (type) {
    case "expertise":
      return <ExpertiseIcon />
    case "solutions":
      return <SolutionsIcon />
    case "partnerships":
      return <PartnershipsIcon />
    default:
      return <ExpertiseIcon />
  }
}

export function WhyChoose() {
  const { data: benefits, isLoading } = useSWR<Benefit[]>("/api/benefits", fetcher)

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 w-32 bg-muted rounded mx-auto mb-4" />
            <div className="h-10 w-96 bg-muted rounded mx-auto mb-16" />
            <div className="grid md:grid-cols-3 gap-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-20 w-20 bg-muted rounded-full mx-auto mb-6" />
                  <div className="h-6 w-48 bg-muted rounded mx-auto mb-4" />
                  <div className="h-20 bg-muted rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-medium tracking-wider uppercase mb-3">OUR BENEFIT</p>
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            Why Choose Your Agency
          </h2>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {benefits?.map((benefit) => (
            <div key={benefit.id} className="text-center">
              <div className="text-slate-700 mb-6 flex justify-center">
                <BenefitIcon type={benefit.icon} />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-4">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
