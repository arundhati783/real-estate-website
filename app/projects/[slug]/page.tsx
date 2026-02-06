import { createClient } from "@/lib/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ProjectDetailClient } from "@/components/project-detail-client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  const { data: project } = await supabase
    .from("projects")
    .select("name, description")
    .eq("slug", slug)
    .single();
  
  if (!project) {
    return { title: "Project Not Found" };
  }
  
  return {
    title: `${project.name} | RealEstate`,
    description: project.description || `Explore ${project.name} - Premium real estate project in Dubai`,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();
  
  // Fetch project with developer info
  const { data: project, error } = await supabase
    .from("projects")
    .select(`
      *,
      developers (
        id,
        name,
        logo,
        description,
        website
      )
    `)
    .eq("slug", slug)
    .single();
  
  if (error || !project) {
    notFound();
  }
  
  // Fetch all related data from normalized tables in parallel
  const [
    { data: images },
    { data: typicalUnits },
    { data: files },
    { data: paymentPlans },
    { data: amenities },
    { data: nearbyPlaces },
    { data: parkings },
    { data: relatedProjects }
  ] = await Promise.all([
    // Project images for gallery
    supabase
      .from("project_images")
      .select("*")
      .eq("project_id", project.id)
      .order("display_order", { ascending: true }),
    
    // Typical units
    supabase
      .from("project_typical_units")
      .select("*")
      .eq("project_id", project.id)
      .order("display_order", { ascending: true }),
    
    // Downloadable files
    supabase
      .from("project_files")
      .select("*")
      .eq("project_id", project.id)
      .order("display_order", { ascending: true }),
    
    // Payment plans
    supabase
      .from("project_payment_plans")
      .select("*")
      .eq("project_id", project.id)
      .order("plan_name", { ascending: true })
      .order("display_order", { ascending: true }),
    
    // Amenities
    supabase
      .from("project_amenities")
      .select("*")
      .eq("project_id", project.id)
      .order("display_order", { ascending: true }),
    
    // Nearby places
    supabase
      .from("project_nearby_places")
      .select("*")
      .eq("project_id", project.id)
      .order("display_order", { ascending: true }),
    
    // Parking info
    supabase
      .from("project_parkings")
      .select("*")
      .eq("project_id", project.id)
      .order("display_order", { ascending: true }),
    
    // Related projects
    supabase
      .from("projects")
      .select("id, name, slug, location, price, completion_date, developer, category, status, featured, image")
      .neq("id", project.id)
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6)
  ]);
  
  // Combine all data into projectData object
  const projectData = {
    ...project,
    developer_info: project.developers,
    images: images || [],
    typical_units: typicalUnits || [],
    files: files || [],
    payment_plans: paymentPlans || [],
    amenities: amenities || [],
    nearby_places: nearbyPlaces || [],
    parkings: parkings || []
  };
  
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ProjectDetailClient project={projectData} relatedProjects={relatedProjects || []} />
      <Footer />
    </main>
  );
}
