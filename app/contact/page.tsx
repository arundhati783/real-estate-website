"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Facebook, Youtube, Linkedin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    subject: "",
    budget: "",
    lookingFor: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-slate-50 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <nav className="text-sm text-slate-500 mb-4">
              <Link href="/" className="hover:text-slate-700">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-slate-700">Contact Us</span>
            </nav>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900">
              Contact Us
            </h1>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Form - Left Column */}
              <div className="lg:col-span-2">
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-3">
                  Drop Us A Line
                </h2>
                <p className="text-slate-600 mb-8">
                  Feel free to connect with us through our online channels for updates, news, and more.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="w-full rounded-lg border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="w-full rounded-lg border-slate-200"
                      />
                    </div>
                  </div>

                  {/* Address & Phone Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Address
                      </label>
                      <Input
                        type="text"
                        placeholder="Your address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full rounded-lg border-slate-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-2">
                        Phone
                      </label>
                      <div className="flex">
                        <div className="flex items-center gap-2 px-3 border border-r-0 border-slate-200 rounded-l-lg bg-slate-50">
                          <span className="text-lg">🇦🇪</span>
                          <span className="text-sm text-slate-600">+971</span>
                        </div>
                        <Input
                          type="tel"
                          placeholder="Your phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full rounded-l-none rounded-r-lg border-slate-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full rounded-lg border-slate-200"
                    />
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Your budget
                    </label>
                    <Input
                      type="text"
                      placeholder="AED 2 million"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full rounded-lg border-slate-200"
                    />
                  </div>

                  {/* What are you looking for */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      What you are looking for?
                    </label>
                    <select
                      value={formData.lookingFor}
                      onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="">Select an option</option>
                      <option value="apartment">Apartment (From AED 0.7 M)</option>
                      <option value="villa">Villa (From AED 2 M)</option>
                      <option value="townhouse">Townhouse (From AED 1.5 M)</option>
                      <option value="penthouse">Penthouse (From AED 5 M)</option>
                      <option value="office">Office Space</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-2">
                      Content
                    </label>
                    <Textarea
                      placeholder="Write your message here"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full rounded-lg border-slate-200 resize-none"
                    />
                  </div>

                  {/* reCAPTCHA Notice */}
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">
                      This site is protected by reCAPTCHA and the Google{" "}
                      <Link href="#" className="text-teal-600 hover:underline">Privacy Policy</Link>
                      {" "}and{" "}
                      <Link href="#" className="text-teal-600 hover:underline">Terms of Service</Link>
                      {" "}apply.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium"
                  >
                    Send message
                  </Button>
                </form>
              </div>

              {/* Contact Info Card - Right Column */}
              <div className="lg:col-span-1">
                <div className="bg-slate-50 rounded-xl p-8 sticky top-24">
                  <h3 className="font-serif text-2xl font-bold text-slate-900 mb-6">
                    Contact Us
                  </h3>

                  {/* Address */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Address:</h4>
                    <p className="text-slate-600">
                      Office 1101-2, Crystal Tower, Business Bay, Dubai
                    </p>
                  </div>

                  {/* Information */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Information:</h4>
                    <p className="text-slate-600">
                      0123 456 789, contact@remapp.ae
                    </p>
                  </div>

                  {/* Open Time */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 mb-2">Open time:</h4>
                    <p className="text-slate-600">
                      Monday - Friday: 08:00 - 20:00
                    </p>
                    <p className="text-slate-600">
                      Saturday - Sunday: 10:00 - 18:00
                    </p>
                  </div>

                  {/* Social Links */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Follow Us:</h4>
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Youtube className="h-5 w-5" />
                      </a>
                      <a
                        href="#"
                        className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Google Map Section */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="rounded-xl overflow-hidden h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.178509394691!2d55.26188!3d25.18851!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f69d52b4b7d2d%3A0x2c1ebf0fc9c9c9f5!2sBusiness%20Bay%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/971553986055"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
      >
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* Scroll to Top Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-24 right-6 z-50 w-12 h-12 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 transition-colors"
      >
        <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  )
}
