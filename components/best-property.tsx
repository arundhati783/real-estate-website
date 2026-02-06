"use client"

import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import { Heart, BedDouble, Bath, Ruler, ArrowRight } from "lucide-react"

interface Property {
  id: string
  name: string
  slug: string
  location: string
  price: string
  beds: number
  baths: number
  area: number
  type: string
  featured: boolean
  image: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function BestProperty() {
  const { data: properties, isLoading } = useSWR<Property[]>("/api/properties", fetcher)

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-muted rounded mb-12" />
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="h-[500px] bg-muted rounded-xl" />
              <div className="space-y-6">
                <div className="h-40 bg-muted rounded-xl" />
                <div className="h-40 bg-muted rounded-xl" />
                <div className="h-40 bg-muted rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const featuredProperty = properties?.[0]
  const sideProperties = properties?.slice(1, 4)

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">
            Best Property Value
          </h2>
          <Link
            href="/properties"
            className="hidden md:flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            View All
            <ArrowRight className="h-5 w-5 text-primary" />
          </Link>
        </div>

        {/* Properties Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Featured Property (Large) */}
          {featuredProperty && (
            <Link href={`/projects/${featuredProperty.slug}`} className="group cursor-pointer block">
              <div className="relative h-[450px] rounded-xl overflow-hidden">
                <Image
                  src={featuredProperty.image || "/placeholder.svg"}
                  alt={featuredProperty.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {featuredProperty.featured && (
                    <span className="bg-teal-500 text-white px-3 py-1 rounded text-sm font-medium">
                      Featured
                    </span>
                  )}
                  <span className="bg-primary text-white px-3 py-1 rounded text-sm font-medium">
                    {featuredProperty.type}
                  </span>
                </div>
                {/* Wishlist */}
                <button
                  type="button"
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Heart className="h-5 w-5 text-slate-600" />
                </button>
              </div>
              {/* Property Info */}
              <div className="mt-4">
                <h3 className="text-xl md:text-2xl font-serif text-primary mb-3">
                  {featuredProperty.name}
                </h3>
                <div className="flex items-center gap-6 text-slate-600 mb-4">
                  <div className="flex items-center gap-2">
                    <BedDouble className="h-5 w-5" />
                    <span>{featuredProperty.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5" />
                    <span>{featuredProperty.baths}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-5 w-5" />
                    <span>{featuredProperty.area} m²</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4">
                  <div className="w-10 h-10 rounded-full bg-primary" />
                  <p className="text-xl font-semibold text-foreground">
                    {featuredProperty.price}
                  </p>
                </div>
              </div>
            </Link>
          )}

          {/* Side Properties (Smaller) */}
          <div className="space-y-6">
            {sideProperties?.map((property) => (
              <Link
                href={`/projects/${property.slug}`}
                key={property.id}
                className="group flex gap-4 bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-colors cursor-pointer"
              >
                {/* Property Image */}
                <div className="relative w-40 md:w-48 h-36 flex-shrink-0">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.name}
                    fill
                    className="object-cover"
                  />
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {property.featured && (
                      <span className="bg-teal-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                        Featured
                      </span>
                    )}
                    <span className="bg-primary text-white px-2 py-0.5 rounded text-xs font-medium">
                      {property.type}
                    </span>
                  </div>
                  {/* Wishlist */}
                  <button
                    type="button"
                    className="absolute top-2 right-2 w-7 h-7 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <Heart className="h-4 w-4 text-slate-600" />
                  </button>
                </div>
                {/* Property Details */}
                <div className="flex-1 py-3 pr-4">
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    {property.name}
                  </h3>
                  <div className="flex items-center gap-4 text-slate-500 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <BedDouble className="h-4 w-4" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Ruler className="h-4 w-4" />
                      <span>{property.area} m²</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-full bg-primary" />
                    <p className="font-semibold text-foreground">
                      {property.price}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            View All
            <ArrowRight className="h-5 w-5 text-primary" />
          </Link>
        </div>
      </div>
    </section>
  )
}
