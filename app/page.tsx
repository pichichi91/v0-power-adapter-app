"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, X, RotateCcw } from "lucide-react"
import { plugIconMap } from "@/components/plug-icons"
import { continentIconMap } from "@/components/continent-icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { adapterData } from "@/lib/adapter-data"
import Link from "next/link"

const allPlugTypes = Array.from(new Set(adapterData.flatMap((item) => item.types))).sort()
const allContinents = Array.from(new Set(adapterData.map((item) => item.continent))).sort()

export default function PowerAdapterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPlugTypes, setSelectedPlugTypes] = useState<string[]>([])
  const [selectedContinents, setSelectedContinents] = useState<string[]>([])
  const [modalPlugType, setModalPlugType] = useState<string | null>(null)

  // Filter countries by continent first (for cascading filters)
  const continentFilteredData = useMemo(() => {
    if (selectedContinents.length === 0) return adapterData
    return adapterData.filter((item) => selectedContinents.includes(item.continent))
  }, [selectedContinents])

  // Get available plug types based on continent selection
  const availablePlugTypes = useMemo(() => {
    return Array.from(new Set(continentFilteredData.flatMap((item) => item.types))).sort()
  }, [continentFilteredData])

  // Filter countries by all criteria
  const filteredCountries = useMemo(() => {
    return continentFilteredData.filter((item) => {
      const matchesSearch = !searchQuery.trim() || item.country.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPlugType = selectedPlugTypes.length === 0 || selectedPlugTypes.some(type => item.types.includes(type))
      return matchesSearch && matchesPlugType
    })
  }, [searchQuery, selectedPlugTypes, continentFilteredData])

  // Clear plug types that are no longer available when continent changes
  const handleContinentChange = (continent: string) => {
    setSelectedContinents(prev => {
      const newContinents = prev.includes(continent)
        ? prev.filter(c => c !== continent)
        : [...prev, continent]
      
      // Update available plug types based on new continent selection
      const newContinentData = newContinents.length === 0 
        ? adapterData 
        : adapterData.filter((item) => newContinents.includes(item.continent))
      const newAvailableTypes = Array.from(new Set(newContinentData.flatMap((item) => item.types)))
      
      // Remove selected plug types that are no longer available
      setSelectedPlugTypes(prevTypes => prevTypes.filter(type => newAvailableTypes.includes(type)))
      
      return newContinents
    })
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Navigation */}
        <div className="mb-6 flex gap-4">
          <Link
            href="/"
            className="text-sm font-semibold text-foreground"
          >
            Browse
          </Link>
          <Link
            href="/travel"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Travel
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-mono font-semibold mb-2">Power Adapters</h1>
          <p className="text-muted-foreground">Check plug types and voltage by country</p>
        </div>

        <div className="mb-6">
          {/* Continent Filter - First */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-2 text-muted-foreground">Continent</div>
            <div className="flex flex-wrap gap-2 justify-between">
              {allContinents.map((continent) => {
                const IconComponent = continentIconMap[continent as keyof typeof continentIconMap]
                const isSelected = selectedContinents.includes(continent)
                return (
                  <button
                    key={continent}
                    onClick={() => handleContinentChange(continent)}
                    title={continent}
                    className={`p-4 pb-2 rounded-md border transition-colors flex flex-col items-center justify-center flex-1 min-w-[80px] ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background border-border hover:bg-muted"
                    }`}
                  >
                    <span className="w-16 h-16 flex-shrink-0 mb-1">
                      <IconComponent />
                    </span>
                    <span className="text-xs font-medium text-center leading-tight">{continent}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Plug Type Filter - Second */}
          <div className="mb-4">
            <div className="text-sm font-medium mb-3 text-muted-foreground">Plug Type</div>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {allPlugTypes.map((type) => {
                const IconComponent = plugIconMap[type as keyof typeof plugIconMap]
                const isSelected = selectedPlugTypes.includes(type)
                const isAvailable = availablePlugTypes.includes(type)
                return (
                  <button
                    key={type}
                    onClick={() => {
                      if (isAvailable) {
                        setSelectedPlugTypes(prev => 
                          prev.includes(type) 
                            ? prev.filter(t => t !== type)
                            : [...prev, type]
                        )
                      }
                    }}
                    disabled={!isAvailable}
                    title={isAvailable ? `Type ${type}` : `Type ${type} (not available in selected continents)`}
                    className={`relative flex flex-col items-center justify-center transition-all duration-200 ${
                      isAvailable ? "cursor-pointer" : "cursor-not-allowed opacity-40"
                    }`}
                  >
                    {/* Push Button - 3D Effect */}
                    <div className={`relative w-20 h-20 rounded-lg transition-all duration-200 border-2 ${
                      isSelected
                        ? "bg-green-400 border-green-500 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(0,0,0,0.2)] translate-y-0.5"
                        : isAvailable
                        ? "bg-muted border-border shadow-[0_4px_6px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_8px_rgba(0,0,0,0.15),0_3px_6px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]"
                        : "bg-muted border-border shadow-md"
                    }`}>
                      {/* Button face with icon */}
                      <div className={`absolute inset-0 rounded-lg flex items-center justify-center transition-all duration-200 ${
                        isSelected ? "bg-green-500/20" : "bg-background/50"
                      }`}>
                        <div className={`w-12 h-12 transition-opacity duration-200 ${
                          isSelected ? "opacity-100" : "opacity-70"
                        }`}>
                          <IconComponent />
                        </div>
                      </div>
                      {/* Top highlight for 3D effect */}
                      {!isSelected && isAvailable && (
                        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-4 rounded-full bg-white/30 blur-[2px]" />
                      )}
                    </div>
                    {/* Label */}
                    <span className={`text-xs font-medium mt-2 transition-colors ${
                      isSelected ? "text-green-500 font-semibold" : "text-muted-foreground"
                    }`}>
                      Type {type}
                    </span>
                  </button>
                )
              })}
              <button
                onClick={() => {
                  setSelectedPlugTypes([])
                  setSelectedContinents([])
                  setSearchQuery("")
                }}
                title="Reset filters"
                className="relative flex flex-col items-center justify-center cursor-pointer"
              >
                <div className="w-20 h-20 flex items-center justify-center">
                  <RotateCcw className="w-8 h-8 text-muted-foreground" />
                </div>
                <span className="text-xs font-medium mt-2 text-muted-foreground">Reset</span>
              </button>
            </div>
          </div>

          {/* Search - Last */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Clear Filters Button */}
          {(selectedPlugTypes.length > 0 || selectedContinents.length > 0 || searchQuery) && (
            <div className="mb-4">
              <button
                onClick={() => {
                  setSelectedPlugTypes([])
                  setSelectedContinents([])
                  setSearchQuery("")
                }}
                className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
              >
                <X className="h-4 w-4" />
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {filteredCountries.length} {filteredCountries.length === 1 ? "country" : "countries"}
        </div>

        {/* Country List */}
        <div className="grid gap-3">
          {filteredCountries.map((item) => (
            <Card key={item.country} className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <img
                      src={`https://flagcdn.com/w160/${item.code.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w320/${item.code.toLowerCase()}.png 2x`}
                      alt={`${item.country} flag`}
                      className="w-8 h-6 object-cover border border-border"
                    />
                    <h3 className="font-mono font-medium">{item.country}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                    <span>{item.voltage}</span>
                    <span>•</span>
                    <span>{item.frequency}</span>
                    <span>•</span>
                    <span className="text-xs pt-0.5">{item.continent}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {item.types.map((type) => {
                    const IconComponent = plugIconMap[type as keyof typeof plugIconMap]
                    return (
                      <button
                        key={type}
                        onClick={() => setModalPlugType(type)}
                        className="relative flex h-12 w-12 items-center justify-center border border-border bg-muted hover:bg-muted/80 transition-colors cursor-pointer"
                        title={`Type ${type} - Click to enlarge`}
                      >
                        <IconComponent />
                        <span className="absolute bottom-0.5 right-0.5 text-[10px] font-mono font-medium opacity-50">
                          {type}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredCountries.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No countries found matching your filters</div>
        )}

        {/* Plug Type Reference */}
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-mono font-semibold mb-4">Plug Type Reference</h2>
          <div className="grid gap-3 text-sm">
            {[
              { type: "A", desc: "North American 2-pin (ungrounded)" },
              { type: "B", desc: "North American 3-pin (grounded)" },
              { type: "C", desc: "European 2-pin (ungrounded)" },
              { type: "D", desc: "Indian 3-pin (large)" },
              { type: "E", desc: "French 2-pin with earth pin" },
              { type: "F", desc: "German 2-pin with earth clips" },
              { type: "G", desc: "British 3-pin" },
              { type: "H", desc: "Israeli 3-pin" },
              { type: "I", desc: "Australian 3-pin" },
              { type: "J", desc: "Swiss 3-pin" },
              { type: "K", desc: "Danish 3-pin" },
              { type: "L", desc: "Italian 3-pin" },
              { type: "M", desc: "South African 3-pin (large)" },
              { type: "N", desc: "Brazilian 3-pin" },
              { type: "O", desc: "Thai 3-pin" },
            ].map((plug) => {
              const IconComponent = plugIconMap[plug.type as keyof typeof plugIconMap]
              return (
                <button
                  key={plug.type}
                  onClick={() => setModalPlugType(plug.type)}
                  className="flex items-center gap-3 p-3 border border-border hover:bg-muted/50 transition-colors text-left cursor-pointer"
                >
                  <div className="relative flex h-12 w-12 items-center justify-center border border-border bg-muted flex-shrink-0">
                    <IconComponent />
                    <span className="absolute bottom-0.5 right-0.5 text-[10px] font-mono font-medium opacity-50">
                      {plug.type}
                    </span>
                  </div>
                  <div>
                    <div className="font-mono font-medium">Type {plug.type}</div>
                    <div className="text-muted-foreground">{plug.desc}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <Dialog open={modalPlugType !== null} onOpenChange={(open) => !open && setModalPlugType(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono">Type {modalPlugType}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="relative flex h-48 w-48 items-center justify-center border-2 border-border bg-muted">
              {modalPlugType && plugIconMap[modalPlugType as keyof typeof plugIconMap]?.()}
              <span className="absolute bottom-2 right-2 text-2xl font-mono font-medium opacity-30">
                {modalPlugType}
              </span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            {
              [
                { type: "A", desc: "North American 2-pin (ungrounded)" },
                { type: "B", desc: "North American 3-pin (grounded)" },
                { type: "C", desc: "European 2-pin (ungrounded)" },
                { type: "D", desc: "Indian 3-pin (large)" },
                { type: "E", desc: "French 2-pin with earth pin" },
                { type: "F", desc: "German 2-pin with earth clips" },
                { type: "G", desc: "British 3-pin" },
                { type: "H", desc: "Israeli 3-pin" },
                { type: "I", desc: "Australian 3-pin" },
                { type: "J", desc: "Swiss 3-pin" },
                { type: "K", desc: "Danish 3-pin" },
                { type: "L", desc: "Italian 3-pin" },
                { type: "M", desc: "South African 3-pin (large)" },
                { type: "N", desc: "Brazilian 3-pin" },
                { type: "O", desc: "Thai 3-pin" },
              ].find((p) => p.type === modalPlugType)?.desc
            }
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
