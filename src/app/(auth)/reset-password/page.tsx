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
  const returnValue : string = "success";
  if (returnValue === "success") {
      // Handle success case
      return (
        <AuthShell
          title="Password updated ! "
          image="/forgot-password/password_updated.png"
          headingIcon="/forgot-password/password_updated2.png"
        >
          <div className="text-center">
            <p className="text-lg font-semibold text-[#226f68]">
              Password updated ! 
            </p>
            <p className="mt-2 text-sm text-[#596255]">Your password has been successfully updated.</p>
            <p>Redirecting you now...</p>
          </div>
        </AuthShell>
      );
    
    
}

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
