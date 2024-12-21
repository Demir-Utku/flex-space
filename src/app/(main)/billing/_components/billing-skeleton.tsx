import { Card, Skeleton } from '@radix-ui/themes'

export function BillingSkeleton() {
  return (
    <>
      <section>
        <Card className="space-y-2 p-8">
          <Skeleton className="h-7 w-24" />

          <Skeleton className="h-5 w-36" />
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="flex flex-col p-2">
            <div className="h-full">
              <Skeleton className="h-7 w-24" />

              <Skeleton className="h-4 w-36" />
            </div>

            <div className="h-full flex-1 space-y-6">
              <Skeleton className="h-8 w-24" />

              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-5 w-5 rounded-full" />

                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        ))}
      </section>
    </>
  )
}
