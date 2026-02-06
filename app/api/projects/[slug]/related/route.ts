import { NextResponse } from "next/server";
import { createClient } from "@/lib/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  
  const supabase = await createClient();
  
  // First get the current project to find its category
  const { data: currentProject } = await supabase
    .from("projects")
    .select("id, category")
    .eq("slug", slug)
    .single();
  
  if (!currentProject) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
  
  // Get related projects (same category, excluding current project)
  const { data, error } = await supabase
    .from("projects")
    .select("id, name, slug, location, price, completion_date, developer, category, status, featured, image")
    .neq("id", currentProject.id)
    .order("featured", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(6);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}
