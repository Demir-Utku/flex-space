'use client'

/* eslint-disable @stylistic/max-len */
import { Suspense } from 'react'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Box, Button, Flex, Heading } from '@radix-ui/themes'
import {
  IconBrandAmazon,
  IconBrandApple,
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandSlack,
  IconChevronRight
} from '@tabler/icons-react'

import { Text } from '@/components/ui/text'
import { useUser } from '@/lib/lucia/hooks'

import LandingForm from './_components/form'
import Solutions from './_components/solutions'

const WorldMap = dynamic(() => import('./_components/map'), { ssr: false })

export default function LandingPage() {
  const { data: user } = useUser()
  const router = useRouter()

  const handleAuthAction = () => {
    router.push(user ? '/locations' : '/register')
  }

  return (
    <Flex direction="column">
      <div className="relative">
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

        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
          <Flex direction="column" align="center" gap="4" className="mx-auto max-w-4xl px-4">
            <Heading size={{ initial: '7', xs: '8', sm: '9' }} align="center" weight="bold" className="text-white">
              Welcome to FlexSpace
            </Heading>

            <Text size={{ initial: '3', xs: '4', sm: '5' }} align="center" weight="medium" className="text-white">
              Discover flexible workspace solutions tailored to your needs.
            </Text>

            <Button size="4" mt="2" onClick={handleAuthAction}>
              {user ? 'Find Workspace' : 'Get Started'}
            </Button>
          </Flex>
        </div>
      </div>

      <Box id="solutions" py="9">
        <Heading size={{ initial: '5', xs: '6', sm: '7', md: '8' }} align="center" mb="4">
          Explore our flexible solutions
        </Heading>

        <Text align="center" size={{ initial: '2', xs: '3', sm: '4' }} mb="8">
          Find the perfect workspace solution for your needs.
        </Text>

        <Solutions />

        <Box mt="8" className="text-center">
          <Button
            size="3"
            variant="surface"
            onClick={() => router.push(user ? '/locations' : '/login')}
          >
            View all solutions
            <IconChevronRight />
          </Button>
        </Box>
      </Box>

      <Box py="9">
        <Suspense fallback={<div className="h-[700px]" />}>
          <WorldMap className="h-[250px] w-full radix-xs:h-[350px] sm:h-[400px] md:h-[475px] lg:h-[550px] xl:h-[600px]" />
        </Suspense>
      </Box>

      <Box py="9">
        <Heading size={{ initial: '5', sm: '6', md: '7', lg: '8' }} align="center" mb="4">
          Trusted by the world&apos;s top companies
        </Heading>

        <Text align="center" size={{ initial: '2', sm: '3', md: '4' }} mb="8">
          From freelancers to Fortune 500s, we&apos;re helping our members reimagine the ways they work.
        </Text>

        <Flex justify="center" gap="8" wrap="wrap">
          <IconBrandSlack size={48} className="text-gray-7 hover:text-black" />

          <IconBrandLinkedin size={48} className="text-gray-7 hover:text-black" />

          <IconBrandFacebook size={48} className="text-gray-7 hover:text-black" />

          <IconBrandApple size={48} className="text-gray-7 hover:text-black" />

          <IconBrandAmazon size={48} className="text-gray-7 hover:text-black" />
        </Flex>
      </Box>

      <Box py="9">
        <LandingForm />
      </Box>

      <Box py="9">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=100"
            />

            <Image
              alt="People working in a modern office space"
              className="aspect-[2/3] w-full rounded-lg object-cover lg:aspect-video"
              width={600}
              height={900}
              src="https://images.unsplash.com/photo-1664575198308-3959904fa430?q=100"
            />
          </picture>

          <Box>
            <Heading size={{ initial: '5', sm: '6', md: '7', lg: '8' }} mb="4">
              Workspace made simple
            </Heading>

            <Text as="p" size={{ initial: '2', sm: '3', md: '4' }} mb="4">
              Whatever your budget or need, we make finding the perfect workspace easy. From flexible memberships to
              move-in ready offices, we give you the space and solutions to do your best work.
            </Text>

            <Button
              size="3"
              variant="surface"
              onClick={() => router.push(user ? '/locations' : '/login')}
            >
              Learn more
              <IconChevronRight />
            </Button>
          </Box>
        </div>
      </Box>

      <Box id="enterprise" py="9">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Box>
            <Heading size={{ initial: '5', sm: '6', md: '7', lg: '8' }} mb="4">
              Enterprise-grade solutions to power your hybrid strategy
            </Heading>

            <Text as="p" size={{ initial: '2', sm: '3', md: '4' }} mb="4">
              Give your real estate portfolio more flexibility while saving on costs by combining our turnkey offices,
              coworking spaces, and space management technology.
            </Text>

            <Button
              size="3"
              variant="surface"
              onClick={() => router.push(user ? '/locations' : '/login')}
            >
              Learn more
              <IconChevronRight />
            </Button>
          </Box>

          <picture>
            <source
              media="(min-width: 1024px)"
              srcSet="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=100"
            />

            <Image
              alt="Enterprise solutions"
              className="aspect-[2/3] w-full rounded-lg object-cover lg:aspect-video"
              width={600}
              height={900}
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=100"
            />
          </picture>
        </div>
      </Box>

      <Box id="contact" py="9">
        <Flex direction="column" align="center" gap="4">
          <Heading size={{ initial: '5', sm: '6', md: '7', lg: '8' }} align="center">
            Ready to transform your work experience?
          </Heading>

          <Text as="p" size={{ initial: '2', sm: '3', md: '4' }} align="center">
            Join thousands of satisfied professionals who have found their ideal workspace with FlexSpace.
          </Text>

          <Button size="4" onClick={handleAuthAction}>
            {user ? 'Find Workspace' : 'Get Started'}
          </Button>
        </Flex>
      </Box>
    </Flex>
  )
}
