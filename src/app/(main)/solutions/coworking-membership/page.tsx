import Image from 'next/image'
import Link from 'next/link'

import { Button, Card, Heading } from '@radix-ui/themes'
import { IconCheck, IconCoffee, IconUsers, IconWifi } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import { Solution } from '@/server/api/routers/booking/booking.input'

export default function CoworkingMembershipPage() {
  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      <Heading mb="5" size={{ initial: '7', sm: '8', md: '9' }} weight="bold">
        Coworking Membership
      </Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Image
            src="https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/membership.png"
            alt="Coworking Membership"
            width={1600}
            height={1200}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <Text className="mb-4" size={{ initial: '4', sm: '5', md: '6' }}>
            Access coworking space at this location, or anywhere across our network of 3,000 locations worldwide.
          </Text>

          <Heading as="h2" className="mb-4" size={{ initial: '5', sm: '6', md: '7' }} weight="medium">
            Membership Options
          </Heading>

          <ul className="mb-6 space-y-2">
            {[
              'Choose your plan: 5/10 days per month, or unlimited',
              'Access during business hours',
              'Join our thriving community'
            ].map(feature => (
              <li key={feature} className="flex items-center">
                <IconCheck className="mr-2 shrink-0 text-green-10" />

                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href={`/solutions/book?solutionType=${Solution.CoworkingMembership}`}>
            <Button size="4">Join Now</Button>
          </Link>
        </div>
      </div>

      <Heading as="h2" className="mb-6 mt-12" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
        Coworking Amenities
      </Heading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex flex-col items-center text-center">
          <IconWifi className="mb-2 text-4xl text-blue-10" />

          <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
            High-Speed Wi-Fi
          </Heading>

          <Text>Lightning-fast internet to keep you productive.</Text>
        </Card>

        <Card className="flex flex-col items-center text-center">
          <IconCoffee className="mb-2 text-4xl text-blue-10" />

          <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
            Gourmet Coffee Bar
          </Heading>

          <Text>Complimentary artisanal coffee and tea selections.</Text>
        </Card>

        <Card className="flex flex-col items-center text-center">
          <IconUsers className="mb-2 text-4xl text-blue-10" />

          <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
            Networking Events
          </Heading>

          <Text>Regular events to connect with fellow professionals.</Text>
        </Card>
      </div>

      <div className="mt-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Unique Features
        </Heading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Skill-Sharing Platform
            </Heading>

            <Text>
              Access our exclusive online platform to share skills and collaborate with other members across all our
              locations.
            </Text>
          </Card>

          <Card>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              AI-Powered Networking
            </Heading>

            <Text>
              Our AI algorithm suggests potential collaborators and business opportunities based on your profile and
              work history.
            </Text>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Coworking Spaces
        </Heading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Image
            src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Open Workspace"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Lounge Area"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Phone Booths"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />
        </div>
      </div>
    </div>
  )
}
