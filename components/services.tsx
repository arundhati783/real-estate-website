import { ArrowRight, Home, Key, DollarSign } from "lucide-react"
import Link from "next/link"

const services = [
  {
    icon: Home,
    title: "Buy A New Home",
    description:
      "Discover your dream home effortlessly. Explore diverse properties and expert guidance for a seamless buying experience.",
    label: "BUY",
  },
  {
    icon: Key,
    title: "Rent A Home",
    description:
      "Discover your perfect rental effortlessly. Explore a diverse variety of listings tailored precisely to suit your unique lifestyle needs.",
    label: "RENT",
  },
  {
    icon: DollarSign,
    title: "Sell A Home",
    description:
      "Sell confidently with expert guidance and effective strategies, showcasing your property's best features for a successful sale.",
    label: "SALE",
  },
]

export function Services() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="text-primary text-sm uppercase tracking-widest font-medium">
              OUR SERVICES
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-slate-800 font-bold mt-3">
              What We Do?
            </h2>
          </div>
          <Link
            href="/services"
            className="flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all mt-4 md:mt-0"
          >
            View All Services
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group">
              {/* Icon Box */}
              <div className="mb-6">
                <div className="relative w-20 h-20 border-2 border-slate-200 rounded-lg flex items-center justify-center group-hover:border-primary transition-colors">
                  <service.icon className="h-8 w-8 text-slate-600 group-hover:text-primary transition-colors" />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white px-2 text-xs font-bold text-slate-800 border border-slate-200 rounded">
                    {service.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-semibold text-slate-800 mb-4">
                {service.title}
              </h3>
              <p className="text-slate-500 leading-relaxed mb-4">
                {service.description}
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              >
                Learn More
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
