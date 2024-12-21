import Image from 'next/image'
import Link from 'next/link'

import { Button, Card, Heading } from '@radix-ui/themes'
import { IconBuilding, IconChartBar, IconCheck, IconUsers } from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import { Solution } from '@/server/api/routers/booking/booking.input'

export default function EnterprisePage() {
  return (
    <div className="container mx-auto px-2 py-4 md:px-4 md:py-8">
      <Heading mb="5" size={{ initial: '7', sm: '8', md: '9' }} weight="bold">
        Enterprise Solutions
      </Heading>

      <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=100"
            alt="Enterprise-grade office space"
            width={1200}
            height={800}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div>
          <Heading as="h2" className="mb-4" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
            Enterprise-grade solutions to power your hybrid strategy
          </Heading>

          <Text className="mb-6" size={{ initial: '4', sm: '5', md: '6' }}>
            Give your real estate portfolio more flexibility while saving on costs by combining our turnkey offices,
            coworking spaces, and space management technology.
          </Text>

          <ul className="mb-6 space-y-2">
            {[
              'Flexible office solutions',
              'Global network of locations',
              'Advanced space management technology',
              'Customizable to your needs'
            ].map(feature => (
              <li key={feature} className="flex items-center">
                <IconCheck className="mr-2 shrink-0 text-green-10" />

                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href={`/solutions/book?solutionType=${Solution.Enterprise}`}>
            <Button size="4">Schedule a consultation</Button>
          </Link>
        </div>
      </div>

      <Heading as="h2" className="mb-6 mt-12" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
        Our Enterprise Offerings
      </Heading>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex flex-col items-center justify-center">
          <IconBuilding className="mb-2 text-4xl text-blue-10" />

          <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
            Customized Office Spaces
          </Heading>

          <Text align="center">Tailor-made office solutions that adapt to your company&apos;s unique needs and culture.</Text>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <IconUsers className="mb-2 text-4xl text-blue-10" />

          <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
            Global Workspace Network
          </Heading>

          <Text align="center">Access to premium workspaces worldwide, supporting your distributed workforce.</Text>
        </Card>

        <Card className="flex flex-col items-center justify-center">
          <IconChartBar className="mb-2 text-4xl text-blue-10" />

          <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
            Analytics and Insights
          </Heading>

          <Text align="center">Advanced analytics to optimize your workspace utilization and employee productivity.</Text>
        </Card>
      </div>

      <div className="mb-12">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Why Choose Our Enterprise Solutions?
        </Heading>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Flexibility and Scalability
            </Heading>

            <Text>
              Our solutions grow with your business, allowing you to scale up or down as needed without long-term
              commitments.
            </Text>
          </div>

          <div>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Cost Efficiency
            </Heading>

            <Text>
              Optimize your real estate costs with our flexible pricing models and efficient space utilization
              strategies.
            </Text>
          </div>

          <div>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Employee Experience
            </Heading>

            <Text>
              Provide your team with state-of-the-art workspaces designed to boost productivity and satisfaction.
            </Text>
          </div>

          <div>
            <Heading as="h3" className="mb-2" size={{ initial: '4', sm: '5', md: '6' }} weight="medium">
              Global Consistency
            </Heading>

            <Text>Maintain a consistent work environment and company culture across all your global locations.</Text>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Image
            src="https://ctfassets.imgix.net/vh7r69kgcki3/5gWza765PEojW6IFMa3CeU/3345de7a1451f10af7689d440527da4f/Web_72DPI-CHI_167_LOUNGE.jpg?q=100"
            alt=""
            width={1200}
            height={800}
            className="aspect-square w-full rounded-lg object-cover lg:aspect-[3/2] 2xl:aspect-video"
          />

          <Image
            // eslint-disable-next-line @stylistic/max-len
            src="https://ctfassets.imgix.net/vh7r69kgcki3/3bHGeNFHlqKm6iOG4U1un5/01e42f9cc7fc7386a82b7b17eaeaa3aa/Web_72DPI-20210217_WeWork_Collab_Hub_10_York_rd_-_London_015.jpg?q=100"
            alt=""
            width={1200}
            height={800}
            className="aspect-square w-full rounded-lg object-cover lg:aspect-[3/2] 2xl:aspect-video"
          />

          <Image
            // eslint-disable-next-line @stylistic/max-len
            src="https://ctfassets.imgix.net/vh7r69kgcki3/PPRIIo3Y6jNCstqkzeX3H/4fe1db85c016ab644fecf1d4efab1eb4/Web_72DPI-20190318_WeWork_1_Belvedere_Drive_-_Common_Areas_-_Wide-1.jpg?q=100"
            alt=""
            width={1200}
            height={800}
            className="aspect-square w-full rounded-lg object-cover lg:aspect-[3/2] 2xl:aspect-video"
          />

          <Image
            src="https://www.coworkingcafe.com/blog/wp-content/uploads/sites/79/2024/09/wework-survey.jpg?q=100"
            alt=""
            width={1200}
            height={800}
            className="aspect-square w-full rounded-lg object-cover lg:aspect-[3/2] 2xl:aspect-video"
          />
        </div>
      </div>

      <div className="text-center">
        <Heading as="h2" className="mb-6" size={{ initial: '6', sm: '7', md: '8' }} weight="medium">
          Ready to transform your workspace strategy?
        </Heading>

        <Button size={{ initial: '3', xs: '4' }}>Contact our enterprise team</Button>
      </div>
    </div>
  )
}
