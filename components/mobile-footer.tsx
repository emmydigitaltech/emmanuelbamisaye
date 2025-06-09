"use client"

import { Github, Linkedin, Mail, MapPin, Clock } from "lucide-react"
import { NewsletterForm } from "@/components/newsletter-form"

interface MobileFooterProps {
  handleWhatsAppClick: () => void
}

export function MobileFooter({ handleWhatsAppClick }: MobileFooterProps) {
  return (
    <div className="md:hidden">
      <div className="bg-gray-900 dark:bg-black text-white">
        <div className="p-6 space-y-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-lg font-bold">
                <span className="text-yellow-500">{"<"}</span>
                Portfolio
                <span className="text-yellow-500">{"/>"}</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Creating exceptional digital experiences through innovative web development and design solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 hover:bg-yellow-500 rounded-lg transition-colors group">
                <Github className="w-5 h-5 group-hover:text-black" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-yellow-500 rounded-lg transition-colors group">
                <Linkedin className="w-5 h-5 group-hover:text-black" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-yellow-500 rounded-lg transition-colors group">
                <Mail className="w-5 h-5 group-hover:text-black" />
              </a>
            </div>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Stay Updated</h3>
            <p className="text-gray-400 mb-4 text-sm leading-relaxed">
              Get the latest updates on web development trends, project insights, and exclusive content.
            </p>
            <NewsletterForm />
            <p className="text-xs text-gray-500 mt-3">No spam, unsubscribe at any time.</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Services</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Web Development",
                "UI/UX Design",
                "E-commerce Solutions",
                "Mobile Apps",
                "Performance Optimization",
                "Consulting",
              ].map((service) => (
                <a
                  key={service}
                  href="#"
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-sm py-1"
                >
                  {service}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Reviews", href: "#reviews" },
                { name: "Contact", href: "#contact" },
                { name: "Blog", href: "#" },
                { name: "FAQ", href: "#" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-yellow-500 transition-colors text-sm py-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-500">Get in Touch</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">your.email@example.com</span>
              </div>
              <button
                onClick={handleWhatsAppClick}
                className="flex items-center space-x-3 text-gray-400 hover:text-yellow-500 transition-colors cursor-pointer group"
              >
                <div className="w-4 h-4 flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-full h-full fill-yellow-500 group-hover:fill-yellow-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488" />
                  </svg>
                </div>
                <span className="text-sm">+234 905 754 2748</span>
              </button>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Lagos, Nigeria</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Mon - Fri: 9AM - 6PM</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 border-t border-gray-800">
            <p className="text-gray-400 text-xs text-center mb-4">
              © 2024 Portfolio. All rights reserved. Crafted with <span className="text-yellow-500">♥</span> and
              attention to detail.
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
