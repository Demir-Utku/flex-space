'use client'

import { useMemo } from 'react'
import { Marker, Popup } from 'react-leaflet'

import Map from '@/components/map'
import type { City, Country, LocationWithId, Region } from '@/data/locations'
import { locations } from '@/data/locations'

export default function WorldMap({ className }: { className: string }) {
  const markers = useMemo(() => {
    const data = []

    // Define the regions
    const regions = Object.keys(locations) as Region[]

    for (const region of regions) {
      const countries = locations[region] as unknown as Record<Country, Record<City, LocationWithId>>

      // Define the country names
      const countryNames = Object.keys(countries) as Country[]

      for (const country of countryNames) {
        const cities = countries[country] as Record<City, { lat: number; lng: number }>

        // Define the city names
        const cityNames = Object.keys(cities) as City[]

        for (const city of cityNames) {
          if (cities[city]) {
            const { lat, lng } = cities[city]

            data.push(
              <Marker key={`${region}-${country}-${city}`} position={[lat, lng]}>
                <Popup>
                  <strong>{city}</strong>

                  <br />

                  {country}
                </Popup>
              </Marker>
            )
          }
        }
      }
    }

    return data
  }, [])

  return (
    <Map className={className} mapProps={{ center: [12, 0], zoom: 2 }}>
      {markers}
    </Map>
  )
}
