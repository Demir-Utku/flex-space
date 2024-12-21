import Image from 'next/image'
import Link from 'next/link'

import { Button, Card, Heading, Inset } from '@radix-ui/themes'

import { Text } from '@/components/ui/text'

const solutions = [
  {
    name: 'Office Space',
    description: 'Private, fully-serviced offices for teams of all sizes.',
    image: 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/officeSpace.png',
    href: '/solutions/office-space'
  },
  {
    name: 'Coworking Membership',
    description: 'Flexible workspace access in a vibrant community.',
    image: 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/membership.png',
    href: '/solutions/coworking-membership'
  },
  {
    name: 'Dedicated Desk',
    description: 'Your personal workspace in a shared office environment.',
    image: 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/dedicatedDesk.png',
    href: '/solutions/dedicated-desk'
  },
  {
    name: 'Virtual Office',
    description: 'Professional address and mail handling services.',
    image: 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/virtualOffice.png',
    href: '/solutions/virtual-office'
  },
  {
    name: 'Meeting Rooms',
    description: 'Professional spaces for your meetings and events.',
    image: 'https://www.spacesworks.com/wp-content/themes/spaces/img/products-list/meetingRoom.png',
    href: '/solutions/meeting-rooms'
  },
  {
    name: 'Enterprise Solutions',
    description: 'Customized workspace solutions for large organizations.',
    image:
      // eslint-disable-next-line @stylistic/max-len
      'https://ctfassets.imgix.net/vh7r69kgcki3/x1cxvr0HgN1Y3rkbpwiGM/e59a2eab04080c15527d1af9de2635c2/Web_150DPI-20200313_WeWork_Salesforce_Tower_Atrium_-_San_Francisco_001.jpg?q=100',
    href: '/solutions/enterprise'
  }
]

export default function SolutionsPage() {
  return (
    <div className="px-4 py-6">
      <Heading mb="5" size={{ initial: '7', sm: '8', md: '9' }} weight="bold">
        Our Workspace Solutions
      </Heading>

      <Text size={{ initial: '3', sm: '4', md: '5' }} className="mb-12">
        Discover flexible workspace solutions tailored to your needs. From private offices to virtual services, we have
        the perfect solution for your business.
      </Text>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {solutions.map(solution => (
          <Card key={solution.name} size="3">
            <Inset clip="padding-box" side="top" pb="current">
              <Image
                src={solution.image}
                alt={solution.name}
                width={1600}
                height={1200}
                priority
                className="aspect-square w-full object-cover md:aspect-[3/2] xl:aspect-video"
              />
            </Inset>

            <Heading mb="2" size={{ initial: '4', sm: '5', md: '6' }} className="font-semibold">
              {solution.name}
            </Heading>

            <Text color="gray">{solution.description}</Text>

            <div className="mt-4">
              <Link href={solution.href} passHref>
                <Button size="3" className="w-full" variant="soft">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
