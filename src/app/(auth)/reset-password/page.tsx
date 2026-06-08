import AuthShell from "@/components/auth/AuthShell";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

type ResetPasswordPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;
  const token = firstValue(params.token) ?? firstValue(params.reset_token);
  const method = firstValue(params.method);
  const email = firstValue(params.email);
  const phoneNumber = firstValue(params.phone_number);
  const whatsappNumber = firstValue(params.whatsapp_number);
  const uid = firstValue(params.uid);
  const otp = firstValue(params.otp);


return (
  <AuthShell
    title="Change your Password"
    image={"/forgot-password/change-password.png"}
  >
    <ResetPasswordForm
      token={token}
      method={
        method === "phone" || method === "whatsapp" || method === "email"
          ? method
          : undefined
      }
      email={email}
      phoneNumber={phoneNumber}
      whatsappNumber={whatsappNumber}
      uid={uid}
      otp={otp}
    />
  </AuthShell>
);
}
