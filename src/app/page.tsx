import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock } from "lucide-react";
import Image from "next/image";

export default function WeddingSeatingChart() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <section className="container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-light text-gray-900 mb-8 leading-tight">
              Umar &amp; Ramsha&apos;s <span className="text-red-600 font-normal">Shaadi</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us in celebrating love and the beginning of our beautiful journey together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
            <div className="relative w-full h-[520px] overflow-hidden rounded-2xl shadow-2xl group">
              <Image
                src=""
                alt="Beautiful couple in traditional wedding attire"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            <div className="relative w-full h-[520px] overflow-hidden rounded-2xl shadow-2xl group">
              <Image
                src=""
                alt="Couple with beautiful floral backdrop"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
            <div className="text-center">
              <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Date</h3>
              <p className="text-lg text-gray-600">August 29, 2025</p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Time</h3>
              <p className="text-lg text-gray-600">6:00 PM</p>
            </div>

            <div className="text-center">
              <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Venue</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Crystal Banquet Hall
                <br />
                125 Chrysler Drive
                <br />
                Brampton, ON
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-16 py-6 text-xl font-medium rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-1"
            >
              View Seating Chart
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
