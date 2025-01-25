"use client"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { register, RegistrationState } from "@/app/lib/actions";
import { useActionState, useState } from "react";
import { Guest } from "../lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterForm({ registeredInfo }: { registeredInfo?: Guest }) {
  const [attending, setAttending] = useState(registeredInfo?.attending ?? true);
  const [count, setCount] = useState(registeredInfo?.count ?? 1);

  const initialState: RegistrationState = { message: null, errors: {} }

  const [state, formAction] = useActionState(register, initialState)


  const isRegistered = registeredInfo !== undefined

  function handleRegister(formData: FormData) {
    formAction(formData)

    const attending = formData.get("attending")
    const count = formData.get("count")

    if (attending === "true") {
      if (count === "1") {
        toast.success("Danke für die Hilfe. Ich freue mich auf dich!")
      } else {
        toast.success("Danke für die Hilfe. Ich freue mich auf euch!")
      }
    } else {
      toast.success("Danke für die Hilfe. Schade dass du nicht kommen kannst...")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-center">
          {isRegistered
            ? "Teile mir mit wenn du deine Entscheidung geändert hast"
            : "Teile mir mit ob du kommst oder nicht"}
        </CardTitle>
      </CardHeader>
      <CardContent>

        <form action={handleRegister} className="space-y-6">
          {isRegistered && <input type="hidden" name="id" id="id" value={registeredInfo.id} />}
          <div className="space-y-2">
            <Label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Gib deinen Namen ein"
              defaultValue={registeredInfo?.name}
              aria-describedby="name-error"
            />
            <div id="name-error">
              {state?.errors?.name &&
                state.errors.name.map((error) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="block text-gray-700 text-sm font-bold mb-2">Wirst du teilnehmen?</Label>
            <RadioGroup value={attending.toString()}
              className="flex space-x-4"
              name="attending"
              onValueChange={(value) => setAttending(value === "true")}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="attending-yes" />
                <Label htmlFor="attending-yes">Ja</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="attending-no" />
                <Label htmlFor="attending-no">Nein</Label>
              </div>
            </RadioGroup>
          </div>
          {attending && (
            <motion.div initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              className="space-y-2">
              <div className="space-y-2">
                <Label htmlFor="guestCount" className="block text-gray-700 text-sm font-bold mb-2">
                  Anzahl Personen
                </Label>
                <Input
                  id="guestCount"
                  type="number"
                  name="count"
                  min="0"
                  value={count}
                  onChange={(e) => setCount(Number.parseInt(e.target.value))}
                  required
                  aria-describedby="count-error"
                />
                <div id="count-error">
                  {state?.errors?.count &&
                    state.errors.count.map((error) => (
                      <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                    ))}
                </div>
              </div>
            </motion.div>)}
          {isRegistered ?
            <Button type="submit" className="font-semibold w-full bg-indigo-600 hover:bg-indigo-700">Info anpassen</Button>
            :
            <Button type="submit" className="font-semibold w-full bg-indigo-600 hover:bg-indigo-700">{attending
              ? (count == 1 ? "Ich komme" : "Wir kommen")
              : "Ich komme nicht"}</Button>
          }
        </form>
      </CardContent>
    </Card>
  )
}
