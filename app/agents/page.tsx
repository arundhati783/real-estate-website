import { createClient } from "@/lib/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Phone, Mail } from "lucide-react"

export const metadata = {
  title: "Agents | REM Real Estate",
  description: "Meet our expert real estate agents ready to help you find your dream property.",
}

interface Agent {
  id: string
  first_name: string
  last_name: string
  phone: string
  email: string
  image: string
  bio?: string
  specialization?: string
}

export default async function AgentsPage() {
  const supabase = await createClient()

  const { data: agents, error } = await supabase
    .from("agents")
    .select("*")
    .order("first_name", { ascending: true })

  if (error) {
    console.error("Error fetching agents:", error)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="bg-slate-50 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <nav className="flex justify-center items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-slate-600 hover:text-slate-900">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <span className="text-slate-400">Agents</span>
          </nav>

          {/* Title */}
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">
            Agents
          </h1>
        </div>
      </section>

      {/* Agents Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {agents && agents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {agents.map((agent: Agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">No agents found.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

function AgentCard({ agent }: { agent: Agent }) {
  return (
    <div className="group">
      {/* Profile Image */}
      <div className="relative aspect-[4/5] mb-4 overflow-hidden">
        <Image
          src={agent.image || "/placeholder.svg"}
          alt={`${agent.first_name} ${agent.last_name}`}
          fill
          className="object-cover object-top"
        />
      </div>

      {/* Agent Info */}
      <div className="space-y-1">
        {/* Name - Split into two lines */}
        <h3 className="font-serif text-xl font-bold text-slate-900">
          {agent.first_name}
        </h3>
        <p className="font-serif text-xl font-bold text-slate-900">
          {agent.last_name}
        </p>

        {/* Contact Info */}
        <div className="pt-3 space-y-2">
          {/* Phone */}
          <a 
            href={`tel:${agent.phone}`}
            className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Phone className="h-4 w-4 text-slate-500" />
            <span>{agent.phone}</span>
          </a>

          {/* Email */}
          <a 
            href={`mailto:${agent.email}`}
            className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition-colors"
          >
            <Mail className="h-4 w-4 text-slate-500" />
            <span>{agent.email}</span>
          </a>
        </div>
      </div>
    </div>
  )
}
