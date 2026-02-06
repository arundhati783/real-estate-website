"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, SlidersHorizontal, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const animatedWords = ["Perfect Home", "Real Estate", "Dream House"]

export function Hero() {
  const [activeTab, setActiveTab] = useState("project")
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % animatedWords.length)
        setIsAnimating(false)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] lg:min-h-[700px] px-4 text-center">
        <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white font-bold italic mb-6 text-balance">
          Find Your{" "}
          <span className="relative inline-block overflow-hidden">
            <span
              className={`inline-block transition-all duration-300 ${
                isAnimating ? "opacity-0 -translate-y-full" : "opacity-100 translate-y-0"
              }`}
            >
              {animatedWords[currentWordIndex]}
            </span>
          </span>
        </h1>
        <p className="text-white/90 text-lg md:text-xl max-w-2xl mb-10 text-pretty">
          We are a real estate agency that will help you find the best residence you dream of, let&apos;s discuss for your dream house?
        </p>

        {/* Search Box */}
        <div className="w-full max-w-5xl">
          {/* Tabs */}
          <div className="flex justify-center mb-0">
            <button
              onClick={() => setActiveTab("project")}
              className={`px-8 py-3 text-sm font-medium transition-colors ${
                activeTab === "project"
                  ? "bg-white text-slate-800"
                  : "bg-white/20 text-white hover:bg-white/30"
              } rounded-t-lg`}
            >
              Project
            </button>
            <button
              onClick={() => setActiveTab("sale")}
              className={`px-8 py-3 text-sm font-medium transition-colors ${
                activeTab === "sale"
                  ? "bg-white text-slate-800"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              For Sale
            </button>
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-8 py-3 text-sm font-medium transition-colors ${
                activeTab === "rent"
                  ? "bg-white text-slate-800"
                  : "bg-white/20 text-white hover:bg-white/30"
              } rounded-t-lg`}
            >
              For Rent
            </button>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-xl p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Keyword */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase tracking-wide">Keyword</label>
                <Input 
                  placeholder="Search project or developer" 
                  className="border-0 border-b border-slate-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-primary"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase tracking-wide">Location</label>
                <div className="relative">
                  <Input 
                    placeholder="Search for location" 
                    className="border-0 border-b border-slate-200 rounded-none px-0 pr-8 focus-visible:ring-0 focus-visible:border-primary"
                  />
                  <MapPin className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs text-slate-500 uppercase tracking-wide">Category</label>
                <div className="relative">
                  <select className="w-full border-0 border-b border-slate-200 rounded-none px-0 py-2 focus:ring-0 focus:border-primary appearance-none bg-transparent text-slate-600">
                    <option>All</option>
                    <option>Apartment</option>
                    <option>Villa</option>
                    <option>Townhouse</option>
                    <option>Penthouse</option>
                  </select>
                  <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Advanced */}
              <div className="flex items-center justify-center gap-2 text-slate-600 cursor-pointer hover:text-primary transition-colors py-2">
                <SlidersHorizontal className="h-5 w-5" />
                <span className="font-medium">Advanced</span>
              </div>

              {/* Search Button */}
              <Button className="bg-primary hover:bg-primary/90 text-white py-6 text-base font-medium">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
