import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserPlus, Users } from "lucide-react"
import { fetchGuestCount, fetchGuests } from "../lib/data"

export default async function Page() {
  const totalGuests = await fetchGuestCount()
  const guests = await fetchGuests()

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <Users className="mr-2 h-6 w-6 text-blue-700" />
            Registrierte Gäste
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reg. am</TableHead>
                <TableHead>Anzahl Gäste</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {guests.map((reg, index) => (
                <TableRow key={index}>
                  <TableCell>{reg.name}</TableCell>
                  <TableCell>{reg.attending ? "Kommt" : "Kommt nicht"}</TableCell>
                  <TableCell>{reg.updatedAt?.toDateString() ?? "-"}</TableCell>
                  <TableCell>{reg.attending ? reg.count : "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center">
            <UserPlus className="mr-2 h-6 w-6 text-blue-700" />
            Zusammenfassung
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Gesamtzahl der Gäste: <span className="font-bold text-blue-700">{totalGuests}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
