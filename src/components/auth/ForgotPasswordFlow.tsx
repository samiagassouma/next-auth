"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthShell from "./AuthShell";
import ForgotPasswordForm from "./ForgotPasswordForm";
import OtpForm from "./OtpForm";
import type { RecoveryMethod } from "@/lib/validation";

type FlowStep = "email" | "otp" | "choose-method";

const recoveryOptions: Array<{
  method: RecoveryMethod;
  title: string;
  description: string;
  icon: string;
}> = [
    {
      method: "email",
      title: "Email",
      description: "Code to your inbox",
      icon: "/forgot-password/emailIcon.png",
    },
    {
      method: "phone",
      title: "SMS",
      description: "Code via text message",
      icon: "/forgot-password/phoneIcon.png",
    },
    {
      method: "whatsapp",
      title: "Whatsapp",
      description: "Code via Whatsapp",
      icon: "/forgot-password/whatsappIcon.png",
    },
  ];

export default function ForgotPasswordFlow() {
  const [step, setStep] = useState<FlowStep>("choose-method");
  const [identifier, setIdentifier] = useState("");
  const [method, setMethod] = useState<RecoveryMethod>("email");
  const [email, setEmail] = useState("");

  console.log("identity", { identifier, method });
  if (step === "choose-method") {
    return (
      <AuthShell
        title="Find your Account"
        image="/forgot-password/choose_method.png"
        subtitle="Choose how you'd like to restore access to your account."
      >
        <div className="mx-auto flex w-full max-w-[300px] flex-col gap-4">
          {recoveryOptions.map((option) => (
            <button
              className="flex h-[82px] w-full items-center gap-4 rounded-2xl bg-white px-4 text-left shadow-[0_2px_12px_rgba(30,18,55,0.11)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(30,18,55,0.14)] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/10"
              key={option.method}
              onClick={() => {
                setMethod(option.method);
                setStep("email");
              }}
              type="button"
            >
              <span className="flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[#dff0ff]">
                <Image
                  alt=""
                  className="h-20 w-20 object-contain"
                  height={36}
                  src={option.icon}
                  width={36}
                />
              </span>
              <span>
                <span className="block text-xl font-medium leading-6 text-[#6a00c2]">
                  {option.title}
                </span>
                <span className="mt-1 block text-xs text-[#91a0b6]">
                  {option.description}
                </span>
              </span>
            </button>
          ))}

          <div className="flex justify-center">
            <Link className="inline-flex items-center gap-1 text-sm font-medium text-[#6a00c2] hover:bg-purple-50" href="/login">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19L5 12L12 5" />
              </svg>
              Back To Login
            </Link>
          </div>

        </div>
      </AuthShell>
    );
  }

  if (step === "otp") {
    return (
      <AuthShell
        title="Enter OTP"
        subtitle="We have sent a OTP"
        image="/forgot-password/enter_otp.png"
        contentClassName="max-w-[720px]"
      >
        <OtpForm identifier={identifier} method={method} />
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
        onOtpRequested={(payload) => {
          setMethod(payload.method);
          setIdentifier(payload.identifier);
          setStep("otp");
        }}
        onChooseMethod={() => setStep("choose-method")}
      />
    </AuthShell>
  );
}
