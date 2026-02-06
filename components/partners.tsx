"use client"

import useSWR from "swr"

interface Partner {
  id: string
  name: string
  logo_url: string | null
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

// Styles for each partner brand
const partnerStyles: Record<string, string> = {
  "MAG": "font-bold text-3xl tracking-wider text-slate-700",
  "EMAAR": "font-bold text-3xl tracking-[0.2em] text-slate-700",
  "SELECT GROUP": "font-semibold text-2xl text-slate-700",
  "DAMAC": "font-bold text-3xl italic tracking-wide text-slate-700",
  "SOBHA": "font-bold text-3xl tracking-[0.15em] text-slate-700",
}

export function Partners() {
  const { data: partners } = useSWR<Partner[]>("/api/partners", fetcher)

  // Default partners if API doesn't return data
  const displayPartners = partners || [
    { id: "1", name: "MAG", logo_url: null },
    { id: "2", name: "EMAAR", logo_url: null },
    { id: "3", name: "SELECT GROUP", logo_url: null },
    { id: "4", name: "DAMAC", logo_url: null },
    { id: "5", name: "SOBHA", logo_url: null },
  ]

  // Double the partners for infinite scroll effect
  const scrollPartners = [...displayPartners, ...displayPartners]

  return (
    <section className="py-16 bg-background border-t border-border overflow-hidden">
      <div className="relative">
        {/* Infinite scrolling container */}
        <div className="flex animate-scroll">
          {scrollPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className={`flex-shrink-0 px-12 md:px-16 ${
                partnerStyles[partner.name] || "font-bold text-3xl text-slate-700"
              } opacity-60 hover:opacity-100 transition-opacity cursor-pointer whitespace-nowrap`}
            >
              {partner.name}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
