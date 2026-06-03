"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import AuthShell from "@/components/auth/AuthShell";
import { getApiErrorMessage, verifyEmail } from "@/lib/auth-api";

type VerifyEmailPageProps = {
  params: Promise<{
    token: string;
  }>;
};

type VerificationState = {
  type: "loading" | "success" | "error";
  message: string;
};

export default function VerifyEmailPage({ params }: VerifyEmailPageProps) {
  const { token } = use(params);
  const [state, setState] = useState<VerificationState>({
    type: "loading",
    message: "Verifying your email address...",
  });

  useEffect(() => {
    let isCurrent = true;

    async function verify() {
      try {
        await verifyEmail(token);

        if (isCurrent) {
          setState({
            type: "success",
            message: "Your email has been verified.",
          });
        }
      } catch (error) {
        if (isCurrent) {
          setState({
            type: "error",
            message: getApiErrorMessage(
              error,
              "Email verification failed. Please request a new code.",
            ),
          });
        }
      }
    }

    verify();

    return () => {
      isCurrent = false;
    };
  }, [token]);

  return (
    <AuthShell
      title="Email verification"
      subtitle="We are confirming the verification token from your email."
    >
      <div
        className={`rounded-lg border px-4 py-4 text-sm ${
          state.type === "success"
            ? "border-[#b8d8ca] bg-[#edf8f2] text-[#185b50]"
            : state.type === "error"
              ? "border-[#f1b9af] bg-[#fff0ed] text-[#9f2f27]"
              : "border-[#d7decd] bg-[#f7f8f4] text-[#596255]"
        }`}
        role="status"
      >
        {state.message}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <Link
          className="flex h-11 items-center justify-center rounded-lg bg-[#226f68] px-4 text-sm font-semibold text-white transition hover:bg-[#185b50] focus:outline-none focus:ring-4 focus:ring-[#226f68]/20"
          href="/login"
        >
          Go to login
        </Link>
        <Link
          className="flex h-11 items-center justify-center rounded-lg border border-[#cfd6c8] px-4 text-sm font-semibold text-[#226f68] transition hover:bg-[#eef4ef] focus:outline-none focus:ring-4 focus:ring-[#226f68]/15"
          href="/signup"
        >
          Sign up again
        </Link>
      </div>
    </AuthShell>
  );
}
