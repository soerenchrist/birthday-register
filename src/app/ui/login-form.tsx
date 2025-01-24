"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from 'lucide-react'
import { useActionState } from "react"
import { authenticate } from "../lib/actions"

export default function LoginForm() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
          <Lock className="mr-2 h-6 w-6 text-indigo-600" />
          Login
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Benutzername</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="Gib deinen Benutzernamen ein"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <Input
              id="password"
              type="password"
              placeholder="Gib dein Passwort ein"
              name="password"
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700"
            aria-disabled={isPending}>
            Anmelden
          </Button>
          <div className="flex h-8 items-end space-x-1" aria-live='polite' aria-atomic="true">
            {errorMessage && (
              <>
                <p className='text-sm text-red-500'>{errorMessage}</p>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

