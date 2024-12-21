import Link from 'next/link'

import * as Collapsible from '@radix-ui/react-collapsible'
import { Card } from '@radix-ui/themes'
import { IconCaretDownFilled } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import type { City, Country, LocationWithId } from '@/data/locations'
import { getCountryFlag } from '@/lib/utils'

type LocationCardProps = {
  countryName: Country
  cities: Record<City, LocationWithId>
}

export default function LocationCard({ countryName, cities }: LocationCardProps) {
  return (
    <Card size="2" className="h-fit">
      <Collapsible.Root className="group">
        <Collapsible.Trigger asChild className="group">
          <button type="button" className="flex w-full items-center justify-between">
            <span className="flex items-center gap-2">
              <span>{getCountryFlag(countryName)}</span>

              <Text size="4" weight="bold">
                {countryName}
              </Text>
            </span>

            <IconCaretDownFilled
              size={20}
              className="transition-transform duration-200 ease-linear group-data-[state=open]:rotate-180"
            />
          </button>
        </Collapsible.Trigger>

        {/* eslint-disable-next-line @stylistic/max-len */}
        <Collapsible.Content className="overflow-hidden transition-all duration-200 ease-in-out data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="mt-6 grid gap-4">
            {Object.entries(cities).map(([cityName, details]) => (
              <Link href={`/locations/${details.id}`} key={details.id} className="block text-sm hover:underline">
                <Text size="3" key={cityName}>
                  {cityName}
                </Text>
              </Link>
            ))}
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </Card>
  )
}
