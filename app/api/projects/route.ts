import { NextResponse } from "next/server";
import { createClient } from "@/lib/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  
  const supabase = await createClient();
  
  let query = supabase.from("projects").select("*").order("created_at", { ascending: false });
  
  if (category && category !== "View All") {
    query = query.eq("category", category);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json(data);
}
