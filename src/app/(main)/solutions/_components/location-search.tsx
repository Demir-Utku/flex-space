'use client'

import type { ChangeEvent } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { TextField } from '@radix-ui/themes'
import { debounce } from 'es-toolkit'

import type { City, CityObject, Country } from '@/data/locations'
import { locations } from '@/data/locations'

type FilteredLocations = {
  [key in Country]?: City[]
}

interface LocationSearchProps {
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSelect: (value: string) => void
}

export default function LocationSearch({ value, onChange, onSelect }: LocationSearchProps) {
  const [filteredLocations, setFilteredLocations] = useState<FilteredLocations>({})

  const [showDropdown, setShowDropdown] = useState(false)

  const componentRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [])

  useEffect(() => {
    /* function handleClickOutside(event: MouseEvent) {
      if (componentRef.current &&
        !componentRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    } */

    setFilteredLocations(getAllLocations())

    /* document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    } */
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value

    onChange(event)

    debouncedSearch(value)
  }

  function getAllLocations() {
    const allLocations: FilteredLocations = {}
    Object.values(locations).forEach(countries => {
      (Object.entries(countries) as [Country, CityObject][]).forEach(([country, cities]) => {
        allLocations[country] = Object.keys(cities) as City[]
      })
    })
    return allLocations
  }

  function handleSearch(searchTerm: string) {
    const term = searchTerm.toLowerCase()

    if (term === '') {
      setFilteredLocations(getAllLocations())
    } else {
      const filtered: FilteredLocations = {}

      Object.values(locations).forEach(countries => {
        (Object.entries(countries) as [Country, CityObject][]).forEach(([country, cities]) => {
          const matchedCities = Object.keys(cities).filter(city =>
            city.toLowerCase().includes(term) || country.toLowerCase().includes(term)
          )

          if (matchedCities.length > 0) {
            filtered[country] = matchedCities as City[]
          }
        })
      })

      setFilteredLocations(filtered)
    }
  }

  function handleItemClick(city: string) {
    setShowDropdown(false)

    onSelect(city)
  }

  return (
    <div ref={componentRef} className="relative">
      <TextField.Root
        ref={inputRef}
        placeholder="Search for a location..."
        size="3"
        value={value}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
      />

      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-10 bg-slate-1 border border-slate-6 rounded-lg mt-1 w-full max-h-64 overflow-y-auto"
        >
          {Object.entries(filteredLocations).map(([country, cities]) => (
            <div key={country} className="p-2">
              <h2 className="font-semibold text-slate-11">{country}</h2>

              {cities.map(city => (
                <button
                  key={city}
                  type="button"
                  className="ml-4 block z-10"
                  onClick={() => handleItemClick(city)}
                >
                  <p className="text-slate-10 hover:text-amber-10">{city}</p>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
