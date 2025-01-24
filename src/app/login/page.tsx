import { Suspense } from "react";
import LoginForm from "../ui/login-form";

export default function LoginPage() {
  return (
    <div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  )
}
