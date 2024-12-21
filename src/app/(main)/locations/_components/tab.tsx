import { Box, Tabs } from '@radix-ui/themes'

import type { City, Country, LocationWithId, Region } from '@/data/locations'
import { locations } from '@/data/locations'

import LocationCard from './location-card'

export default function Tab() {
  const regions = Object.keys(locations) as Region[]

  const countriesByRegion = {} as Record<Region, Record<Country, Record<City, LocationWithId>>>

  regions.forEach(region => {
    countriesByRegion[region] = {} as Record<Country, Record<City, LocationWithId>>

    Object.entries(locations[region]).forEach(([country, cities]) => {
      countriesByRegion[region][country as Country] = cities as Record<City, LocationWithId>
    })
  })

  return (
    <Tabs.Root defaultValue={regions[0]}>
      <Tabs.List>
        {regions.map(region => (
          <Tabs.Trigger key={region} value={region}>
            {region}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Box pt="5">
        {regions.map(region => (
          <Tabs.Content key={region} value={region}>
            {/* eslint-disable-next-line @stylistic/max-len */}
            <div className="grid grid-cols-1 grid-rows-[masonry] gap-x-4 gap-y-2 radix-xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-3">
              {Object.entries(countriesByRegion[region]).map(([country, cities]) => (
                <LocationCard key={country} countryName={country as Country} cities={cities} />
              ))}
            </div>
          </Tabs.Content>
        ))}
      </Box>
    </Tabs.Root>
  )
}
