"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Clock, Search, User } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function WeddingSeatingChart() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResult, setSearchResult] = useState<{
    name: string
    tableNumber: number
  } | null>(null)
  const [hasSearched, setHasSearched] = useState(false)
  const [isSearching, setIsSearching] = useState(false)

  // Mock data - replace with actual guest data
  const guestData = {
    "sahil rashid": { name: "Sahil Rashid", tableNumber: 23 },
    "john smith": { name: "John Smith", tableNumber: 15 },
    "sarah johnson": { name: "Sarah Johnson", tableNumber: 8 },
  }

  const handleSearch = async () => {
    setIsSearching(true)
    setHasSearched(false)

    // Simulate search delay for animation
    await new Promise((resolve) => setTimeout(resolve, 800))

    const query = searchQuery.toLowerCase().trim()
    const result = guestData[query as keyof typeof guestData]
    setSearchResult(result || null)
    setHasSearched(true)
    setIsSearching(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-4">
              <p className="text-2xl md:text-3xl text-amber-800 mb-2 tracking-wider">WELCOME TO</p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-amber-900 mb-4 leading-tight tracking-wide">UMAR &</h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-amber-900 mb-6 leading-tight tracking-wide">
              RAMSHA'S
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 mb-8 tracking-widest font-light">WEDDING RECEPTION</p>
            <div className="max-w-md mx-auto">
              <p className="text-sm text-amber-700 italic mb-2">"And we created you in pairs"</p>
              <p className="text-xs text-amber-700">Quran 78:8</p>
            </div>
          </div>

          {/* Images Section - Mobile-First Overlapping Design */}
          <div className="relative mb-16">
            {/* Mobile Layout - Overlapping Images */}
            <div className="relative max-w-sm mx-auto md:hidden">
              {/* First Image - Main focal point */}
              <div className="relative w-full h-80 rounded-3xl overflow-hidden shadow-lg bg-gray-100 group">
                <Image
                  src="/images/couple-1.jpg"
                  alt="Beautiful couple in traditional wedding attire"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
              </div>

              {/* Second Image - Overlapping */}
              <div className="relative w-4/5 h-64 rounded-3xl overflow-hidden shadow-lg bg-gray-100 group -mt-20 ml-auto mr-4">
                <Image
                  src="/images/couple-4.jpg"
                  alt="Couple with beautiful floral backdrop"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Decorative border for overlap effect */}
                <div className="absolute inset-0 border-4 border-white rounded-3xl"></div>
              </div>
            </div>

            <div className="hidden md:block max-w-5xl mx-auto">
              <div className="grid grid-cols-2 gap-8 lg:gap-12">
                {/* First Image */}
                <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-lg bg-gray-100 group">
                  <Image
                    src="/images/couple-1.jpg"
                    alt="Beautiful couple in traditional wedding attire"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                </div>

                {/* Second Image */}
                <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-lg bg-gray-100 group">
                  <Image
                    src="/images/couple-4.jpg"
                    alt="Couple with beautiful floral backdrop"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <Calendar className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="text-xl text-amber-900 mb-3 tracking-wide">DATE</h3>
              <p className="text-amber-800 text-lg">August 29, 2025</p>
            </div>

            <div className="text-center group">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <Clock className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="text-xl text-amber-900 mb-3 tracking-wide">TIME</h3>
              <p className="text-amber-800 text-lg">6:00 PM</p>
            </div>

            <div className="text-center group">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-md transition-all duration-300">
                <MapPin className="w-8 h-8 text-amber-800" />
              </div>
              <h3 className="text-xl text-amber-900 mb-3 tracking-wide">VENUE</h3>
              <p className="text-amber-800 text-lg leading-relaxed">
                Crystal Banquet Hall
                <br />
                125 Chrysler Drive
                <br />
                Brampton, ON
              </p>
            </div>
          </div>

          {/* Table Assignment Search Section */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl text-amber-900 mb-4 tracking-wide">Table Assignments</h2>
              <p className="text-amber-800 text-lg">Search your full name as it appears on the invitation.</p>
            </div>

            {/* Event Info Card */}
            <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5 text-amber-700 mr-2" />
                  <h3 className="text-xl text-amber-900 font-medium">Wedding Reception</h3>
                </div>
                <p className="text-amber-800 mb-1">Thursday, August 29, 2025</p>
                <p className="text-amber-800 mb-2">6:00 PM</p>
                <div className="flex items-center justify-center text-amber-700">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span className="text-sm">Crystal Banquet Hall, Brampton</span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-3 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Enter your full name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isSearching}
                  className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-2xl focus:border-amber-600 focus:outline-none bg-white text-amber-900 placeholder-gray-500 disabled:opacity-50"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-amber-900 hover:bg-amber-800 text-white px-8 h-14 text-lg rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Searching...
                  </div>
                ) : (
                  "Search"
                )}
              </Button>
            </div>

            {isSearching && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 animate-pulse">
                <div className="text-center">
                  <div className="bg-gray-200 w-16 h-16 rounded-full mx-auto mb-6"></div>
                  <div className="bg-gray-200 h-6 w-48 mx-auto mb-4 rounded"></div>
                  <div className="bg-gray-200 h-4 w-64 mx-auto rounded"></div>
                </div>
              </div>
            )}

            {/* Search Results */}
            {hasSearched && !isSearching && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 animate-fade-in">
                {searchResult ? (
                  <div className="text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <User className="w-8 h-8 text-amber-800" />
                    </div>
                    <h3 className="text-2xl text-amber-900 mb-2">Welcome, {searchResult.name}</h3>
                    <p className="text-amber-800 mb-8">Your table assignment for the Wedding Reception</p>

                    <div className="mb-6">
                      <div className="text-6xl md:text-7xl text-amber-900 font-bold mb-2">
                        {searchResult.tableNumber}
                      </div>
                      <p className="text-amber-700 text-sm tracking-widest">TABLE NUMBER</p>
                    </div>

                    <div className="flex items-center justify-center text-amber-700">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">Crystal Banquet Hall, Brampton</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Search className="w-8 h-8 text-amber-800" />
                    </div>
                    <h3 className="text-xl text-amber-900 mb-2">Guest Not Found</h3>
                    <p className="text-amber-800">
                      Please check the spelling and try again, or contact the hosts for assistance.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-center mt-16">
            <p className="text-lg text-amber-800 tracking-widest">THANK YOU FOR JOINING US</p>
            <p className="text-lg text-amber-800 tracking-widest">ON OUR SPECIAL DAY</p>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Designed & developed by Sahil Rashid at</p>
            <div className="flex items-center justify-center">
              <Image
                src="/images/CTRL_Studio - Logo.png"
                alt="CTRL STUDIO Logo"
                width={120}
                height={30}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
