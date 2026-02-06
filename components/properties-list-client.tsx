"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Heart, MapPin, Bed, Bath, Maximize, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Property {
  id: string
  name: string
  slug: string
  description: string
  location: string
  price: number
  price_type: string
  property_type: string
  status: string
  featured: boolean
  bedrooms: number
  bathrooms: number
  area: number
  image: string
  latitude: number
  longitude: number
}

interface PropertiesListClientProps {
  properties: Property[]
  totalCount: number
  totalPages: number
  currentPage: number
  perPage: number
  locations: string[]
  categories: string[]
  initialFilters: {
    keyword: string
    location: string
    category: string
    status: string
    sort: string
  }
}

export function PropertiesListClient({
  properties,
  totalCount,
  totalPages,
  currentPage,
  perPage,
  locations,
  categories,
  initialFilters,
}: PropertiesListClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [keyword, setKeyword] = useState(initialFilters.keyword)
  const [location, setLocation] = useState(initialFilters.location)
  const [category, setCategory] = useState(initialFilters.category || "All")
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Format price display
  const formatPrice = (price: number) => {
    if (price >= 1000000000) {
      return `AED ${(price / 1000000000).toFixed(2)}B`
    }
    if (price >= 1000000) {
      return `AED ${(price / 1000000).toFixed(2)}M`
    }
    if (price >= 1000) {
      return `AED ${(price / 1000).toFixed(0)}K`
    }
    return `AED ${price.toFixed(0)}`
  }

  // Handle search
  const handleSearch = () => {
    const params = new URLSearchParams()
    if (keyword) params.set("keyword", keyword)
    if (location) params.set("location", location)
    if (category && category !== "All") params.set("category", category)
    params.set("page", "1")
    router.push(`/properties?${params.toString()}`)
  }

  // Handle filter changes
  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "All" && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.set("page", "1")
    router.push(`/properties?${params.toString()}`)
  }

  // Handle pagination
  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("page", page.toString())
    router.push(`/properties?${params.toString()}`)
  }

  // Generate pagination numbers
  const generatePagination = () => {
    const pages: (number | string)[] = []
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 4) pages.push("...")
      for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 3) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="min-h-screen">
      {/* Search Bar - Sticky */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 py-4">
          <div className="flex flex-wrap lg:flex-nowrap items-end gap-4">
            {/* Keyword */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-slate-500 mb-1">Keyword</label>
              <Input
                type="text"
                placeholder="Search for Keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="border-0 border-b border-slate-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-slate-900"
              />
            </div>

            {/* Location */}
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs text-slate-500 mb-1">Location</label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="border-0 border-b border-slate-200 rounded-none px-0 pr-8 focus-visible:ring-0 focus-visible:border-slate-900"
                />
                <button type="button" className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600">
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Category */}
            <div className="w-[180px]">
              <label className="block text-xs text-slate-500 mb-1">Category</label>
              <Select value={category} onValueChange={(value) => setCategory(value)}>
                <SelectTrigger className="border-0 border-b border-slate-200 rounded-none px-0 focus:ring-0">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Advanced */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 px-4 py-2"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span className="font-medium">Advanced</span>
            </button>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="bg-red-500 hover:bg-red-600 text-white px-8"
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Left: Property List */}
        <div className="w-full lg:w-[55%] p-4 lg:p-6">
          {/* List Controls */}
          <div className="flex justify-end items-center gap-4 mb-6">
            <Select
              value={perPage.toString()}
              onValueChange={(value) => updateFilters("perPage", value)}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={initialFilters.sort}
              onValueChange={(value) => updateFilters("sort", value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} formatPrice={formatPrice} />
            ))}
          </div>

          {/* Empty State */}
          {properties.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No properties found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => router.push("/properties")}
                className="mt-4"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8 pb-8">
              {generatePagination().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded">...</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToPage(page as number)}
                      className={`w-10 h-10 flex items-center justify-center rounded font-medium transition-colors ${
                        currentPage === page
                          ? "bg-red-500 text-white"
                          : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>

        {/* Right: Map */}
        <div className="hidden lg:block lg:w-[45%] sticky top-[73px] h-[calc(100vh-73px)]">
          <div className="relative w-full h-full">
            {/* Google Maps Embed - Dubai/UAE region */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3012237852!2d54.94755955978858!3d25.07628046498498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1706800000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Properties Map - Dubai UAE"
              className="absolute inset-0 w-full h-full"
            />
            
            {/* Property markers overlay */}
            <div className="absolute inset-0 pointer-events-none">
              {properties.slice(0, 10).map((property, index) => (
                <div
                  key={property.id}
                  className="absolute w-4 h-4 bg-teal-500 rounded-full border-2 border-white shadow-lg pointer-events-auto cursor-pointer hover:scale-125 transition-transform z-10"
                  style={{
                    left: `${25 + (index % 4) * 15}%`,
                    top: `${25 + Math.floor(index / 4) * 20}%`,
                  }}
                  title={property.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Property Card Component
function PropertyCard({ property, formatPrice }: { property: Property; formatPrice: (price: number) => string }) {
  const [isWishlisted, setIsWishlisted] = useState(false)

  const getStatusBadge = () => {
    const badges = []
    
    if (property.featured) {
      badges.push(
        <span key="featured" className="px-2 py-1 text-xs font-medium rounded bg-teal-500 text-white">
          Featured
        </span>
      )
    }
    
    if (property.status === "selling") {
      badges.push(
        <span key="status" className="px-2 py-1 text-xs font-medium rounded bg-red-500 text-white">
          Selling
        </span>
      )
    } else if (property.status === "renting") {
      badges.push(
        <span key="status" className="px-2 py-1 text-xs font-medium rounded bg-red-500 text-white">
          Renting
        </span>
      )
    }
    
    return badges
  }

  return (
    <Link href={`/properties/${property.slug}`} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.image || "/placeholder.svg"}
            alt={property.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Status Badges */}
          <div className="absolute top-3 left-3 flex gap-1">
            {getStatusBadge()}
          </div>

          {/* Wishlist Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setIsWishlisted(!isWishlisted)
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center hover:bg-slate-800/70 transition-colors"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : "text-white"}`} />
          </button>

          {/* Property Type Badge */}
          {property.property_type && (
            <span className="absolute bottom-3 left-3 px-3 py-1 text-xs font-medium rounded bg-white text-slate-900">
              {property.property_type}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-slate-900 mb-2 line-clamp-1">
            {property.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-3 pb-3 border-b border-slate-100">
            <MapPin className="h-4 w-4 text-slate-400" />
            <span className="line-clamp-1">{property.location}</span>
          </div>

          {/* Description (if available) */}
          {property.description && (
            <p className="text-sm text-slate-600 line-clamp-2 mb-3">
              {property.description}
            </p>
          )}

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
            {property.bedrooms !== null && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-slate-400" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms !== null && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4 text-slate-400" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.area !== null && (
              <div className="flex items-center gap-1">
                <Maximize className="h-4 w-4 text-slate-400" />
                <span>{property.area} m²</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-full bg-teal-500" />
            <span className="font-serif text-xl font-bold text-slate-900">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
