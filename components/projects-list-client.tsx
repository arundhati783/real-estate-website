"use client"

import React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, MapPin, Heart, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Plus, Minus, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Project {
  id: string
  name: string
  slug: string
  location: string
  price: number
  completion_date: string
  developer: string
  category: string
  status: string
  featured: boolean
  image: string
}

interface ProjectsListClientProps {
  projects: Project[]
  totalCount: number
  totalPages: number
  currentPage: number
  perPage: number
  filters: {
    keyword: string
    location: string
    category: string
    status: string
    sort: string
  }
  filterOptions: {
    locations: string[]
    categories: string[]
    statuses: string[]
  }
}

export function ProjectsListClient({
  projects,
  totalCount,
  totalPages,
  currentPage,
  perPage,
  filters,
  filterOptions
}: ProjectsListClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Local state for form inputs
  const [keyword, setKeyword] = useState(filters.keyword)
  const [location, setLocation] = useState(filters.location)
  const [category, setCategory] = useState(filters.category || "all")
  const [selectedPerPage, setSelectedPerPage] = useState(perPage.toString())
  const [selectedSort, setSelectedSort] = useState(filters.sort)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [status, setStatus] = useState(filters.status || "all")
  
  // Wishlist state (client-side only for now)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())
  
  const toggleWishlist = (projectId: string) => {
    setWishlist(prev => {
      const newSet = new Set(prev)
      if (newSet.has(projectId)) {
        newSet.delete(projectId)
      } else {
        newSet.add(projectId)
      }
      return newSet
    })
  }
  
  // Build URL with search params
  const buildUrl = (params: Record<string, string | number>) => {
    const url = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "default") {
        url.set(key, value.toString())
      } else {
        url.delete(key)
      }
    })
    return `/projects?${url.toString()}`
  }
  
  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const url = buildUrl({
      keyword,
      location,
      category,
      status,
      page: 1
    })
    router.push(url)
  }
  
  // Handle per page change
  const handlePerPageChange = (value: string) => {
    setSelectedPerPage(value)
    router.push(buildUrl({ perPage: value, page: 1 }))
  }
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setSelectedSort(value)
    router.push(buildUrl({ sort: value, page: 1 }))
  }
  
  // Format price
  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(2)}M`
    } else if (price >= 1000) {
      return `AED ${(price / 1000).toFixed(0)}K`
    }
    return `AED ${price.toLocaleString()}`
  }
  
  // Format date
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "TBA"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }).replace(/\//g, "-")
  }
  
  // Get status badge style
  const getStatusStyle = (projectStatus: string) => {
    switch (projectStatus?.toLowerCase()) {
      case "pre launch":
      case "pre-launch":
        return "bg-white text-slate-900"
      case "on sale":
      case "on-sale":
        return "bg-white text-slate-900"
      case "sold out":
        return "bg-slate-700 text-white"
      default:
        return "bg-white text-slate-900"
    }
  }
  
  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const pages: (number | string)[] = []
    
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first few pages
      for (let i = 1; i <= Math.min(10, totalPages); i++) {
        pages.push(i)
      }
      
      if (currentPage > 10 && currentPage < totalPages - 2) {
        pages.push("...")
        pages.push(currentPage)
      }
      
      if (totalPages > 10) {
        pages.push("...")
        pages.push(totalPages - 1)
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-8 py-4">
          <form onSubmit={handleSearch} className="flex flex-wrap lg:flex-nowrap items-end gap-4">
            {/* Keyword Search */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-slate-500 mb-1.5">Keyword</label>
              <Input
                type="text"
                placeholder="Search project or developer"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="h-11 border-slate-200"
              />
            </div>
            
            {/* Location Search */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-slate-500 mb-1.5">Location</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="h-11 border-slate-200 pr-10"
                />
                <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>
            
            {/* Category Dropdown */}
            <div className="w-[160px]">
              <label className="block text-xs text-slate-500 mb-1.5">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-11 px-3 pr-10 border border-slate-200 rounded-md bg-white text-sm appearance-none cursor-pointer"
                >
                  <option value="all">All</option>
                  {filterOptions.categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            
            {/* Advanced Filter Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="h-11 gap-2 border-slate-200 bg-transparent"
            >
              <SlidersHorizontal className="h-4 w-4" />
              <span className="hidden sm:inline">Advanced</span>
            </Button>
            
            {/* Search Button */}
            <Button
              type="submit"
              className="h-11 px-8 bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </form>
          
          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-wrap gap-4">
              <div className="w-[180px]">
                <label className="block text-xs text-slate-500 mb-1.5">Status</label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full h-10 px-3 pr-10 border border-slate-200 rounded-md bg-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    {filterOptions.statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main Content - Two Column Layout */}
      <div className="flex">
        {/* Left Column - Scrollable Project List */}
        <div className="w-full lg:w-[55%] xl:w-[50%]">
          {/* List Controls */}
          <div className="px-4 lg:px-8 py-4 flex items-center justify-between bg-white border-b border-slate-100">
            <p className="text-sm text-slate-600">
              Showing <span className="font-medium">{projects.length}</span> of <span className="font-medium">{totalCount}</span> projects
            </p>
            
            <div className="flex items-center gap-4">
              {/* Per Page */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select
                    value={selectedPerPage}
                    onChange={(e) => handlePerPageChange(e.target.value)}
                    className="h-9 pl-3 pr-8 border border-slate-200 rounded-md bg-white text-sm appearance-none cursor-pointer"
                  >
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="48">48</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              
              {/* Sort */}
              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="h-9 pl-3 pr-8 border border-slate-200 rounded-md bg-white text-sm appearance-none cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="completion">Completion Date</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
          
          {/* Project Cards Grid */}
          <div className="p-4 lg:p-8">
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.slug}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      
                      {/* Status Badge */}
                      {project.status && (
                        <span className={`absolute top-3 left-3 px-3 py-1 text-xs font-medium rounded ${getStatusStyle(project.status)}`}>
                          {project.status}
                        </span>
                      )}
                      
                      {/* Wishlist Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          toggleWishlist(project.id)
                        }}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-slate-800/60 hover:bg-slate-800/80 flex items-center justify-center transition-colors"
                      >
                        <Heart 
                          className={`h-4 w-4 ${wishlist.has(project.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} 
                        />
                      </button>
                      
                      {/* Property Type Badge */}
                      {project.category && (
                        <span className="absolute bottom-3 left-3 px-3 py-1 text-xs font-medium rounded bg-white text-slate-900">
                          {project.category}
                        </span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                        {project.name}
                      </h3>
                      
                      {/* Location */}
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
                        <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600 line-clamp-1">{project.location}</span>
                      </div>
                      
                      {/* Price & Date */}
                      <div className="flex gap-6 mb-4">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Price from:</p>
                          <p className="font-semibold text-slate-900">{formatPrice(project.price)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Completion Date:</p>
                          <p className="font-semibold text-slate-900">
                            {project.completion_date ? formatDate(project.completion_date) : "Soon"}
                          </p>
                        </div>
                      </div>
                      
                      {/* Developer */}
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-sm">
                          <span className="text-slate-500">Developer:</span>{" "}
                          <span className="font-medium text-slate-900">{project.developer}</span>
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">No projects found</h3>
                <p className="text-slate-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-1">
                {/* Previous */}
                <Link
                  href={currentPage > 1 ? buildUrl({ page: currentPage - 1 }) : "#"}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${
                    currentPage > 1 
                      ? "hover:bg-slate-100 text-slate-700" 
                      : "text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Link>
                
                {/* Page Numbers */}
                {getPaginationNumbers().map((page, index) => (
                  page === "..." ? (
                    <span 
                      key={`ellipsis-${index}`}
                      className="w-10 h-10 flex items-center justify-center text-slate-500 bg-teal-600 text-white rounded-md"
                    >
                      ...
                    </span>
                  ) : (
                    <Link
                      key={page}
                      href={buildUrl({ page: page as number })}
                      className={`w-10 h-10 flex items-center justify-center rounded-md font-medium transition-colors ${
                        currentPage === page
                          ? "bg-teal-600 text-white"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {page}
                    </Link>
                  )
                ))}
                
                {/* Next */}
                <Link
                  href={currentPage < totalPages ? buildUrl({ page: currentPage + 1 }) : "#"}
                  className={`w-10 h-10 flex items-center justify-center rounded-md ${
                    currentPage < totalPages 
                      ? "hover:bg-slate-100 text-slate-700" 
                      : "text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <ChevronRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Column - Fixed Map */}
<div className="hidden lg:block lg:w-[45%] xl:w-[50%]">
        <div className="sticky top-[73px] h-[calc(100vh-73px)]">
            {/* Map Container */}
            <div className="relative w-full h-full bg-slate-100">
              {/* Static Map Image */}
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80"
                alt="Map of UAE"
                fill
                className="object-cover"
              />
              
              {/* Map Overlay with Labels */}
              <div className="absolute inset-0 bg-blue-50/30">
                {/* Simulated map with region labels */}
                <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                  {/* Water */}
                  <rect fill="#a7d8de" width="800" height="600" />
                  
                  {/* Land masses - Arabian Peninsula simplified */}
                  <path 
                    d="M0,100 Q200,50 400,100 L500,150 L550,300 L500,450 L400,550 L200,600 L0,550 Z" 
                    fill="#f5f5f4" 
                    stroke="#e5e5e5"
                    strokeWidth="1"
                  />
                  <path 
                    d="M600,0 L800,0 L800,200 L700,250 L650,150 Z" 
                    fill="#f5f5f4" 
                    stroke="#e5e5e5"
                    strokeWidth="1"
                  />
                  
                  {/* UAE highlighted area */}
                  <ellipse cx="580" cy="280" rx="60" ry="40" fill="#60a5fa" fillOpacity="0.4" stroke="#3b82f6" strokeWidth="2" />
                  
                  {/* Region labels */}
                  <text x="180" y="280" fill="#6b7280" fontSize="14" fontFamily="sans-serif">Saudi Arabia</text>
                  <text x="560" y="290" fill="#1e40af" fontSize="12" fontFamily="sans-serif" fontWeight="600">UAE</text>
                  <text x="680" y="180" fill="#6b7280" fontSize="12" fontFamily="sans-serif">Iran</text>
                  <text x="420" y="200" fill="#6b7280" fontSize="11" fontFamily="sans-serif">Persian Gulf</text>
                  <text x="620" cy="380" fill="#6b7280" fontSize="11" fontFamily="sans-serif">Oman</text>
                  <text x="300" y="450" fill="#6b7280" fontSize="11" fontFamily="sans-serif">Yemen</text>
                  
                  {/* Project markers in UAE area */}
                  {projects.slice(0, 8).map((_, index) => {
                    const x = 540 + (index % 4) * 25 + Math.random() * 10
                    const y = 250 + Math.floor(index / 4) * 30 + Math.random() * 10
                    return (
                      <g key={index}>
                        <circle cx={x} cy={y} r="6" fill="#0d9488" stroke="#fff" strokeWidth="2" />
                      </g>
                    )
                  })}
                </svg>
              </div>
              
              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button 
                  type="button"
                  className="w-9 h-9 bg-white rounded shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Plus className="h-4 w-4 text-slate-600" />
                </button>
                <button 
                  type="button"
                  className="w-9 h-9 bg-white rounded shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Minus className="h-4 w-4 text-slate-600" />
                </button>
                <button 
                  type="button"
                  className="w-9 h-9 bg-white rounded shadow-md flex items-center justify-center hover:bg-slate-50 transition-colors"
                >
                  <Maximize2 className="h-4 w-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
