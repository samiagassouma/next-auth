import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthShell
      title="Continue your journey"
      image={"/login/login.png"}
      subtitle="Or login with email"
    >
      <LoginForm />
    </AuthShell>
  );
}
