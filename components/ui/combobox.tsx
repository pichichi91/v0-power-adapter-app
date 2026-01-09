"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComboboxProps {
  value: string
  onValueChange: (value: string) => void
  options: Array<{ value: string; label: React.ReactNode }>
  placeholder?: string
  className?: string
}

export function Combobox({
  value,
  onValueChange,
  options,
  placeholder = "Select...",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  const filteredOptions = React.useMemo(() => {
    if (!searchQuery.trim()) return options
    const query = searchQuery.toLowerCase()
    return options.filter((opt) => {
      // Use the value (country name) for filtering
      return opt.value.toLowerCase().includes(query)
    })
  }, [options, searchQuery])

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
        setSearchQuery("")
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside)
      inputRef.current?.focus()
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [open])

  const handleSelect = (optionValue: string) => {
    onValueChange(optionValue)
    setOpen(false)
    setSearchQuery("")
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onValueChange("")
    setSearchQuery("")
  }

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <div
        className={cn(
          "border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-input/30 border h-9 w-full rounded-md bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none",
          open && "ring-ring/50 ring-[3px] border-ring"
        )}
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center justify-between gap-2 h-full">
          <div className="flex-1 flex items-center gap-2 min-w-0">
            {selectedOption ? (
              <div className="flex items-center gap-2 min-w-0 flex-1">
                {selectedOption.label}
              </div>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="hover:bg-muted rounded p-0.5 transition-colors"
              >
                <XIcon className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
            <ChevronDownIcon
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform",
                open && "rotate-180"
              )}
            />
          </div>
        </div>
      </div>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-popover text-popover-foreground rounded-md border shadow-md max-h-[300px] overflow-hidden">
          <div className="p-2 border-b">
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="overflow-y-auto max-h-[250px] p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 py-1.5 rounded-sm text-sm text-left hover:bg-accent hover:text-accent-foreground transition-colors",
                    value === option.value && "bg-accent"
                  )}
                >
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    {option.label}
                  </div>
                  {value === option.value && (
                    <CheckIcon className="h-4 w-4 flex-shrink-0" />
                  )}
                </button>
              ))
            ) : (
              <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
                No results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
