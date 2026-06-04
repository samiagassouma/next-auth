"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { getApiErrorMessage, resendOtp, verifyOtp } from "@/lib/auth-api";
import type { RecoveryMethod } from "@/lib/validation";

type OtpFormProps = {
  identifier: string;
  method: RecoveryMethod;
};

const OTP_LENGTH = 6;
const INITIAL_SECONDS = 180;

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const remainingSeconds = (seconds % 60).toString().padStart(2, "0");

  return `${minutes}:${remainingSeconds}`;
}

function normalizeOtp(value: string) {
  return value.replace(/\D/g, "").slice(0, OTP_LENGTH);
}

function getIdentifierParamName(method: RecoveryMethod) {
  if (method === "email") {
    return "email";
  }

  if (method === "phone") {
    return "phone_number";
  }

  return "whatsapp_number";
}

function getWrongIdentifierLabel(method: RecoveryMethod) {
  if (method === "email") {
    return "Wrong email?";
  }

  if (method === "phone") {
    return "Wrong phone number?";
  }

  return "Wrong WhatsApp number?";
}

export default function OtpForm({ identifier, method }: OtpFormProps) {
  const router = useRouter();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");

  const otp = digits.join("");

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  function validateOtp(nextDigits = digits) {
    const code = nextDigits.join("");

    if (code.length !== OTP_LENGTH || !/^\d{6}$/.test(code)) {
      return "Invalid Code";
    }

    return "";
  }

  function updateDigits(nextDigits: string[]) {
    setDigits(nextDigits);
    setMessage("");

    if (hasSubmitted) {
      setError(validateOtp(nextDigits));
    }
  }

  function handleChange(index: number) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const value = normalizeOtp(event.target.value);

      if (!value) {
        const nextDigits = [...digits];
        nextDigits[index] = "";
        updateDigits(nextDigits);
        return;
      }

      const nextDigits = [...digits];
      value.split("").forEach((digit, offset) => {
        if (index + offset < OTP_LENGTH) {
          nextDigits[index + offset] = digit;
        }
      });
      updateDigits(nextDigits);

      const nextIndex = Math.min(index + value.length, OTP_LENGTH - 1);
      inputsRef.current[nextIndex]?.focus();
    };
  }

  function handleKeyDown(index: number) {
    return (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Backspace" && !digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }

      if (event.key === "ArrowLeft" && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }

      if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    };
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();

    const pastedOtp = normalizeOtp(event.clipboardData.getData("text"));

    if (!pastedOtp) {
      return;
    }

    const nextDigits = Array(OTP_LENGTH).fill("");
    pastedOtp.split("").forEach((digit, index) => {
      nextDigits[index] = digit;
    });
    updateDigits(nextDigits);
    inputsRef.current[Math.min(pastedOtp.length, OTP_LENGTH) - 1]?.focus();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);

    const nextError = validateOtp();
    setError(nextError);

    if (nextError) {
      return;
    }
    console.log("Submitting OTP:", otp);

    try {
      console.log("form submitted with OTP:", otp);
      const email: string = "gassouma.samia888@esprit.tn";
      // In a real app, you would verify the OTP here before navigating to the reset password page.
      console.log("Verifying OTP with backend...", otp, email);
      //await verifyOtp( otp, email );
      const params = new URLSearchParams({
        method,
        [getIdentifierParamName(method)]: identifier,
        otp,
      });
      router.push(`/reset-password?${params.toString()}`);
    } catch (submissionError) {
      setError(getApiErrorMessage(submissionError, "Invalid OTP. Please try again."));
    }


  }

  async function handleResendOtp() {
    setIsResending(true);
    setMessage("");

    try {
      await resendOtp({ method, identifier });
      setSecondsLeft(INITIAL_SECONDS);
      setMessage("A new OTP has been sent.");
    } catch (resendError) {
      setMessage(
        getApiErrorMessage(resendError, "Could not resend OTP. Try again."),
      );
    } finally {
      setIsResending(false);
    }
  }

  return (
    <form className="mx-auto w-full max-w-[680px] space-y-9" onSubmit={handleSubmit}>
      <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-[#cdaaf0] px-4 py-3 text-sm text-[#8790a0]">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-[#7a00c8] text-sm font-bold text-[#7a00c8]">
          i
        </span>
        <span>
          The code expires in <strong className="text-[#6a00c2]">3 minutes</strong>.
          Don&apos;t share it with anyone.
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {digits.map((digit, index) => (
            <div className="flex items-center gap-3 sm:gap-4" key={index}>
              <input
                aria-label={`OTP digit ${index + 1}`}
                autoComplete={index === 0 ? "one-time-code" : "off"}
                className={`h-16 w-16 rounded-lg border bg-white text-center text-xl text-[#1a1230] outline-none transition focus:ring-4 sm:h-[66px] sm:w-[88px] ${error
                    ? "border-[#ff4b4b] focus:border-[#ff4b4b] focus:ring-[#ff4b4b]/10"
                    : "border-[#b762ec] focus:border-[#7a00c8] focus:ring-[#7a00c8]/10"
                  }`}
                inputMode="numeric"
                maxLength={1}
                onChange={handleChange(index)}
                onKeyDown={handleKeyDown(index)}
                onPaste={handlePaste}
                ref={(element) => {
                  inputsRef.current[index] = element;
                }}
                type="text"
                value={digit}
              />
              {index < OTP_LENGTH - 1 ? (
                <span className="text-xl text-[#8f96a3]">-</span>
              ) : null}
            </div>
          ))}
        </div>
        {error ? (
          <p className="text-center text-sm text-[#ff4b4b]">{error}</p>
        ) : null}
      </div>

      <p className="text-center text-4xl font-medium text-[#8790a0]">
        {formatTime(secondsLeft)}
      </p>

      {message ? (
        <p className="text-center text-sm text-[#6a00c2]">{message}</p>
      ) : null}

      <button
        className="h-11 w-full rounded-2xl bg-[#7600c6] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(118,0,198,0.24)] transition hover:bg-[#5e009f] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/20 disabled:cursor-not-allowed disabled:bg-[#b990d7]"
        type="submit"
      >
        Verify
      </button>

      <p className="text-center text-xl text-[#333d4f]">
        Didn&apos;t receive code?{" "}
        <button
          className="font-bold text-[#7a33d1] hover:text-[#5e009f] disabled:cursor-not-allowed disabled:text-[#a8a0b5]"
          disabled={isResending}
          onClick={handleResendOtp}
          type="button"
        >
          {isResending ? "Sending..." : "Resend OTP"}
        </button>
      </p>

      <p className="text-center text-sm text-[#8790a0]">
        {getWrongIdentifierLabel(method)}{" "}
        <Link className="font-semibold text-[#6a00c2]" href="/forgot-password">
          Start again
        </Link>
      </p>
    </form>
  );
}
