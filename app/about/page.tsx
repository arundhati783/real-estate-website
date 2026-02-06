import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | REM Real Estate",
  description: "Learn about REM Real Estate - Your trusted partner in finding the perfect property in Dubai. Discover our mission, values, and commitment to excellence.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutContent />
      <Footer />
    </main>
  )
}
