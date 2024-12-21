import { Heading, Separator, TextField } from '@radix-ui/themes'
import { IconSearch } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'

import Tab from './_components/tab'

export default function LocationsPage() {
  return (
    <div className="flex flex-col py-10">
      <Heading size={{ initial: '5', xs: '6', sm: '7', md: '8' }} className="uppercase" weight="bold">
        Find A Location
      </Heading>

      <Text size={{ initial: '2', xs: '3', sm: '4' }} my="4">
        Join professionals from all over the world and get to work in offices, coworking spaces, meeting rooms, and
        more.
      </Text>

      <TextField.Root radius="large" placeholder="Try 'Berlin' or 'London'" size="3">
        <TextField.Slot>
          <IconSearch className="size-6" />
        </TextField.Slot>
      </TextField.Root>

      <div className="flex flex-col py-12">
        <Heading size={{ initial: '4', xs: '5', sm: '6', md: '7' }}>All Locations</Heading>

        <Separator my="3" size="4" />

        <Tab />
      </div>
    </div>
  )
}
