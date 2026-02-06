"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin, Tag, Building2, DollarSign, AlertCircle, Download, ChevronDown, ExternalLink, FileText, Car, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Normalized database interfaces
interface ProjectImage {
  id: string
  project_id: string
  image_url: string
  is_primary: boolean
  display_order: number
  alt_text: string | null
}

interface TypicalUnit {
  id: string
  project_id: string
  bedrooms: string
  price_min: string
  price_max: string
  area_min: number
  area_max: number
  floor_plan_image: string | null
  display_order: number
}

interface ProjectFile {
  id: string
  project_id: string
  name: string
  file_url: string
  file_type: string
  display_order: number
}

interface ProjectPaymentPlan {
  id: string
  project_id: string
  plan_name: string
  milestone: string
  percentage: number
  payment_count: number
  display_order: number
}

interface ProjectAmenity {
  id: string
  project_id: string
  name: string
  description: string | null
  image: string | null
  display_order: number
}

interface ProjectNearbyPlace {
  id: string
  project_id: string
  name: string
  distance: string
  display_order: number
}

interface ProjectParking {
  id: string
  project_id: string
  unit_type: string
  parking_count: number
  display_order: number
}

interface DeveloperInfo {
  id: string
  name: string
  logo: string | null
  description: string | null
  website: string | null
}

interface Project {
  id: string
  name: string
  slug: string
  location: string
  price: string
  price_max: string | null
  completion_date: string
  developer: string
  category: string
  status: string
  featured: boolean
  image: string
  description: string | null
  video_url: string | null
  general_plan_image: string | null
  latitude: number | null
  longitude: number | null
  coordinates: string | null
  address: string | null
  // Normalized data from related tables
  developer_info: DeveloperInfo | null
  images: ProjectImage[]
  typical_units: TypicalUnit[]
  files: ProjectFile[]
  payment_plans: ProjectPaymentPlan[]
  amenities: ProjectAmenity[]
  nearby_places: ProjectNearbyPlace[]
  parkings: ProjectParking[]
}

interface RelatedProject {
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

interface ProjectDetailClientProps {
  project: Project
  relatedProjects?: RelatedProject[]
}

const tabs = [
  { id: "description", label: "Description" },
  { id: "general-plan", label: "General plan" },
  { id: "typical-units", label: "Typical units" },
  { id: "files", label: "Files" },
  { id: "payment-plans", label: "Payment plans" },
  { id: "amenities", label: "Amenities" },
  { id: "location", label: "Location" },
  { id: "developer-info", label: "Developer info" },
]

interface PaymentMilestone {
  milestone: string
  percentage: number
  payments: number
}

export function ProjectDetailClient({ project, relatedProjects = [] }: ProjectDetailClientProps) {
  const [activeTab, setActiveTab] = useState("description")
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const galleryImages = [...(project.images || [])].map(img => img.image_url || "/placeholder.svg")
  const hasImageUnits = false // Declare hasImageUnits variable
  const rawUnits = [] // Declare rawUnits variable

  // Use images from normalized project_images table
  const sortedImages = [...(project.images || [])].sort((a, b) => a.display_order - b.display_order)
  const primaryImage = sortedImages.find(img => img.is_primary) || sortedImages[0]
  const mainImage = primaryImage?.image_url || project.image || "/placeholder.svg"
  const sideImages = sortedImages.filter(img => img.id !== primaryImage?.id).slice(0, 4)
  const allGalleryImages = sortedImages.length > 0 ? sortedImages : (project.image ? [{ id: '1', image_url: project.image, alt_text: project.name, is_primary: true, display_order: 1, project_id: project.id }] : [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      setActiveTab(sectionId)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = tabs.map(tab => document.getElementById(tab.id))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveTab(tabs[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Photo Gallery */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2 lg:row-span-2 relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[400px] rounded-lg overflow-hidden">
            <Image
              src={mainImage || "/placeholder.svg"}
              alt={project.name}
              fill
              className="object-cover"
              priority
            />
            <Button
              className="absolute bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white"
              onClick={() => setShowAllPhotos(true)}
            >
              View All Photos ({allGalleryImages.length})
            </Button>
          </div>
          
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {sideImages.map((img) => (
              <div key={img.id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={img.image_url || "/placeholder.svg"}
                  alt={img.alt_text || `${project.name} - Image`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {/* Fill empty slots with placeholders if needed */}
            {Array.from({ length: Math.max(0, 4 - sideImages.length) }).map((_, index) => (
              <div key={`empty-${index}`} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-200" />
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <nav className="border-b border-border sticky top-0 bg-white z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-6 -mb-px scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => scrollToSection(tab.id)}
                className={`py-4 px-1 whitespace-nowrap font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-red-500 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* All Sections */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section id="description">
          <DescriptionTab project={project} />
        </section>

        <section id="general-plan">
          <GeneralPlanTab project={project} />
        </section>

        <section id="typical-units">
          <TypicalUnitsTab project={project} />
        </section>

        <section id="files">
          <FilesTab project={project} />
        </section>

        <section id="payment-plans">
          <PaymentPlansTab project={project} />
        </section>

        <section id="amenities">
          <AmenitiesTab project={project} />
        </section>

        <section id="location">
          <LocationTab project={project} />
        </section>

        <section id="developer-info">
          <DeveloperInfoTab project={project} />
        </section>

        {/* Featured Properties Section */}
        {relatedProjects.length > 0 && (
          <section className="pt-8">
            <RelatedProjectsSection relatedProjects={relatedProjects} />
          </section>
        )}
      </div>

      {/* Photo Modal */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setShowAllPhotos(false)}
            className="absolute top-4 right-4 text-white text-xl font-bold hover:text-slate-300 z-10"
          >
            Close
          </button>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[90vh] overflow-y-auto p-4">
            {allGalleryImages.map((img) => (
              <div key={img.id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={img.image_url || "/placeholder.svg"}
                  alt={img.alt_text || `${project.name} - Image`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function DescriptionTab({ project }: { project: Project }) {
  return (
    <div className="space-y-6">
      {/* Info Notice */}
      <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
        <span className="text-red-600 font-medium">
          This data is for information purpose only.
        </span>
      </div>

      {/* Project Title & Price */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div>
            <span className="inline-block bg-teal-500 text-white text-xs px-3 py-1 rounded mb-3">
              {project.status}
            </span>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-slate-900">
              {project.name}
            </h1>
          </div>
          <div className="text-right">
            <span className="text-slate-500 text-sm">Start from:</span>
            <p className="text-2xl lg:text-3xl font-bold text-slate-900">
              {project.price}
            </p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="h-5 w-5 text-red-500" />
            <span className="font-medium">Completion Date:</span>
            <span>{project.completion_date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <MapPin className="h-5 w-5 text-red-500" />
            <span>{project.location}</span>
          </div>
        </div>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <Tag className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <span className="text-slate-500 text-sm">Type:</span>
              <p className="font-semibold text-slate-900">{project.category}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <span className="text-slate-500 text-sm">Developer:</span>
              <p className="font-semibold text-slate-900">{project.developer}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <span className="text-slate-500 text-sm">Price:</span>
              <p className="font-semibold text-slate-900">
                {project.price}{project.price_max ? ` - ${project.price_max}` : ""}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      {project.video_url && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Video</h2>
          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src={project.video_url.replace("watch?v=", "embed/")}
              title={`${project.name} Video`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Description */}
      {project.description && (
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">About This Project</h2>
          <p className="text-slate-600 leading-relaxed">{project.description}</p>
        </div>
      )}
    </div>
  )
}

function GeneralPlanTab({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">General plan</h2>
      {project.general_plan_image ? (
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={project.general_plan_image || "/placeholder.svg"}
            alt={`${project.name} General Plan`}
            fill
            className="object-contain bg-slate-100"
          />
        </div>
      ) : (
        <div className="bg-slate-100 rounded-xl p-12 text-center text-slate-500">
          General plan not available for this project.
        </div>
      )}
    </div>
  )
}

function TypicalUnitsTab({ project }: { project: Project }) {
  // Use data from normalized project_typical_units table
  const units = project.typical_units || []
  
  // Format bedroom label
  const getBedroomLabel = (bedrooms: number) => {
    if (bedrooms === 0) return "Studio"
    return `${bedrooms}Bedrooms`
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Typical units</h2>
      
      {units.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {units.map((unit) => (
            <div key={unit.id} className="border border-slate-200 rounded-xl overflow-hidden">
              {/* Floor Plan Image Area */}
              <div className="relative aspect-[4/3] bg-slate-50 p-4">
                {unit.floor_plan_image ? (
                  <Image
                    src={unit.floor_plan_image || "/placeholder.svg"}
                    alt={`${getBedroomLabel(unit.bedrooms)} floor plan`}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-48 h-48 text-slate-300" viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="20" y="20" width="160" height="160" />
                      <line x1="20" y1="100" x2="180" y2="100" />
                      <line x1="100" y1="20" x2="100" y2="180" />
                      <rect x="40" y="40" width="40" height="40" />
                      <rect x="120" y="120" width="40" height="40" />
                    </svg>
                  </div>
                )}
              </div>
              {/* Unit Info */}
              <div className="p-4">
                <span className="inline-block bg-amber-100 text-amber-800 text-sm px-3 py-1 rounded mb-3">
                  {getBedroomLabel(unit.bedrooms)}
                </span>
                <p className="font-serif text-xl font-bold text-slate-900 mb-1">
                  {unit.price_min} - {unit.price_max}
                </p>
                <p className="text-slate-500 text-sm">
                  {unit.area_min} sqft - {unit.area_max} sqft
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-100 rounded-xl p-12 text-center text-slate-500">
          Typical units information not available for this project.
        </div>
      )}
    </div>
  )
}

function FilesTab({ project }: { project: Project }) {
  // Use data from normalized project_files table
  const files = project.files || []
  // Use data from normalized project_parkings table
  const parkings = project.parkings || []

  return (
    <div className="space-y-6">
      {/* Attachments Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Attachments</h2>
        {files.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file) => (
              <a
                key={file.id}
                href={file.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-lg transition-colors group"
              >
                {/* Yellow folder icon */}
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg className="w-10 h-10" viewBox="0 0 48 48" fill="none">
                    <path d="M8 12C8 10.8954 8.89543 10 10 10H18L22 14H38C39.1046 14 40 14.8954 40 16V36C40 37.1046 39.1046 38 38 38H10C8.89543 38 8 37.1046 8 36V12Z" fill="#FCD34D"/>
                    <path d="M8 16H40V36C40 37.1046 39.1046 38 38 38H10C8.89543 38 8 37.1046 8 36V16Z" fill="#FBBF24"/>
                  </svg>
                </div>
                <span className="font-medium text-slate-900 group-hover:text-primary transition-colors">
                  {file.name}
                </span>
                <Download className="h-5 w-5 text-slate-400 ml-auto" />
              </a>
            ))}
          </div>
        ) : (
          <div className="text-slate-500 text-center py-8">
            No attachments available for this project.
          </div>
        )}
      </div>

      {/* Parkings Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Parkings</h2>
        {parkings.length > 0 ? (
          <div className="space-y-4">
            {parkings.map((parking) => (
              <div key={parking.id} className="flex justify-between items-center py-2">
                <span className="text-slate-700">{parking.unit_type}</span>
                <span className="text-slate-900 font-medium">
                  {parking.parking_count} parking{parking.parking_count > 1 ? 's' : ''}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-500 text-center py-8">
            No parking information available for this project.
          </div>
        )}
      </div>
    </div>
  )
}

function PaymentPlansTab({ project }: { project: Project }) {
  const [activePaymentPlan, setActivePaymentPlan] = useState(0)
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>([])

  // Use data from normalized project_payment_plans table
  const allPaymentPlans = project.payment_plans || []
  
  // Group payment plans by plan_name
  const planNames = [...new Set(allPaymentPlans.map(p => p.plan_name))]
  const activePlanName = planNames[activePaymentPlan] || planNames[0]
  const milestones = allPaymentPlans
    .filter(p => p.plan_name === activePlanName)
    .sort((a, b) => a.display_order - b.display_order)

  const toggleMilestone = (id: string) => {
    setExpandedMilestones(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  if (allPaymentPlans.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Payment plans</h2>
        <div className="text-slate-500 text-center py-8">
          No payment plans available for this project.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Payment plans</h2>
      
      {/* Payment Plan Tabs */}
      {planNames.length > 1 && (
        <div className="flex gap-6 border-b border-slate-200 mb-8">
          {planNames.map((planName, index) => (
            <button
              key={planName}
              type="button"
              onClick={() => setActivePaymentPlan(index)}
              className={`pb-3 font-medium text-sm border-b-2 transition-colors ${
                activePaymentPlan === index
                  ? "border-slate-900 text-slate-900"
                  : "border-transparent text-slate-500 hover:text-slate-700"
              }`}
            >
              {planName}
            </button>
          ))}
        </div>
      )}

      {/* Timeline */}
      <div className="relative mb-12">
        <div className="flex justify-between items-center">
          {milestones.map((milestone, index) => (
            <div key={milestone.id} className="flex flex-col items-center flex-1">
              <div className="relative w-full">
                {/* Line */}
                {index < milestones.length - 1 && (
                  <div className="absolute top-3 left-1/2 w-full h-0.5 bg-slate-200" />
                )}
                {/* Dot */}
                <div className="relative z-10 w-6 h-6 mx-auto rounded-full bg-slate-300" />
              </div>
              <p className="text-xl font-bold text-slate-900 mt-4">{milestone.percentage}%</p>
              <p className="text-slate-500 text-sm">{milestone.milestone}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Milestone Details */}
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="border-b border-slate-100 last:border-0">
            <button
              type="button"
              onClick={() => toggleMilestone(milestone.id)}
              className="w-full flex justify-between items-center py-4 text-left"
            >
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-900">{milestone.milestone}</h3>
                {milestone.payment_count > 0 && (
                  <p className="text-slate-500 text-sm">{milestone.payment_count} payment{milestone.payment_count > 1 ? 's' : ''}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">{milestone.percentage}%</span>
                <ChevronDown className={`h-5 w-5 text-slate-400 transition-transform ${expandedMilestones.includes(milestone.id) ? 'rotate-180' : ''}`} />
              </div>
            </button>
            {expandedMilestones.includes(milestone.id) && (
              <div className="pb-4 text-slate-600">
                <p>Payment details for {milestone.milestone} phase.</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function AmenitiesTab({ project }: { project: Project }) {
  // Use data from normalized project_amenities table
  const amenities = project.amenities || []
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Amenities and features</h2>
      {amenities.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="group">
              {amenity.image && (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <Image
                    src={amenity.image || "/placeholder.svg"}
                    alt={amenity.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <h3 className="font-semibold text-slate-900">{amenity.name}</h3>
              {amenity.description && (
                <p className="text-sm text-slate-500">{amenity.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-100 rounded-xl p-12 text-center text-slate-500">
          Amenities information not available for this project.
        </div>
      )}
    </div>
  )
}

function LocationTab({ project }: { project: Project }) {
  // Use data from normalized project_nearby_places table
  const nearbyPlaces = project.nearby_places || []

  const coordinates = project.coordinates || "25°02'58.1\"N 55°14'56.7\"E"
  const address = project.address || project.location

  return (
    <div className="space-y-6">
      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <h2 className="font-serif text-xl font-bold text-slate-900 p-6 pb-0">Location</h2>
        
        {/* Map */}
        <div className="relative">
          {project.latitude && project.longitude ? (
            <div className="aspect-[16/9] relative">
              <iframe
                src={`https://www.google.com/maps?q=${project.latitude},${project.longitude}&z=14&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${project.name} Location`}
                className="w-full h-full"
              />
              {/* Info Card Overlay */}
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
                <p className="font-mono text-sm font-medium text-slate-900 mb-1">{coordinates}</p>
                <p className="text-slate-500 text-sm mb-3">{address}</p>
                <div className="flex items-center gap-4">
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${project.latitude},${project.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 text-sm hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Directions
                  </a>
                  <a 
                    href={`https://www.google.com/maps?q=${project.latitude},${project.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View larger map
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="aspect-[16/9] bg-slate-100 flex items-center justify-center">
              <p className="text-slate-500">Map location not available</p>
            </div>
          )}
        </div>

        {/* Address */}
        <div className="p-6 border-t border-slate-100">
          <h3 className="font-semibold text-slate-900 mb-2">Address</h3>
          <p className="text-slate-600">{project.location}</p>
        </div>
      </div>

      {/* Nearby Places */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-serif text-xl font-bold text-slate-900 mb-6">Nearby places</h2>
        {nearbyPlaces.length > 0 ? (
          <div className="space-y-4">
            {nearbyPlaces.map((place) => (
              <div key={place.id} className="flex justify-between items-center py-2">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <span className="text-slate-700">{place.name}</span>
                </div>
                <span className="text-slate-500">{place.distance}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-slate-500 text-center py-8">
            No nearby places information available for this project.
          </div>
        )}
      </div>
    </div>
  )
}

function DeveloperInfoTab({ project }: { project: Project }) {
  const developerDescription = project.developer_info?.description || 
    `We are an international luxury real estate developer committed to redefining the art of living by building sustainable communities. Founded in 1976 by PNC Menon, a legendary innovator in the real estate industry, as an interior design business in Oman, we have established our presence all over the world with developments and investments in UAE, Oman, Bahrain, Brunei and India.`

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        {/* Developer Logo */}
        <div className="w-16 h-16 rounded-xl bg-slate-900 flex items-center justify-center overflow-hidden">
          {project.developer_info?.logo ? (
            <Image
              src={project.developer_info.logo || "/placeholder.svg"}
              alt={project.developer}
              width={64}
              height={64}
              className="object-contain"
            />
          ) : (
            <span className="text-white text-2xl font-serif font-bold">
              {project.developer.charAt(0)}
            </span>
          )}
        </div>
        <h2 className="font-serif text-2xl font-bold text-slate-900">{project.developer}</h2>
      </div>
      <p className="text-slate-600 leading-relaxed">
        {developerDescription}
      </p>
    </div>
  )
}

interface RelatedProjectCardProps {
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

function RelatedProjectsSection({ relatedProjects }: { relatedProjects: RelatedProjectCardProps[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="bg-slate-50 -mx-4 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <span className="text-red-500 font-semibold text-sm tracking-wider uppercase">
            FEATURED PROPERTIES
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-slate-900 mt-2">
            The Most Recent Estate
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors hidden md:flex"
          >
            <ChevronLeft className="h-5 w-5 text-slate-600" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-slate-50 transition-colors hidden md:flex"
          >
            <ChevronRight className="h-5 w-5 text-slate-600" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {relatedProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="flex-shrink-0 w-[350px] md:w-[400px] snap-start"
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                  {/* Image */}
                  <div className="relative h-56">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover"
                    />
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs px-3 py-1 rounded font-medium">
                        {project.status}
                      </span>
                    </div>
                    {/* Heart Icon */}
                    <button
                      type="button"
                      onClick={(e) => e.preventDefault()}
                      className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <Heart className="h-5 w-5 text-slate-400" />
                    </button>
                    {/* Category Badge */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs px-3 py-1 rounded font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-xl font-semibold text-slate-900 mb-2">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 mb-4">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span className="text-sm">{project.location}</span>
                    </div>

                    {/* Price & Completion */}
                    <div className="flex justify-between items-start py-4 border-t border-slate-100">
                      <div>
                        <span className="text-xs text-slate-500 block">Price from:</span>
                        <span className="font-semibold text-slate-900">{project.price}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-500 block">Completion Date:</span>
                        <span className="font-semibold text-slate-900">{project.completion_date}</span>
                      </div>
                    </div>

                    {/* Developer */}
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-sm text-slate-500">Developer: </span>
                      <span className="text-sm font-semibold text-slate-900">{project.developer}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
