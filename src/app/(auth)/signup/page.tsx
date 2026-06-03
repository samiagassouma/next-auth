import AuthShell from "@/components/auth/AuthShell";
import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <AuthShell
      title="Get more opportunities"
      subtitle="Or sign up with email"
      image={"/signup/signup.png"}
    >
      <SignupForm />
    </AuthShell>
  );
}
