"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown } from "lucide-react"

const propertyTypes = [
  "Appartment (From AED 0.7 M)",
  "Villa (From AED 2 M)",
  "Townhouse (From AED 1.5 M)",
  "Penthouse (From AED 3 M)",
  "Plot (From AED 5 M)",
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget: "",
    propertyType: propertyTypes[0],
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px]">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070')",
        }}
      >
        <div className="absolute inset-0 bg-slate-900/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold italic mb-4 text-balance">
              We&apos;re Just a Message Away - Let&apos;s Talk!
            </h2>
            <p className="text-lg uppercase tracking-widest text-white/80 font-medium">
              GET FREE CONSULTATION
            </p>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name and Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-800">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-800">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="flex">
                    <div className="flex items-center gap-1 px-3 bg-slate-50 border border-r-0 border-slate-200 rounded-l-md text-sm text-slate-600">
                      <span>+971</span>
                    </div>
                    <Input
                      placeholder="Your phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-slate-50 border-slate-200 rounded-l-none"
                    />
                  </div>
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-800">
                  Your budget
                </label>
                <Input
                  placeholder="AED 2 million"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                  className="bg-slate-50 border-slate-200"
                />
              </div>

              {/* Property Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-800">
                  What you are looking for?
                </label>
                <div className="relative">
                  <select
                    value={formData.propertyType}
                    onChange={(e) =>
                      setFormData({ ...formData, propertyType: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-md px-3 py-2 text-slate-600 appearance-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {propertyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-800">
                  Content
                </label>
                <Textarea
                  placeholder="Write your message here"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="bg-slate-50 border-slate-200 min-h-[100px]"
                />
              </div>

              {/* reCAPTCHA Notice */}
              <p className="text-xs text-slate-500">
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="#" className="text-primary underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary underline">
                  Terms of Service
                </a>{" "}
                apply.
              </p>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-10 py-6 text-base font-medium"
              >
                Send message
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
