import Image from 'next/image'

import { Button, Card, Heading, Link } from '@radix-ui/themes'
import { IconBuilding, IconCheck, IconMail, IconPhone } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import { Solution } from '@/server/api/routers/booking/booking.input'

export default function VirtualOfficePage() {
  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      <Heading mb="5" size={{ initial: '7', sm: '8', md: '9' }} weight="bold">
        Virtual Office
      </Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Image
            src="https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/virtualOffice.png"
            alt="Virtual Office"
            width={1600}
            height={1200}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <Text className="mb-4" size={{ initial: '4', sm: '5', md: '6' }}>
            Establish a presence for your business at this location, and enjoy on-demand access to coworking space.
          </Text>

          <Heading as="h2" className="mb-4" size={{ initial: '5', sm: '6', md: '7' }} weight="medium">
            Key Features
          </Heading>

          <ul className="mb-6 space-y-2">
            {[
              'Business address and mail handling',
              'Telephone answering and call forwarding',
              'On demand access to office and coworking spaces'
            ].map(feature => (
              <li key={feature} className="flex items-center">
                <IconCheck className="text-green-10 mr-2 shrink-0" />

                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href={`/solutions/book?solutionType=${Solution.VirtualOffice}`}>
            <Button size="4">Get Started</Button>
          </Link>
        </div>
      </div>

      <Heading as="h2" className="mb-6 mt-12" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
        Virtual Office Services
      </Heading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <div className="flex flex-col items-center text-center">
            <IconMail className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Mail Handling
            </Heading>

            <Text>Secure mail receipt and forwarding services.</Text>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center text-center">
            <IconPhone className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Call Management
            </Heading>

            <Text>Professional call answering and forwarding.</Text>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center text-center">
            <IconBuilding className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Business Address
            </Heading>

            <Text>Use our prestigious address for your business.</Text>
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Unique Features
        </Heading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <div className="p-6">
              <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
                Virtual Receptionist AI
              </Heading>

              <Text>
                Our advanced AI handles calls, schedules appointments, and manages basic customer inquiries, providing
                24/7 support for your business.
              </Text>
            </div>
          </Card>

          <Card>
            <div className="p-6">
              <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
                Digital Mail Room
              </Heading>

              <Text>
                All your physical mail is scanned and accessible through our secure online portal, allowing you to
                manage correspondence from anywhere in the world.
              </Text>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          On-Demand Workspace Access
        </Heading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Image
            src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Coworking Space"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Meeting Room"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Private Office"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />
        </div>
      </div>
    </div>
  )
}
