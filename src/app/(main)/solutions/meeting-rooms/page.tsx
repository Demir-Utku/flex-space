import Image from 'next/image'

import { Button, Card, Heading, Link } from '@radix-ui/themes'
import { IconCheck, IconCoffee, IconDeviceTv, IconUsers } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import { Solution } from '@/server/api/routers/booking/booking.input'

export default function MeetingRoomsPage() {
  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      <Heading mb="5" size={{ initial: '7', sm: '8', md: '9' }} weight="bold">
        Meeting Rooms
      </Heading>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Image
            src="https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/meetingRoom.png"
            alt="Meeting Rooms"
            width={1600}
            height={1200}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <Text className="mb-4" size={{ initial: '4', sm: '5', md: '6' }}>
            Book meeting rooms on-demand, with all the support and services that you need.
          </Text>

          <Heading as="h2" className="mb-4" size={{ initial: '5', sm: '6', md: '7' }} weight="medium">
            Key Features
          </Heading>

          <ul className="mb-6 space-y-2">
            {[
              'Choose from a variety of room sizes and types',
              'AV and presentation equipment',
              'Catering available'
            ].map(feature => (
              <li key={feature} className="flex items-center">
                <IconCheck className="mr-2 shrink-0 text-green-10" />

                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href={`/solutions/book?solutionType=${Solution.MeetingRooms}`}>
            <Button size="4">Book a Room</Button>
          </Link>
        </div>
      </div>

      <Heading as="h2" className="mb-6 mt-12" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
        Meeting Room Amenities
      </Heading>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <div className="flex flex-col items-center text-center">
            <IconDeviceTv className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Advanced AV Equipment
            </Heading>

            <Text>High-quality displays and video conferencing systems.</Text>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center text-center">
            <IconUsers className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Flexible Layouts
            </Heading>

            <Text>Rooms for 2 to 50+ people with customizable setups.</Text>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col items-center text-center">
            <IconCoffee className="mb-2 text-4xl text-blue-10" />

            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Catering Services
            </Heading>

            <Text>On-demand food and beverage options for your meetings.</Text>
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
              Holographic Conferencing
            </Heading>

            <Text>
              Experience cutting-edge holographic technology for immersive remote meetings, making distant participants
              feel like they&apos;re in the room.
            </Text>
          </Card>

          <Card>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              AI Meeting Assistant
            </Heading>

            <Text>
              Our AI-powered assistant takes notes, transcribes conversations, and provides real-time language
              translation for international meetings.
            </Text>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Meeting Room Types
        </Heading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Image
            src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Boardroom"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Training Room"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />

          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&q=100"
            alt="Collaborative Space"
            width={1200}
            height={800}
            className="aspect-[2/3] w-full rounded-lg object-cover shadow-md md:aspect-square lg:aspect-[3/2] xl:aspect-video"
          />
        </div>
      </div>
    </div>
  )
}
