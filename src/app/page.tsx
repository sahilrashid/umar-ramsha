import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock } from "lucide-react"
import Image from "next/image"

export default function WeddingSeatingChart() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Main Title */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6">
              Umar & Ramsha's <span className="text-red-600">Shaadi</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join us in celebrating love and the beginning of our beautiful journey together
            </p>
          </div>

          {/* Images Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src="/elegant-wedding-couple-in-traditional-attire.png"
                alt="Beautiful couple in traditional wedding attire"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
            <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg bg-gray-100">
              <Image
                src="/wedding-couple-with-floral-backdrop.png"
                alt="Couple with beautiful floral backdrop"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-red-100 transition-colors">
                <Calendar className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Date</h3>
              <p className="text-gray-600">August 29, 2025</p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-red-100 transition-colors">
                <Clock className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Time</h3>
              <p className="text-gray-600">6:00 PM</p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-red-100 transition-colors">
                <MapPin className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Venue</h3>
              <p className="text-gray-600">
                Crystal Banquet Hall
                <br />
                125 Chrysler Drive
                <br />
                Brampton, ON
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              View Seating Chart
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
