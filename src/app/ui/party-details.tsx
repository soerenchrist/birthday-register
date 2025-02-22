import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Gift, MapPin } from "lucide-react"


interface PartyDetailsProps {
  address: string
  wishlist: string
}

export default function PartyDetails({ address, wishlist }: PartyDetailsProps) {
  return (
    <div className="space-y-4 mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-700" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="aspect-video w-full rounded-lg overflow-hidden border">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=9.17810082435608%2C49.44432860090654%2C9.19160842895508%2C49.45771322886836&amp;layer=mapnik&amp;marker=49.45102137171198%2C9.184854626655579"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              title="Party Location"
            />
          </div>
          <p className="text-gray-600">{address}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-700" />
              Datum & Zeit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Mittwoch, 28. Mai 2025
              </p>
              <p className="text-gray-600">
                ab 19:00 Uhr
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-blue-700" />
              Wunschliste
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {wishlist}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


