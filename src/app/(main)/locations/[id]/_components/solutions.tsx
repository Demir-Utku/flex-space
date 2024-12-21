import Image from 'next/image'

import { Card, Flex, Heading, Inset } from '@radix-ui/themes'
import { IconCheck } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import type { Solution } from '@/data/locations'
import { cn } from '@/lib/utils'

const solutionImages: Record<Solution, string> = {
  'Office space': 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/officeSpace.png',
  'Coworking membership': 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/membership.png',
  'Dedicated desk': 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/dedicatedDesk.png',
  'Virtual Office': 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/virtualOffice.png',
  'Meeting rooms': 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/meetingRoom.png'
}

function SolutionInfo({ solution }: { solution: Solution }) {
  const summary = {
    'Office space':
      // eslint-disable-next-line @stylistic/max-len
      'Make a home for yourself and your team with a private office. Fully-serviced and flexible, with everything included.',
    'Coworking membership':
      'Access coworking space at this location, or anywhere across our network of 3,000 locations worldwide.',
    'Dedicated desk': 'Enjoy your own private desk in a beautifully designed shared workspace.',
    'Virtual Office':
      'Establish a presence for your business at this location, and enjoy on-demand access to coworking space.',
    'Meeting rooms': 'Book meeting rooms on-demand, with all the support and services that you need.'
  }

  const list = {
    'Office space': ['Flexible contracts', 'Access your office 24/7/365', 'All inclusive - includes WiFi and services'],
    'Coworking membership': [
      'Choose your plan: 5/10 days per month, or unlimited',
      'Access during business hours',
      'Join our thriving community'
    ],
    'Dedicated desk': [
      'Includes a personal locker',
      'Access 24/7/365',
      'Free access to over 3,000 coworking spaces worldwide'
    ],
    'Virtual Office': [
      'Business address and mail handling',
      'Telephone answering and call forwarding',
      'On demand access to office and coworking spaces'
    ],
    'Meeting rooms': [
      'Choose from a variety of room sizes and types',
      'AV and presentation equipment',
      'Catering available'
    ]
  }

  return (
    <>
      <Text color="indigo">{summary[solution]}</Text>

      <ul className="mt-2 list-none space-y-4">
        {list[solution].map(item => (
          <li key={item} className="flex gap-2">
            <IconCheck size={16} className="mt-1 shrink-0" />

            <Text>{item}</Text>
          </li>
        ))}
      </ul>
    </>
  )
}

function SolutionCard({ solution }: { solution: Solution }) {
  return (
    <Card>
      <Inset clip="padding-box" side="top" pb="current">
        <Image
          src={solutionImages[solution]}
          alt={solution}
          width={900}
          height={600}
          className="h-auto w-full object-cover"
        />
      </Inset>

      <Flex p="4" direction="column" gap="6">
        <Heading>{solution}</Heading>

        <SolutionInfo solution={solution} />
      </Flex>
    </Card>
  )
}

export default function Solutions({ className, solutions }: { className?: string; solutions: Solution[] }) {
  return (
    <div
      className={cn('grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 min-[2200px]:grid-cols-5', className)}
    >
      {solutions.map(solution => (
        <SolutionCard key={solution} solution={solution} />
      ))}
    </div>
  )
}
