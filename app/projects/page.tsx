import { createClient } from "@/lib/server";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectsListClient } from "@/components/projects-list-client";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    keyword?: string;
    location?: string;
    category?: string;
    status?: string;
    sort?: string;
    perPage?: string;
  }>;
}

export const metadata = {
  title: "Projects | RealEstate",
  description: "Browse our collection of premium real estate projects in Dubai and UAE",
};

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  
  // Parse search params
  const page = parseInt(params.page || "1", 10);
  const perPage = parseInt(params.perPage || "12", 10);
  const keyword = params.keyword || "";
  const location = params.location || "";
  const category = params.category || "";
  const status = params.status || "";
  const sort = params.sort || "default";
  
  // Build query
  let query = supabase
    .from("projects")
    .select(`
      id,
      name,
      slug,
      location,
      price,
      completion_date,
      developer,
      category,
      status,
      featured,
      image
    `, { count: "exact" });
  
  // Apply filters
  if (keyword) {
    query = query.or(`name.ilike.%${keyword}%,developer.ilike.%${keyword}%`);
  }
  
  if (location) {
    query = query.ilike("location", `%${location}%`);
  }
  
  if (category && category !== "all") {
    query = query.eq("category", category);
  }
  
  if (status && status !== "all") {
    query = query.eq("status", status);
  }
  
  // Apply sorting
  switch (sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "completion":
      query = query.order("completion_date", { ascending: true });
      break;
    default:
      query = query.order("featured", { ascending: false }).order("created_at", { ascending: false });
  }
  
  // Apply pagination
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  query = query.range(from, to);
  
  // Execute query
  const { data: projects, count, error } = await query;
  
  if (error) {
    console.error("Error fetching projects:", error);
  }
  
  // Calculate total pages
  const totalCount = count || 0;
  const totalPages = Math.ceil(totalCount / perPage);
  
  // Get unique locations and categories for filters
  const { data: allProjects } = await supabase
    .from("projects")
    .select("location, category, status");
  
  const locations = [...new Set(allProjects?.map(p => p.location).filter(Boolean) || [])];
  const categories = [...new Set(allProjects?.map(p => p.category).filter(Boolean) || [])];
  const statuses = [...new Set(allProjects?.map(p => p.status).filter(Boolean) || [])];
  
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <ProjectsListClient 
        projects={projects || []}
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={page}
        perPage={perPage}
        filters={{
          keyword,
          location,
          category,
          status,
          sort
        }}
        filterOptions={{
          locations,
          categories,
          statuses
        }}
      />
      <Footer />
    </main>
  );
}
