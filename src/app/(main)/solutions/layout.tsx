'use client'

import { usePathname } from 'next/navigation'

import { ScrollArea, TabNav } from '@radix-ui/themes'

const solutions = [
  { name: 'Office Space', href: '/solutions/office-space' },
  { name: 'Coworking Membership', href: '/solutions/coworking-membership' },
  { name: 'Dedicated Desk', href: '/solutions/dedicated-desk' },
  { name: 'Virtual Office', href: '/solutions/virtual-office' },
  { name: 'Meeting Rooms', href: '/solutions/meeting-rooms' },
  { name: 'Enterprise Solutions', href: '/solutions/enterprise' }
]

export default function SolutionsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-white/60 shadow-[inset_0_-1px_0_0_#eee] backdrop-blur">
        <ScrollArea type="auto" scrollbars="horizontal" className="h-[52px]">
          <TabNav.Root>
            {[{ href: '/solutions', name: 'Overview' }, ...solutions].map(item => (
              <TabNav.Link key={item.href} href={item.href} active={pathname === item.href}>
                {item.name}
              </TabNav.Link>
            ))}
          </TabNav.Root>
        </ScrollArea>
      </header>

      <div className="flex-1">{children}</div>
    </div>
  )
}
