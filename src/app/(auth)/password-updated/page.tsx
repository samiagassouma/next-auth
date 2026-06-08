import AuthShell from "@/components/auth/AuthShell";

export default function PasswordUpdatedPage() {
  return (
    <AuthShell
      title=""
      image="/forgot-password/password_updated.png"
      headingIcon="/forgot-password/password_updated2.png"
    >
      <div className="text-center space-y-8">
        <p className="text-[27px] font-bold leading-[1.2] text-[#22B14C] sm:text-[28px]">
          Password updated !
        </p>
        <p className="mt-2 text-sm text-[#596255]">
          Your password has been successfully updated.
        </p>
        <p className="mt-2 text-sm text-[#596255]">
          Redirecting you now...
        </p>
      </div>
    </AuthShell>
  );
}