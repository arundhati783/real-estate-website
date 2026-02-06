"use client"

import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Check, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// Testimonials data
const testimonials = [
  {
    id: 1,
    text: "This agency's professionalism and market insights helped me sell my home faster than expected and at a great price. They handled every step with care and expertise.",
    name: "Mudassar Naeem",
    role: "Grateful Seller",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    id: 2,
    text: "Working with this real estate agency made the entire home-buying process seamless. Their professionalism and market knowledge ensured that we found the perfect home!",
    name: "Michael Johnson",
    role: "Happy Homeowner",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    text: "Outstanding service from start to finish! The team went above and beyond to find us the perfect property within our budget. Highly recommend their services.",
    name: "Sarah Williams",
    role: "First-time Buyer",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
  },
  {
    id: 4,
    text: "Exceptional experience! Their attention to detail and commitment to client satisfaction made selling our family home a stress-free process.",
    name: "Ahmed Hassan",
    role: "Satisfied Client",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  }
]

// Custom hook for scroll-triggered animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

export function AboutContent() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    subject: "",
    budget: "",
    propertyType: "",
    message: ""
  })

  // Auto-scroll testimonials every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.ceil(testimonials.length / 2))
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Scroll animation refs for sections after testimonials
  const partnersAnimation = useScrollAnimation()
  const contactAnimation = useScrollAnimation()
  const ctaAnimation = useScrollAnimation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="bg-white">
      {/* 1) PAGE HEADER / BREADCRUMB */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-slate-500 mb-4">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-slate-900">About Us</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">About Us</h1>
        </div>
      </section>

      {/* 2) INTRODUCTION SECTION */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
                Welcome To The<br />Your Agency
              </h2>
            </div>
            <div>
              <p className="text-slate-600 leading-relaxed mb-6">
                Welcome to Your Agency, where we turn houses into homes and dreams into reality. At Your Agency, 
                we understand that a home is more than just a physical space; it&apos;s a place where memories are 
                created, families grow, and life unfolds.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-red-500 font-medium hover:gap-3 transition-all group"
              >
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3) WHY CHOOSE US + 4) SERVICE CARDS - Combined Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left: Why Choose Us */}
            <div>
              <span className="text-red-500 font-semibold text-sm tracking-wider uppercase mb-3 block">
                WHY CHOOSE US
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Discover What Sets Our Real Estate Expertise Apart
              </h2>
              <p className="text-slate-600 leading-relaxed mb-8">
                At Your Agency, our unwavering commitment lies in crafting unparalleled real estate journeys. 
                Our seasoned professionals, armed with extensive market knowledge, walk alongside you through 
                every phase of your property endeavor. We prioritize understanding your unique aspirations, 
                tailoring our expertise to match your vision.
              </p>
              
              {/* Bullet Points with Green Checkmarks */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-slate-800 font-medium">Transparent Partnerships</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-slate-800 font-medium">Proven Expertise</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-slate-800 font-medium">Customized Solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-slate-800 font-medium">Local Area Knowledge</span>
                </div>
              </div>

              <Link 
                href="/contact" 
                className="inline-flex items-center gap-2 text-slate-900 font-medium border-b border-slate-900 pb-1 hover:text-red-500 hover:border-red-500 transition-colors group"
              >
                Contact Us
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Right: Service Cards */}
            <div className="space-y-6">
              {/* Buy Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="12" y="28" width="40" height="28" rx="2" />
                      <path d="M8 32L32 12L56 32" />
                      <rect x="26" y="40" width="12" height="16" />
                      <text x="32" y="52" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none">BUY</text>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">Buy A New Home</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Discover your dream home effortlessly. Explore diverse properties and expert 
                      guidance for a seamless buying experience.
                    </p>
                    <Link 
                      href="/projects" 
                      className="inline-flex items-center gap-1 text-red-500 font-medium text-sm hover:gap-2 transition-all group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Rent Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="12" y="28" width="40" height="28" rx="2" />
                      <path d="M8 32L32 12L56 32" />
                      <rect x="26" y="40" width="12" height="16" />
                      <text x="32" y="52" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none">RENT</text>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">Rent A Home</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Discover your perfect rental effortlessly. Explore a diverse variety of listings 
                      tailored precisely to suit your unique lifestyle needs.
                    </p>
                    <Link 
                      href="/projects" 
                      className="inline-flex items-center gap-1 text-red-500 font-medium text-sm hover:gap-2 transition-all group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sell Card */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="12" y="28" width="40" height="28" rx="2" />
                      <path d="M8 32L32 12L56 32" />
                      <rect x="26" y="40" width="12" height="16" />
                      <text x="32" y="52" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none">SALE</text>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">Sell A Home</h3>
                    <p className="text-slate-600 text-sm mb-4">
                      Sell confidently with expert guidance and effective strategies, showcasing your 
                      property&apos;s best features for a successful sale.
                    </p>
                    <Link 
                      href="/contact" 
                      className="inline-flex items-center gap-1 text-red-500 font-medium text-sm hover:gap-2 transition-all group"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6) TESTIMONIALS SECTION - Auto-scrolling Slider */}
      <section 
        className="py-16 lg:py-24 overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-red-500 font-semibold text-sm tracking-wider uppercase mb-3 block">
              TOP PROPERTIES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900">
              What&apos;s People Say&apos;s
            </h2>
          </div>
          
          {/* Testimonial Slider */}
          <div className="relative max-w-5xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {/* Slide Groups - 2 testimonials per slide */}
                {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-8">
                      {testimonials.slice(slideIndex * 2, slideIndex * 2 + 2).map((testimonial) => (
                        <div 
                          key={testimonial.id} 
                          className="bg-white p-8 transition-opacity duration-500"
                          style={{ 
                            opacity: currentSlide === slideIndex ? 1 : 0.5,
                            transform: currentSlide === slideIndex ? 'scale(1)' : 'scale(0.98)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                          }}
                        >
                          <div className="flex gap-1 mb-6">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-slate-700 leading-relaxed mb-8">
                            {testimonial.text}
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-200">
                              <Image
                                src={testimonial.image || "/placeholder.svg"}
                                alt={testimonial.name}
                                width={56}
                                height={56}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-serif font-bold text-slate-900">{testimonial.name}</p>
                              <p className="text-sm text-slate-500">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {Array.from({ length: Math.ceil(testimonials.length / 2) }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-3 h-3 rounded-full border-2 border-red-500 bg-transparent' 
                    : 'w-2 h-2 rounded-full bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5) PARTNER LOGOS SECTION - With Scroll Animation */}
      <section 
        ref={partnersAnimation.ref}
        className={`py-16 bg-white border-y border-slate-100 transition-all duration-700 ease-out ${
          partnersAnimation.isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20">
            {['SOBHA', 'AZIZI', 'ELLINGTON', 'MAG', 'EMAAR'].map((partner, index) => (
              <span 
                key={partner}
                className="font-serif text-2xl font-bold text-slate-300 tracking-widest transition-all duration-500 hover:text-slate-500"
                style={{ 
                  transitionDelay: partnersAnimation.isVisible ? `${index * 100}ms` : '0ms',
                  opacity: partnersAnimation.isVisible ? 1 : 0,
                  transform: partnersAnimation.isVisible ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7) CONTACT / CTA SECTION - With Scroll Animation */}
      <section 
        ref={contactAnimation.ref}
        className="relative py-20 lg:py-28 overflow-hidden"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80"
            alt="Dubai skyline"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Content */}
            <div 
              className={`text-white pt-8 transition-all duration-700 ease-out ${
                contactAnimation.isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8'
              }`}
            >
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                We&apos;re Always Eager To Hear From You!
              </h2>
              <span className="text-sm font-semibold tracking-wider uppercase text-slate-400 mb-6 block">
                CONTACT US
              </span>
              <p className="text-slate-300 leading-relaxed">
                Do you have any questions, inquiries, or require assistance? We are here to support you! 
                Whether you seek additional information about our services
              </p>
            </div>

            {/* Contact Form */}
            <div 
              className={`bg-white rounded-xl p-8 shadow-2xl transition-all duration-700 ease-out delay-200 ${
                contactAnimation.isVisible 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8'
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white border-slate-200"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Address
                    </label>
                    <Input
                      name="address"
                      placeholder="Your address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-white border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Phone
                    </label>
                    <div className="flex">
                      <div className="flex items-center gap-1 px-3 border border-r-0 border-slate-200 rounded-l-md bg-slate-50">
                        <span className="text-sm">🇦🇪</span>
                        <span className="text-sm text-slate-600">+971</span>
                      </div>
                      <Input
                        name="phone"
                        placeholder="Your phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white border-slate-200 rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-white border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Your budget
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">AED 2 million</option>
                    <option value="under-1m">Under AED 1M</option>
                    <option value="1m-2m">AED 1M - 2M</option>
                    <option value="2m-5m">AED 2M - 5M</option>
                    <option value="5m-10m">AED 5M - 10M</option>
                    <option value="above-10m">Above AED 10M</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    What you are looking for?
                  </label>
                  <select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Appartment (From AED 0.7 M)</option>
                    <option value="apartment">Apartment</option>
                    <option value="villa">Villa</option>
                    <option value="townhouse">Townhouse</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-900 mb-2">
                    Content
                  </label>
                  <Textarea
                    name="message"
                    placeholder="Write your message here"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-white border-slate-200 resize-none"
                  />
                </div>
                <p className="text-xs text-slate-500">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
                <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white px-8">
                  Send message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 8) BECOME PARTNERS CTA SECTION - With Scroll Animation */}
      <section ref={ctaAnimation.ref} className="py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2">
            {/* Left: Text Content */}
            <div 
              className={`bg-white px-8 lg:px-16 py-16 lg:py-24 flex flex-col justify-center transition-all duration-700 ease-out ${
                ctaAnimation.isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <span className="text-red-500 font-semibold text-sm tracking-wider uppercase mb-4 block">
                BECOME PARTNERS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-8 leading-tight">
                List your Properties on Your Agency, join Us Now!
              </h2>
              <div>
                <Button className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-base">
                  Contact Us
                </Button>
              </div>
            </div>
            {/* Right: Image */}
            <div 
              className={`relative h-80 lg:h-auto transition-all duration-700 ease-out delay-150 ${
                ctaAnimation.isVisible 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              }`}
            >
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                alt="Property in hand"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
