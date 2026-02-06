import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Stats } from "@/components/stats"
import { WhyChoose } from "@/components/why-choose"
import { TrendingProjects } from "@/components/trending-projects"
import { BestProperty } from "@/components/best-property"
import { Testimonials } from "@/components/testimonials"
import { Partners } from "@/components/partners"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* deployment trigger – safe to keep */}
      <h1 style={{ display: "none" }}>Deployment Trigger</h1>

      <Header />
      <Hero />
      <TrendingProjects />
      <Services />
      <Stats />
      <WhyChoose />
      <BestProperty />
      <Testimonials />
      <Partners />
      <Contact />
      <Footer />
    </main>
  )
}
