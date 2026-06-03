"use client";

import { useState } from "react";
import AuthShell from "./AuthShell";
import ForgotPasswordForm from "./ForgotPasswordForm";
import OtpForm from "./OtpForm";
import Link from "next/link";

type FlowStep = "email" | "otp" | "choose-method";

type RecoveryMethod = "email" | "phone" | "whatsapp";

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<FlowStep>("choose-method");
  const [email, setEmail] = useState("");
  const [method, setMethod] = useState<RecoveryMethod>("email");

  if (step === "choose-method") {
    return (
      <AuthShell
        title="Choose Recovery Method"
        image="/forgot-password/choose_method.png"
      >
        <div className="flex flex-col gap-4">
          <button
            className="btn"
            onClick={() => { setMethod("email"); setStep("email"); }}
          >
            Recover via Email
          </button>
          <button
            className="btn"
            onClick={() => { setMethod("phone"); setStep("email"); }}
          >
            Recover via Phone
          </button>
          <button
            className="btn"
            onClick={() => { setMethod("whatsapp"); setStep("email"); }}
          >
            Recover via WhatsApp
          </button>
          <p className="text-center text-sm text-[#596255]">
            <Link className="font-semibold text-[#226f68] hover:text-[#185b50]" href="/login">
              Back To Login
            </Link>
          </p>
        </div>
      </AuthShell>
    );
  }

  if (step === "otp") {
    return (
      <AuthShell
        title="Enter OTP"
        subtitle="We have sent a code to you"
        image="/forgot-password/enter_otp.png"
        contentClassName="max-w-[720px]"
      >
        <OtpForm email={email} />
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title={
        method === "email"
          ? "Enter Email Address"
          : method === "phone"
            ? "Enter Phone Number"
            : "Enter WhatsApp Number"
      }
      image={
        method === "email"
          ? "/forgot-password/email.png"
          : method === "phone"
            ? "/forgot-password/phone.png"
            : "/forgot-password/whatsapp.png"
      }
      headingIcon={method === "email"
        ? "/forgot-password/email2.png"
        : method === "phone" ? "/forgot-password/phone2.png"
          : "/forgot-password/whatsapp2.png"
      }
    >
      <ForgotPasswordForm method={method}
        onOtpRequested={(nextEmail) => {
          setEmail(nextEmail);
          setStep("otp");
        }}
        onChooseMethod={() => setStep("choose-method")}
      />
    </AuthShell>
  );
}
