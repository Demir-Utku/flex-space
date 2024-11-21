'use client'

import { useLayoutEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { Box, Card, Heading, Inset } from '@radix-ui/themes'
import { motion } from 'framer-motion'

import { Text } from '@/components/ui/text'
import { cn } from '@/lib/utils'

const solutions = [
  {
    title: 'Private Office',
    description: 'Fully-furnished office with professional amenities.',
    slug: 'office-space',
    image: {
      mobile: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=100',
      desktop: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=100'
    }
  },
  {
    title: 'Co-working',
    description: 'Access to hundreds of coworking spaces worldwide.',
    slug: 'coworking-membership',
    image: {
      mobile: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=100',
      desktop: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?q=100'
    }
  },
  {
    title: 'Dedicated Desk',
    description: 'Your personal desk in a shared office environment.',
    slug: 'dedicated-desk',
    image: {
      mobile: 'https://images.unsplash.com/photo-1593642532744-d377ab507dc8?q=100',
      desktop: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=100'
    }
  },
  {
    title: 'On Demand',
    description: 'Book space by the day or hour, no commitment required.',
    slug: 'meeting-rooms',
    image: {
      mobile: 'https://images.unsplash.com/photo-1577412647305-991150c7d163?q=100',
      desktop: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=100'
    }
  }
]

export default function Solutions() {
  const [isMobile, setIsMobile] = useState(false)

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768) // Define the breakpoint for mobile devices
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {solutions.map((solution, index) => (
        <Link href={`/solutions/${solution.slug}`} key={solution.title}>
          <Card className="h-full w-full p-0">
            <Inset clip="padding-box" side="top" pb="current">
              <div className="relative overflow-hidden">
                <motion.div
                  key={isMobile ? solution.image.mobile : solution.image.desktop}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: 'linear' }}
                >
                  <Image
                    alt={solution.title}
                    src={isMobile ? solution.image.mobile : solution.image.desktop}
                    width={isMobile ? 800 : 1600}
                    height={isMobile ? 1200 : 900}
                    quality={100}
                    priority={isMobile ? index === 0 : index < 2}
                    className={cn('w-full object-cover', isMobile ? 'aspect-[2/3]' : 'aspect-video')}
                  />
                </motion.div>
              </div>
            </Inset>

            <Box p="4">
              <Heading size={{ initial: '2', xs: '3', sm: '4' }} mb="2">
                {solution.title}
              </Heading>

              <Text as="p" size={{ initial: '1', xs: '2', sm: '3' }} mb="4">
                {solution.description}
              </Text>
            </Box>
          </Card>
        </Link>
      ))}
    </div>
  )
}
