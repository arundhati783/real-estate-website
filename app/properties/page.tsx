import { createClient } from "@/lib/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PropertiesListClient } from "@/components/properties-list-client"

export const metadata = {
  title: "Properties | REM Real Estate",
  description: "Browse available properties for sale and rent in Dubai and UAE.",
}

interface SearchParams {
  page?: string
  keyword?: string
  location?: string
  category?: string
  status?: string
  perPage?: string
  sort?: string
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Parse query params
  const page = Number.parseInt(params.page || "1", 10)
  const perPage = Number.parseInt(params.perPage || "12", 10)
  const keyword = params.keyword || ""
  const location = params.location || ""
  const category = params.category || ""
  const status = params.status || ""
  const sort = params.sort || "default"

  // Calculate offset
  const offset = (page - 1) * perPage

  // Build query
  let query = supabase
    .from("properties")
    .select(`
      id,
      name,
      slug,
      description,
      location,
      price,
      price_type,
      property_type,
      status,
      featured,
      bedrooms,
      bathrooms,
      area,
      image,
      latitude,
      longitude
    `, { count: "exact" })

  // Apply filters
  if (keyword) {
    query = query.or(`name.ilike.%${keyword}%,description.ilike.%${keyword}%`)
  }
  if (location) {
    query = query.ilike("location", `%${location}%`)
  }
  if (category && category !== "All") {
    query = query.eq("property_type", category)
  }
  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  // Apply sorting
  switch (sort) {
    case "newest":
      query = query.order("created_at", { ascending: false })
      break
    case "price_asc":
      query = query.order("price", { ascending: true })
      break
    case "price_desc":
      query = query.order("price", { ascending: false })
      break
    default:
      query = query.order("featured", { ascending: false }).order("created_at", { ascending: false })
  }

  // Apply pagination
  query = query.range(offset, offset + perPage - 1)

  const { data: properties, count, error } = await query

  if (error) {
    console.error("Error fetching properties:", error)
  }

  const totalPages = Math.ceil((count || 0) / perPage)

  // Get unique locations and categories for filters
  const { data: allProperties } = await supabase
    .from("properties")
    .select("location, property_type")

  const locations = [...new Set(allProperties?.map(p => p.location).filter(Boolean) || [])]
  const categories = [...new Set(allProperties?.map(p => p.property_type).filter(Boolean) || [])]

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main>
        <PropertiesListClient
          properties={properties || []}
          totalCount={count || 0}
          totalPages={totalPages}
          currentPage={page}
          perPage={perPage}
          locations={locations}
          categories={categories}
          initialFilters={{
            keyword,
            location,
            category,
            status,
            sort,
          }}
        />
      </main>
      <Footer />
    </div>
  )
}
