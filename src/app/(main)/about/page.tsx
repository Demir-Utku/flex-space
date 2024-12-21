import Image from 'next/image'

import { Heading } from '@radix-ui/themes'
import { IconBuildingSkyscraper, IconUsers } from '@tabler/icons-react'

import { type Location, locations } from '@/data/locations'

function groupLocationsByRegion(locationData: Location) {
  const groupedLocations: Record<string, string[]> = {}

  Object.entries(locationData).forEach(([region, countries]) => {
    groupedLocations[region] = []

    Object.entries(countries).forEach(([_country, cities]) => {
      const cityNames = Object.keys(cities as Record<string, unknown>)

      cityNames.forEach(city => {
        if (groupedLocations[region] && !groupedLocations[region].includes(city)) {
          groupedLocations[region].push(city)
        }
      })
    })

    // Sort cities alphabetically
    groupedLocations[region].sort()

    // If more than 10 cities, keep only first 10 and add "etc."
    if (groupedLocations[region].length > 10) {
      groupedLocations[region] = groupedLocations[region].slice(0, 10)
      groupedLocations[region].push('etc.')
    }
  })

  return groupedLocations
}

export default function AboutPage() {
  return (
    <div className="h-full px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <Heading size="8" className="mb-4">Our Story</Heading>

          <p className="text-gray-600 text-lg leading-relaxed">
            Founded in 2023, FlexSpace emerged from a simple observation: the way we work
            is changing, and the spaces we work in should evolve with us.
          </p>

          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="https://images.unsplash.com/photo-1567521464027-f127ff144326?q=100"
            />

            <Image
              src="https://images.unsplash.com/photo-1686345233737-8f218f94f44f?q=100"
              alt="Modern office space"
              width={2000}
              height={2000}
              quality={100}
              className="aspect-[2/3] w-full object-cover md:aspect-square lg:aspect-[3/2] xl:aspect-video"
              priority
            />
          </picture>
        </section>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12">
          <section>
            <Heading size="6" className="mb-4">Our Mission</Heading>

            <p className="text-gray-600 leading-relaxed">
              At FlexSpace, we believe that the right workspace can transform how people work
              and collaborate. Our mission is to create an ecosystem where businesses of all
              sizes can thrive by providing them with flexible, professional spaces that
              adapt to their needs.
            </p>
          </section>

          <section>
            <Heading size="6" className="mb-4">Our Vision</Heading>

            <p className="text-gray-600 leading-relaxed">
              We envision a future where work is not confined to traditional office spaces.
              By breaking down the barriers between work and workspace, we&apos;re creating
              environments that inspire creativity, foster collaboration, and drive success.
            </p>
          </section>
        </div>

        {/* Impact Numbers */}
        <section className="bg-gray-50 p-8 rounded-xl">
          <Heading size="6" className="text-center mb-8">Our Impact</Heading>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">50+</p>

              <p className="text-gray-600">Locations</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-600">1000+</p>

              <p className="text-gray-600">Members</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-600">10</p>

              <p className="text-gray-600">Cities</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-blue-600">98%</p>

              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section>
          <Heading size="6" className="mb-6">Our Values</Heading>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Flexibility First</h3>

              <p className="text-gray-600">
                We understand that every business is unique, and we&apos;re committed to
                providing solutions that adapt to your changing needs. From hot desks to
                private offices, our spaces grow with your business.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Community-Driven</h3>

              <p className="text-gray-600">
                We believe in the power of community and create environments where
                meaningful connections can flourish. Our spaces are designed to foster
                collaboration and networking opportunities.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>

              <p className="text-gray-600">
                We continuously evolve our spaces and services to meet the demands
                of the modern workforce. Our technology-first approach ensures a
                seamless experience for all members.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>

              <p className="text-gray-600">
                Environmental responsibility is at the core of our operations. We implement
                eco-friendly practices and design spaces that minimize our carbon footprint.
              </p>
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="bg-gray-50 p-8 rounded-xl">
          <div className="flex items-center gap-4 mb-6">
            <IconBuildingSkyscraper className="h-8 w-8 text-blue-600" />

            <Heading size="6">Global Presence</Heading>
          </div>

          <p className="text-gray-600 mb-4">
            With locations across major business hubs, FlexSpace provides consistent,
            high-quality workspace solutions globally. Our presence spans:
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(groupLocationsByRegion(locations)).map(([region, cities]) => (
              <div key={region}>
                <h4 className="font-semibold mb-3">{region}</h4>

                <ul className="text-gray-600 space-y-2">
                  {cities.sort().map(city => (
                    <li key={city} className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-2" />

                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <IconUsers className="h-8 w-8 text-blue-600" />

            <Heading size="6">Our Team</Heading>
          </div>

          <p className="text-gray-600 leading-relaxed">
            FlexSpace is powered by a dedicated team of workspace specialists,
            community managers, and technology experts. Together, we work to create
            the best possible experience for our members. Our diverse team brings together
            expertise from real estate, hospitality, technology, and community building
            to deliver exceptional workspace solutions.
          </p>
        </section>
      </div>
    </div>
  )
}
