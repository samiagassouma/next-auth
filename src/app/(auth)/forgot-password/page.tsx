import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Enter Email Address"
      image={"/forgot-password/email.png"}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
