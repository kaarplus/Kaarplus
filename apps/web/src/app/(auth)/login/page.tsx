import { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login | Kaarplus",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <div className="w-full">
      <LoginForm />
    </div>
  )
}
