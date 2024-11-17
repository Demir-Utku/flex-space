import { api } from '@/trpc/react'

export function useUser() {
  return api.user.get.useQuery(
    undefined,
    {
      retry: false,
      refetchOnWindowFocus: false
    }
  )
}
