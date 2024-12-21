import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'

import { Box, Heading } from '@radix-ui/themes'

import { Text } from '@/components/ui/text'
import type { LocationWithId, Solution } from '@/data/locations'
import { locations } from '@/data/locations'

import PhotoGallery from './_components/photo-gallery'
import Solutions from './_components/solutions'

const CityMap = dynamic(() => import('./_components/city-map'), { ssr: false })

export default async function LocationDetails(props: { params: Promise<{ id: string }> }) {
  const params = await props.params
  const location = findLocationById(params.id)

  if (!location) {
    notFound()
  }

  const { city, country, lat, lng, solutions } = location

  return (
    <Box py="4" px={{ initial: '0', xs: '2', sm: '4', md: '6', lg: '8' }}>
      <Heading mb="4" weight="bold" size={{ initial: '8', md: '9' }}>
        {city}
      </Heading>

      <Text mb="6" size={{ initial: '3', md: '5' }} color="gray">
        {country}
      </Text>

      <PhotoGallery />

      <div className="my-10 h-52 w-full sm:h-[275px] md:h-[400px] lg:h-[500px] xl:h-[620px] 2xl:h-[700px]">
        <CityMap city={city} lat={lat} lng={lng} className="h-full w-full" />
      </div>

      <Heading mb="4" weight="medium" size={{ initial: '4', xs: '5', sm: '6', md: '7' }}>
        Available Solutions
      </Heading>

      <Solutions solutions={solutions} className="mb-8" />
    </Box>
  )
}

function findLocationById(
  id: string
): { city: string; country: string; region: string; lat: number; lng: number; solutions: Solution[] } | null {
  for (const [region, countries] of Object.entries(locations)) {
    for (const [country, cities] of Object.entries(countries)) {
      for (const [city, details] of Object.entries(cities as Record<string, LocationWithId>)) {
        if (details.id === id) {
          return { city, country, region, ...details }
        }
      }
    }
  }

  return null
}
