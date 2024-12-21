'use client'

/* eslint-disable @stylistic/max-len */
import { useState } from 'react'

import Image from 'next/image'

import { Box, Button, Flex } from '@radix-ui/themes'
import { IconArrowRight } from '@tabler/icons-react'
import { motion } from 'framer-motion'

const images = [
  'https://cdn-images.wework.com/images/4E0C4A54-BD66-11EB-820D-0E6A5DC689CD/4e0c4a54-bd66-11eb-820d-0e6a5dc689cd_0.jpg',
  'https://cdn-images.wework.com/images/8FD60B8E-D15D-11E8-85DE-1202BE33576A/8fd60b8e-d15d-11e8-85de-1202be33576a_1.jpg',
  'https://cdn-images.wework.com/images/8F05E170-D15D-11E8-85DE-1202BE33576A/8f05e170-d15d-11e8-85de-1202be33576a_2.jpg',
  'https://cdn-images.wework.com/images/8F2FF3DE-D15D-11E8-85DE-1202BE33576A/8f2ff3de-d15d-11e8-85de-1202be33576a_3.jpg',
  'https://cdn-images.wework.com/images/8F52094C-D15D-11E8-85DE-1202BE33576A/8f52094c-d15d-11e8-85de-1202be33576a_4.jpg',
  'https://cdn-images.wework.com/images/8F804F3C-D15D-11E8-85DE-1202BE33576A/8f804f3c-d15d-11e8-85de-1202be33576a_5.jpg',
  'https://cdn-images.wework.com/images/8FAEEE14-D15D-11E8-85DE-1202BE33576A/8faeee14-d15d-11e8-85de-1202be33576a_6.jpg'
]

export default function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  function getNextImage() {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
  }

  return (
    <Box className="relative h-auto w-full overflow-hidden">
      <motion.div
        style={{
          display: 'flex',
          width: '100%'
        }}
        initial={false}
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: 'keyframes', duration: currentIndex === 0 ? 1 : 0.5, ease: 'linear' }}
      >
        {images.map((src, index) => (
          <Box key={index} className="relative flex w-full shrink-0">
            <Image
              src={src}
              width={800}
              height={500}
              alt={`Workspace image ${index + 1}`}
              className="h-auto w-full object-scale-down"
              priority={index === currentIndex}
              quality={100}
            />
          </Box>
        ))}
      </motion.div>

      <Button
        variant="surface"
        className="absolute right-4 top-1/2 z-20 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white sm:size-14 md:size-16"
        aria-label="Next image"
        onClick={getNextImage}
      >
        <IconArrowRight className="m-0 size-6 shrink-0 p-0 sm:size-7 md:size-8" />
      </Button>

      <Flex
        justify="center"
        gap="2"
        style={{
          position: 'absolute',
          bottom: '16px',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)'
            }}
            aria-label="Go to image next image"
          />
        ))}
      </Flex>
    </Box>
  )
}
