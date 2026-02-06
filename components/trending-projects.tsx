"use client"

import { useState } from "react"
import useSWR from "swr"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Project {
  id: string
  name: string
  slug: string
  location: string
  price: string
  completion_date: string
  developer: string
  category: string
  status: string
  featured: boolean
  image: string
}

const fetcher = (url: string) => fetch(url).then(res => res.json())

const categories = [
  "View All",
  "Apartment",
  "Villa",
  "Townhouse",
  "Penthouse",
  "Mansion",
  "Plot",
  "Villa in project",
  "Full Floor",
]

export function TrendingProjects() {
  const [activeCategory, setActiveCategory] = useState("View All")
  
  const { data: projects, isLoading } = useSWR<Project[]>(
    `/api/projects${activeCategory !== "View All" ? `?category=${activeCategory}` : ""}`,
    fetcher
  )

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-secondary">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 w-48 bg-muted rounded mx-auto mb-4" />
            <div className="h-10 w-80 bg-muted rounded mx-auto mb-12" />
            <div className="flex justify-center gap-3 mb-12">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 w-24 bg-muted rounded-full" />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden">
                  <div className="h-64 bg-muted" />
                  <div className="p-5 space-y-3">
                    <div className="h-6 w-3/4 bg-muted rounded" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                    <div className="h-16 bg-muted rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="text-primary text-sm uppercase tracking-widest font-medium">
            WE ALWAYS SELECT THE BEST FOR YOU
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-800 font-bold mt-3">
            Most Trending Projects
          </h2>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary text-white shadow-lg"
                  : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project) => (
            <Link
              href={`/projects/${project.slug}`}
              key={project.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow block"
            >
              {/* Image */}
              <div className="relative h-64">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {project.featured && (
                    <span className="bg-teal-500 text-white text-xs px-3 py-1 rounded">
                      Featured
                    </span>
                  )}
                  <span className="bg-white text-slate-800 text-xs px-3 py-1 rounded">
                    {project.status}
                  </span>
                </div>
                {/* Favorite */}
                <button 
                  type="button" 
                  className="absolute top-4 right-4 w-9 h-9 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  onClick={(e) => e.preventDefault()}
                >
                  <Heart className="h-5 w-5 text-slate-400 hover:text-primary" />
                </button>
                {/* Type Badge */}
                <span className="absolute bottom-4 left-4 bg-white text-slate-800 text-xs px-3 py-1 rounded">
                  {project.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold text-slate-800 mb-3">
                  {project.name}
                </h3>
                <div className="flex items-center gap-2 text-slate-500 mb-4 pb-4 border-b border-slate-100">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-sm">{project.location}</span>
                </div>

                {/* Price & Completion */}
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs text-slate-500 block">Price from:</span>
                    <span className="font-semibold text-slate-800">{project.price}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Completion Date:</span>
                    <span className="font-semibold text-slate-800">{project.completion_date}</span>
                  </div>
                </div>

                {/* Developer */}
                <div>
                  <span className="text-sm text-slate-500">Developer: </span>
                  <span className="text-sm font-semibold text-slate-800">{project.developer}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Explore More Button */}
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base font-medium rounded-lg">
            Explore More
          </Button>
        </div>
      </div>
    </section>
  )
}
