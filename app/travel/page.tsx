"use client"

import { useState, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { plugIconMap } from "@/components/plug-icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Combobox } from "@/components/ui/combobox"
import { Badge } from "@/components/ui/badge"
import { adapterData } from "@/lib/adapter-data"
import Link from "next/link"
import { ArrowRight, CheckCircle2, XCircle, AlertCircle } from "lucide-react"

export default function TravelPage() {
  const [originCountry, setOriginCountry] = useState<string>("")
  const [destinationCountry, setDestinationCountry] = useState<string>("")
  const [modalPlugType, setModalPlugType] = useState<string | null>(null)

  const originData = useMemo(() => {
    return adapterData.find((item) => item.country === originCountry)
  }, [originCountry])

  const destinationData = useMemo(() => {
    return adapterData.find((item) => item.country === destinationCountry)
  }, [destinationCountry])

  const compatibility = useMemo(() => {
    if (!originData || !destinationData) return null

    const compatibleTypes = originData.types.filter((type) =>
      destinationData.types.includes(type)
    )

    return {
      isCompatible: compatibleTypes.length > 0,
      compatibleTypes,
      originTypes: originData.types,
      destinationTypes: destinationData.types,
      voltageMatch: originData.voltage === destinationData.voltage,
      frequencyMatch: originData.frequency === destinationData.frequency,
    }
  }, [originData, destinationData])

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Navigation */}
        <div className="mb-6 flex gap-4">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse
          </Link>
          <Link
            href="/travel"
            className="text-sm font-semibold text-foreground"
          >
            Travel
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-mono font-semibold mb-2">Travel Compatibility</h1>
          <p className="text-muted-foreground flex items-center gap-2 flex-wrap">
            {originCountry && destinationCountry ? (
              <>
                Can I go from <Badge variant="default">{originCountry}</Badge> to <Badge variant="default">{destinationCountry}</Badge> with my plug?
              </>
            ) : originCountry ? (
              <>
                Can I go from <Badge variant="default">{originCountry}</Badge> to <Badge variant="outline">Y</Badge> with my plug?
              </>
            ) : destinationCountry ? (
              <>
                Can I go from <Badge variant="outline">X</Badge> to <Badge variant="default">{destinationCountry}</Badge> with my plug?
              </>
            ) : (
              <>
                Can I go from <Badge variant="outline">X</Badge> to <Badge variant="outline">Y</Badge> with my plug if I am from the following country?
              </>
            )}
          </p>
        </div>

        {/* Country Selectors */}
        <div className="mb-8 space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              I am from (Origin Country)
            </label>
            <Combobox
              value={originCountry}
              onValueChange={setOriginCountry}
              placeholder="Select your home country"
              options={adapterData.map((item) => ({
                value: item.country,
                label: (
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                      alt={`${item.country} flag`}
                      className="w-5 h-4 object-cover border border-border rounded flex-shrink-0"
                    />
                    <span className="truncate">{item.country}</span>
                  </div>
                ),
              }))}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block text-muted-foreground">
              I am traveling to (Destination Country)
            </label>
            <Combobox
              value={destinationCountry}
              onValueChange={setDestinationCountry}
              placeholder="Select destination country"
              options={adapterData.map((item) => ({
                value: item.country,
                label: (
                  <div className="flex items-center gap-2">
                    <img
                      src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                      alt={`${item.country} flag`}
                      className="w-5 h-4 object-cover border border-border rounded flex-shrink-0"
                    />
                    <span className="truncate">{item.country}</span>
                  </div>
                ),
              }))}
            />
          </div>
        </div>

        {/* Compatibility Result */}
        {compatibility && (
          <Card className="p-6 mb-8">
            <div className="space-y-6">
              {/* Result Header */}
              <div className="flex items-start gap-4">
                {compatibility.isCompatible ? (
                  <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0 mt-1" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500 flex-shrink-0 mt-1" />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-mono font-semibold mb-2">
                    {compatibility.isCompatible
                      ? "Yes, your plugs are compatible!"
                      : "No, you'll need an adapter"}
                  </h2>
                  <p className="text-muted-foreground">
                    {compatibility.isCompatible
                      ? `You can use your ${compatibility.compatibleTypes.map((t) => `Type ${t}`).join(" and ")} plug${compatibility.compatibleTypes.length > 1 ? "s" : ""} in ${destinationData?.country}.`
                      : `Your plugs from ${originData?.country} are not compatible with ${destinationData?.country}. You'll need an adapter.`}
                  </p>
                </div>
              </div>

              {/* Compatible Types */}
              {compatibility.isCompatible && (
                <div>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                    Compatible Plug Types:
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {compatibility.compatibleTypes.map((type) => {
                      const IconComponent = plugIconMap[type as keyof typeof plugIconMap]
                      return (
                        <button
                          key={type}
                          onClick={() => setModalPlugType(type)}
                          className="relative flex h-16 w-16 items-center justify-center border-2 border-green-500 bg-green-50 dark:bg-green-950 rounded-lg hover:bg-green-100 dark:hover:bg-green-900 transition-colors cursor-pointer"
                          title={`Type ${type} - Click to enlarge`}
                        >
                          <IconComponent />
                          <span className="absolute bottom-1 right-1 text-xs font-mono font-medium text-green-600 dark:text-green-400">
                            {type}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border">
                {/* Origin Country */}
                <div>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                    From: {originData?.country}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w40/${originData?.code.toLowerCase()}.png`}
                        alt={`${originData?.country} flag`}
                        className="w-8 h-6 object-cover border border-border rounded"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{originData?.voltage}</div>
                        <div className="text-xs text-muted-foreground">{originData?.frequency}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {originData?.types.map((type) => {
                        const IconComponent = plugIconMap[type as keyof typeof plugIconMap]
                        return (
                          <button
                            key={type}
                            onClick={() => setModalPlugType(type)}
                            className="relative flex h-12 w-12 items-center justify-center border border-border bg-muted hover:bg-muted/80 transition-colors cursor-pointer rounded"
                            title={`Type ${type}`}
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
                </div>

                {/* Destination Country */}
                <div>
                  <h3 className="text-sm font-medium mb-3 text-muted-foreground">
                    To: {destinationData?.country}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w40/${destinationData?.code.toLowerCase()}.png`}
                        alt={`${destinationData?.country} flag`}
                        className="w-8 h-6 object-cover border border-border rounded"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">{destinationData?.voltage}</div>
                        <div className="text-xs text-muted-foreground">{destinationData?.frequency}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      {destinationData?.types.map((type) => {
                        const IconComponent = plugIconMap[type as keyof typeof plugIconMap]
                        const isCompatible = compatibility.compatibleTypes.includes(type)
                        return (
                          <button
                            key={type}
                            onClick={() => setModalPlugType(type)}
                            className={`relative flex h-12 w-12 items-center justify-center border-2 transition-colors cursor-pointer rounded ${
                              isCompatible
                                ? "border-green-500 bg-green-50 dark:bg-green-950 hover:bg-green-100 dark:hover:bg-green-900"
                                : "border-border bg-muted hover:bg-muted/80"
                            }`}
                            title={`Type ${type}${isCompatible ? " (compatible)" : ""}`}
                          >
                            <IconComponent />
                            <span className={`absolute bottom-0.5 right-0.5 text-[10px] font-mono font-medium ${
                              isCompatible ? "text-green-600 dark:text-green-400" : "opacity-50"
                            }`}>
                              {type}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Voltage/Frequency Warnings */}
              {(!compatibility.voltageMatch || !compatibility.frequencyMatch) && (
                <div className="pt-4 border-t border-border">
                  <div className="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 text-sm">
                      <div className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">
                        Voltage/Frequency Difference
                      </div>
                      <div className="text-yellow-800 dark:text-yellow-200">
                        {!compatibility.voltageMatch && (
                          <div>
                            Voltage differs: {originData?.voltage} → {destinationData?.voltage}
                          </div>
                        )}
                        {!compatibility.frequencyMatch && (
                          <div>
                            Frequency differs: {originData?.frequency} → {destinationData?.frequency}
                          </div>
                        )}
                        <div className="mt-2">
                          Check if your device supports dual voltage/frequency or use a voltage converter.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Instructions */}
        {!originCountry && !destinationCountry && (
          <Card className="p-6">
            <div className="text-center text-muted-foreground">
              <p>Select your origin and destination countries to check plug compatibility.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Plug Type Modal */}
      <Dialog open={modalPlugType !== null} onOpenChange={(open) => !open && setModalPlugType(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-mono">Type {modalPlugType}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-8">
            <div className="relative flex h-48 w-48 items-center justify-center border-2 border-border bg-muted rounded-lg">
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
