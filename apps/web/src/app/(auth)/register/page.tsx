import { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Register | Kaarplus",
  description: "Create an account",
}

export default function RegisterPage() {
  return (
    <div className="w-full">
      <RegisterForm />
    </div>
  )
}
