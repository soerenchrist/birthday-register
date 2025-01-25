"use server";
import { db } from "@/db";
import { guestsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod"
import { Guest } from "./types";
import { eq } from "drizzle-orm";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const RegisterSchema = z.object({
  id: z.string().optional().nullish(),
  name: z.string().nonempty({
    message: 'Bitte gib deinen Namen ein'
  }),
  attending: z.enum(["true", "false"]),
  count: z.coerce.number({
    message: 'Bitte melde mindestens 1 Person an'
  }).min(0)
})

export type RegistrationState = {
  errors?: {
    name?: string[],
    count?: string[],
  },
  message?: string | null
}

export async function register(_: RegistrationState, formData: FormData): Promise<RegistrationState> {
  const validation = RegisterSchema.safeParse({
    id: formData.get("id"),
    name: formData.get("name"),
    attending: formData.get("attending"),
    count: formData.get("count")
  })

  if (!validation.success) {
    return {
      errors: validation.error.flatten().fieldErrors,
      message: 'Missing fields. Failed to register'
    }
  }

  const { id, attending, name, count } = validation.data;
  if (attending === "true" && count < 1) {
    return {
      errors: {
        count: ['Bitte melde mindestens 1 Person an']
      }
    }
  }

  const updatedCount = attending ? count : 0;


  if (id) {
    const updatedGuest = await db.update(guestsTable).set({
      attending: attending === "true",
      count: updatedCount,
      name: name
    }).where(eq(guestsTable.id, id))
      .returning()

    await setCookie(updatedGuest[0])
  } else {
    const insertedGuest = await db.insert(guestsTable).values({
      count: updatedCount,
      name: name,
      attending: attending === "true"
    }).returning()
    await setCookie(insertedGuest[0])
  }


  revalidatePath("/")
  return {
    errors: {},
    message: null
  }
}

export async function readStoredCookie() {
  const cookieStore = await cookies()
  const data = cookieStore.get('registered-info')
  if (!data) return undefined;

  return JSON.parse(data.value) as Guest;
}

async function setCookie(data: Guest) {
  const cookieStore = await cookies()
  const json = JSON.stringify(data)
  cookieStore.set('registered-info', json, {
    httpOnly: true,
    sameSite: 'strict',
    expires: new Date("2025-05-30T00:00:00")
  })
}

export async function authenticate(_: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData)
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials'
        default:
          return 'Something went wrong'
      }
    }

    throw error;
  }
}
