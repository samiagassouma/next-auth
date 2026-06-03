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
        title="Find your Account"
        subtitle="Choose how you'd like to restore access to your account."
        image="/forgot-password/choose_method.png"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
              <img
                src="/forgot-password/emailIcon.png"
                alt="Email"
                className="h-8 w-8"
              />
            </div>

            <div>
              <h3 className="text-xl font-medium text-purple-700">
                Email
              </h3>
              <p className="text-sm text-gray-400">
                Code to your inbox
              </p>
            </div>
          </div>
          <button
            className="btn"
            onClick={() => { setMethod("phone"); setStep("email"); }}
          >
            Phone
          </button>
          <button
            className="btn"
            onClick={() => { setMethod("whatsapp"); setStep("email"); }}
          >
            WhatsApp
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
