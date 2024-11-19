import { TabNav } from '@radix-ui/themes'

interface NavigationItem {
  name: string
  href: string
}

export default function ScrollableContent({ items }: { items: NavigationItem[] }) {
  return (
    <TabNav.Root>
      {items.map(item => (
        <TabNav.Link key={item.href} href={item.href}>
          {item.name}
        </TabNav.Link>
      ))}
    </TabNav.Root>
  )
}
