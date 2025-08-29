"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { MapPin, Search, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Guest = { name: string; tableNumber: number };

// normalize for comparison
function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// Remove trailing "Family", "’s Family", "'s Family"
function stripFamily(name: string) {
  return name
    .replace(/\s*(?:’s|'s)?\s*family\.?$/i, "") // possessive family
    .replace(/\s+family\.?$/i, "") // plain family
    .replace(/\s+/g, " ")
    .trim();
}

// Split couples "A & B" or "A and B" into individual names
function splitCouple(name: string) {
  const parts = name.split(/\s*(?:&|and)\s*/i).map((p) => p.trim()).filter(Boolean);
  return parts.length >= 2 ? parts : [name];
}

export default function WeddingSeatingChart() {
  const [allGuests, setAllGuests] = useState<Guest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<Guest | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Load your JSON from /public
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/guests-seating.json", { cache: "force-cache" });
        const raw: Guest[] = await res.json();

        // Normalize the dataset:
        // - strip "Family"
        // - split couples into separate rows (same table)
        // - de-dupe (name + table)
        const expanded: Guest[] = [];
        for (const g of raw) {
          const base = stripFamily(g.name);
          for (const person of splitCouple(base)) {
            expanded.push({ name: person, tableNumber: g.tableNumber });
          }
        }
        const seen = new Set<string>();
        const unique = expanded.filter((g) => {
          const k = `${norm(g.name)}#${g.tableNumber}`;
          if (seen.has(k)) return false;
          seen.add(k);
          return true;
        });

        if (!cancelled) setAllGuests(unique);
      } catch {
        if (!cancelled) setAllGuests([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Build alias index for fast lookup (may have multiple entries per alias)
  const aliasIndex = useMemo(() => {
    const map = new Map<string, Guest[]>();
    for (const g of allGuests) {
      const key = norm(g.name);
      const arr = map.get(key) ?? [];
      arr.push(g);
      map.set(key, arr);
    }
    return map;
  }, [allGuests]);

  const handleSearch = async () => {
    setIsSearching(true);
    setHasSearched(false);

    // small UX delay
    await new Promise((r) => setTimeout(r, 250));

    const q = norm(searchQuery);
    let result: Guest | null = null;

    // 1) exact matches (could be multiple; pick lowest table)
    const exact = aliasIndex.get(q) ?? [];
    if (exact.length) {
      result = [...exact].sort((a, b) => a.tableNumber - b.tableNumber)[0];
    }

    // 2) partial fallback over aliases
    if (!result && q.length >= 2) {
      const candidates: Guest[] = [];
      for (const [alias, recs] of aliasIndex.entries()) {
        if (alias.includes(q)) candidates.push(...recs);
      }
      if (candidates.length) {
        candidates.sort((a, b) => a.tableNumber - b.tableNumber);
        result = candidates[0];
      }
    }

    setSearchResult(result);
    setHasSearched(true);
    setIsSearching(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="mb-4">
              <p className="text-2xl md:text-3xl text-amber-800 mb-2 tracking-wider">WELCOME TO</p>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-amber-900 mb-4 leading-tight tracking-wide">UMAR &amp;</h1>
            <h1 className="text-4xl md:text-6xl lg:text-7xl text-amber-900 mb-6 leading-tight tracking-wide">
              RAMSHA&apos;S
            </h1>
            <p className="text-xl md:text-2xl text-amber-800 mb-8 tracking-widest font-light">WEDDING RECEPTION</p>
            <div className="max-w-md mx-auto">
              <p className="text-sm text-amber-700 italic mb-2">
                &ldquo;And we created you in pairs&rdquo;
              </p>
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

          {/* Table Assignment Search Section */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl text-amber-900 mb-4 tracking-wide">Table Assignments</h2>
              <p className="text-amber-800 text-lg">Search your full name as it appears on the invitation.</p>
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
                  onKeyDown={handleKeyDown}
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
            <p className="text-sm text-gray-400 mb-2">Designed &amp; developed by Sahil Rashid at</p>
            <div className="flex items-center justify-center">
              <Image
                src="/images/ctrl-studio-logo.png"
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
  );
}
