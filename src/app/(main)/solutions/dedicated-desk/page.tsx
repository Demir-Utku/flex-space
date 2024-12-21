import Image from 'next/image'
import Link from 'next/link'

import { Button, Card, Heading } from '@radix-ui/themes'
import { IconCheck, IconClock, IconLock, IconWorld } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import { Solution } from '@/server/api/routers/booking/booking.input'

export default function DedicatedDeskPage() {
  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      <Heading mb="5" size={{ initial: '7', sm: '8', md: '9' }} weight="bold">
        Dedicated Desk
      </Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Image
            src="https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/dedicatedDesk.png"
            alt="Dedicated Desk"
            width={1600}
            height={1200}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <Text className="mb-4" size={{ initial: '4', sm: '5', md: '6' }}>
            Enjoy your own private desk in a beautifully designed shared workspace.
          </Text>

          <Heading as="h2" className="mb-4" size={{ initial: '5', sm: '6', md: '7' }} weight="medium">
            Key Features
          </Heading>

          <ul className="mb-6 space-y-2">
            {[
              'Includes a personal locker',
              'Access 24/7/365',
              'Free access to over 3,000 coworking spaces worldwide'
            ].map(feature => (
              <li key={feature} className="flex items-center">
                <IconCheck className="mr-2 shrink-0 text-green-10" />

                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href={`/solutions/book?solutionType=${Solution.DedicatedDesk}`}>
            <Button size="4">Reserve Your Desk</Button>
          </Link>
        </div>
      </div>

      <Heading as="h2" className="mb-6 mt-12" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
        Dedicated Desk Amenities
      </Heading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <div className="flex flex-col items-center text-center">
            <IconLock className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Personal Locker
            </Heading>

            <Text>Secure storage for your belongings with 24/7 access.</Text>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center text-center">
            <IconClock className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              24/7 Access
            </Heading>

            <Text>Work whenever you want, day or night.</Text>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center text-center">
            <IconWorld className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Global Access
            </Heading>

            <Text>Work from any of our 3,000+ locations worldwide.</Text>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Unique Features
        </Heading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Ergonomic Workstation Assessment
            </Heading>

            <Text>
              Receive a personalized ergonomic assessment and adjustments to ensure your workspace is optimized for your
              health and productivity.
            </Text>
          </Card>

          <Card>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Desk Reservation System
            </Heading>

            <Text>
              Use our app to reserve your favorite desk in advance, ensuring you always have your preferred spot.
            </Text>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Dedicated Desk Spaces
        </Heading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Individual Workstation"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Collaborative Area"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1498409785966-ab341407de6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Quiet Zone"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />
        </div>
      </div>
    </div>
  )
}
