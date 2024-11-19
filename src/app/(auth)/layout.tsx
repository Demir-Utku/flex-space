import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="h-full grid place-items-center m-auto p-4">{children}</div>
}
