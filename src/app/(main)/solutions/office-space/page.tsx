import Image from 'next/image'

import { Button, Card, Heading, Link } from '@radix-ui/themes'
import { IconCheck } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import { Solution } from '@/server/api/routers/booking/booking.input'

export default function OfficeSspacePage() {
  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      <Heading mb="5" size={{ initial: '7', sm: '8', md: '9' }} weight="bold">
        Office Space
      </Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Image
            src="https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/officeSpace.png"
            alt="Office Space"
            width={1600}
            height={1200}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <Text className="mb-4" size={{ initial: '4', sm: '5', md: '6' }}>
            Make a home for yourself and your team with a private office. Fully-serviced and flexible, with everything
            included.
          </Text>

          <Heading as="h2" className="mb-4" size={{ initial: '5', sm: '6', md: '7' }} weight="medium">
            Key Features
          </Heading>

          <ul className="mb-6 space-y-2">
            {['Flexible contracts', 'Access your office 24/7/365', 'All inclusive - includes WiFi and services'].map(
              feature => (
                <li key={feature} className="flex items-center">
                  <IconCheck className="text-green-10 mr-2 shrink-0" />

                  <span>{feature}</span>
                </li>
              )
            )}
          </ul>

          <Link href={`/solutions/book?solutionType=${Solution.OfficeSpace}`}>
            <Button size="4">Book a Tour</Button>
          </Link>
        </div>
      </div>

      <Heading as="h2" className="mb-6 mt-12" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
        Unique Features
      </Heading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <div className="p-6">
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Smart Office Integration
            </Heading>

            <Text>Control lighting, temperature, and book meeting rooms through our proprietary app.</Text>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Wellness Pods
            </Heading>

            <Text>Access private meditation and power nap pods to recharge during your workday.</Text>
          </div>
        </Card>

        <Card>
          <div className="p-6">
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Virtual Reality Conferencing
            </Heading>

            <Text>Host immersive VR meetings with clients and team members around the globe.</Text>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Office Layouts
        </Heading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Image
            src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Open Plan Office"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Private Suites"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Executive Offices"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />
        </div>
      </div>
    </div>
  )
}
