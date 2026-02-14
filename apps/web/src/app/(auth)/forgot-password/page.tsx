import { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export const metadata: Metadata = {
    title: "Forgot Password | Kaarplus",
    description: "Reset your password",
}

export default function ForgotPasswordPage() {
    return (
        <div className="w-full">
            <ForgotPasswordForm />
        </div>
    )
}
