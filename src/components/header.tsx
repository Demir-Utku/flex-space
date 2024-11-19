'use client'

import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button, DropdownMenu, Heading, Skeleton } from '@radix-ui/themes'
import { IconMenu2, IconUser, IconX } from '@tabler/icons-react'
import { motion } from 'framer-motion'

import { logout } from '@/lib/lucia/actions'
import { useUser } from '@/lib/lucia/hooks'

const AuthenticatedButtons = () => {
  const router = useRouter()

  const { data: user } = useUser()

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="soft">
          <IconUser className="h-4 w-4" />

          {user?.username ?? 'Account'}
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={() => router.push('/bookings')}>
          My Bookings
        </DropdownMenu.Item>

        <DropdownMenu.Separator />

        <DropdownMenu.Item color="red" onClick={async () => await logout()}>
          Sign Out
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

const UnauthenticatedButtons = () => {
  return (
    <>
      <Link href="/register">
        <Button variant="solid" size={{ initial: '2', xs: '3' }}>
          Join Now
        </Button>
      </Link>

      <Link href="/login">
        <Button variant="outline" size={{ initial: '2', xs: '3' }}>
          Login
        </Button>
      </Link>
    </>
  )
}

function UserSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />
  }

  return user ? <AuthenticatedButtons /> : <UnauthenticatedButtons />
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/locations', label: 'Find a Location' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' }
  ]

  return (
    <nav className="bg-white shadow-md sm:sticky sm:top-0 sm:z-[1000]">
      <div className="mx-auto w-full max-w-screen-xl px-0 radix-xs:px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="relative flex min-h-20 items-center">
          <button
            type="button"
            tabIndex={0}
            className="flex size-8 items-center justify-center radix-xs:size-9 md:hidden radix-sm:h-10 radix-sm:w-10"
            onClick={() => setIsMenuOpen(true)}
          >
            <IconMenu2 className="h-6 w-6" />
          </button>

          <Link href="/" className="text-inherit no-underline">
            <Heading size={{ initial: '4', xs: '7', sm: '6', md: '8' }}>FlexSpace</Heading>
          </Link>

          {isMenuOpen && (
            <div className="fixed inset-0 z-[100] block bg-white md:hidden">
              <div className="ml-0 mt-5 flex w-full flex-col px-1 py-2 radix-xs:ml-1.5 radix-xs:px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                <button
                  type="button"
                  tabIndex={0}
                  className="flex h-6 w-6 items-center justify-center lg:hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <IconX className="h-6 w-6" />
                </button>

                <ul className="mt-6 flex flex-col gap-2.5 px-2">
                  <motion.li
                    key="home"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <Link href="/">
                      <Heading
                        size={{ initial: '5', xs: '7' }}
                        weight="bold"
                        color="gray"
                        className="hover:text-gray-12"
                      >
                        Home
                      </Heading>
                    </Link>
                  </motion.li>

                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.label}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ type: 'spring', stiffness: 100, delay: (index + 1) * 0.05 }}
                    >
                      <Link href={item.href}>
                        <Heading
                          size={{ initial: '5', xs: '7' }}
                          weight="bold"
                          color="gray"
                          className="hover:text-gray-12"
                        >
                          {item.label}
                        </Heading>
                      </Link>
                    </motion.li>
                  ))}

                  <UserSection />
                </ul>
              </div>
            </div>
          )}

          <div className="hidden flex-1 items-center px-6 md:flex lg:px-9 xl:px-12">
            <ul className="mx-auto flex list-none items-center gap-4 lg:gap-6">
              {navItems.map(item => (
                <li key={item.label} className="list-none">
                  <Link href={item.href}>
                    <Heading
                      size={{ initial: '3', md: '4', lg: '5' }}
                      weight="bold"
                      color="gray"
                      className="hover:text-gray-12"
                    >
                      {item.label}
                    </Heading>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="ml-auto hidden items-center gap-4 md:flex lg:gap-6">
            <UserSection />
          </div>
        </div>
      </div>
    </nav>
  )
}
