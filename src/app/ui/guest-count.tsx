import { Card, CardContent } from "@/components/ui/card";
import { fetchGuestCount } from "../lib/data";
import { Users } from "lucide-react";
import { ReactNode } from "react";

type GuestCountProps = {
  registered: boolean,
  attending?: boolean,
  count?: number
}

export async function GuestCount({ registered, attending, count }: GuestCountProps) {
  const totalCount = await fetchGuestCount()

  return (
    <Card className="mb-8">
      <CardContent className="flex items-center justify-center space-x-4 py-6">
        <Users className="w-6 h-6 text-indigo-600" />
        <div className="flex justify-center">
          {registered ? <Registered count={count!} totalCount={totalCount} attending={attending!} />
            : <Text>Sei einer von {totalCount} Gästen und feier mit mir!</Text>
          }
        </div >
      </CardContent>
    </Card>
  )
}

function Registered({ count, totalCount, attending }: { attending: boolean, count: number, totalCount: number }) {
  if (attending) {
    return (<Attending count={count} totalCount={totalCount} />)
  }

  return <Text>Schade, dass du nicht dabei sein kannst...</Text>
}

function Attending({ count, totalCount }: { count: number, totalCount: number }) {
  if (count === 1) return (<SinglePersonAttending totalCount={totalCount} />)

  return (
    <MultiplePersonsAttending totalCount={totalCount} />
  )

}

function SinglePersonAttending({ totalCount }: { totalCount: number }) {
  return (
    <Text>Du bist einer von {totalCount} Gästen. Ich freue mich auf dich!</Text>
  )
}

function MultiplePersonsAttending({ totalCount }: { totalCount: number }) {
  return (
    <Text>Ihr gehört zu den {totalCount} Gästen. Ich freue mich auf euch!</Text>
  )
}

function Text({ children }: { children: ReactNode }) {
  return <h2 className="text-md md:text-2xl font-semibold">{children}</h2>
}
