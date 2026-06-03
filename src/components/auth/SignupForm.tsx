"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { getApiErrorMessage, resendOtp, signup } from "@/lib/auth-api";
import {
  hasValidationErrors,
  type FieldErrors,
  type SignupValues,
  validateSignup,
} from "@/lib/validation";
import FormField from "./FormField";
import PasswordField from "./PasswordField";

type FormMessage = {
  type: "success" | "error";
  text: string;
};

const initialValues: SignupValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  termsAccepted: false,
};

const passwordRules = [
  {
    label: "At least 8 characters",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "At least 1 number",
    test: (value: string) => /\d/.test(value),
  },
  {
    label: "At least 1 uppercase",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "At least 1 symbol",
    test: (value: string) => /[^A-Za-z0-9]/.test(value),
  },
];

function getPasswordScore(password: string) {
  return passwordRules.filter((rule) => rule.test(password)).length;
}

function getStrengthColor(score: number) {
  if (score >= 4) {
    return "bg-[#6dcc35]";
  }

  if (score === 3) {
    return "bg-[#f4bd00]";
  }

  if (score === 2) {
    return "bg-[#ff4545]";
  }

  return "bg-[#101010]";
}

function RuleIcon({ isMet }: { isMet: boolean }) {
  return (
    <span
      className={`relative inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-full ${
        isMet ? "bg-[#6dcc35]" : "bg-[#8d96a3]"
      }`}
    >
      {isMet ? (
        <span className="absolute left-[4px] top-[2px] h-[6px] w-[3px] rotate-45 border-b-2 border-r-2 border-white" />
      ) : (
        <>
          <span className="absolute h-px w-1.5 rotate-45 bg-white" />
          <span className="absolute h-px w-1.5 -rotate-45 bg-white" />
        </>
      )}
    </span>
  );
}

export default function SignupForm() {
  const [values, setValues] = useState<SignupValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<keyof SignupValues>>({});
  const [message, setMessage] = useState<FormMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const passwordScore = getPasswordScore(values.password);
  const activePasswordBars = Math.max(1, passwordScore);
  const passwordStrengthColor = getStrengthColor(passwordScore);

  function updateField(field: keyof SignupValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      const nextValues = {
        ...values,
        [field]: event.target.value,
      };

      setValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));

      if (hasSubmitted) {
        setErrors(validateSignup(nextValues));
      }

      setMessage(null);
    };
  }

  function updateTerms(event: ChangeEvent<HTMLInputElement>) {
    const nextValues = {
      ...values,
      termsAccepted: event.target.checked,
    };

    setValues((current) => ({
      ...current,
      termsAccepted: event.target.checked,
    }));

    if (hasSubmitted) {
      setErrors(validateSignup(nextValues));
    }

    setMessage(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasSubmitted(true);

    const nextErrors = validateSignup(values);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      console.log("Submitting signup with values:", values); // Debugging line
      await signup(values);
      setMessage({
        type: "success",
        text: "Account created. Check your email to verify your account.",
      });
      setValues((current) => ({
        ...initialValues,
        email: current.email,
      }));
      setHasSubmitted(false);
    } catch (error) {
      setMessage({
        type: "error",
        text: getApiErrorMessage(error, "Signup failed. Please try again."),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResendOtp() {
    const emailError = validateSignup({
      ...initialValues,
      email: values.email,
      fullName: "Valid Name",
      password: "Password1!",
      confirmPassword: "Password1!",
      termsAccepted: true,
    }).email;

    if (emailError) {
      setErrors((current) => ({
        ...current,
        email: emailError,
      }));
      return;
    }

    setIsResending(true);
    setMessage(null);

    try {
      await resendOtp({ email: values.email });
      setMessage({
        type: "success",
        text: "A new verification code has been sent.",
      });
    } catch (error) {
      setMessage({
        type: "error",
        text: getApiErrorMessage(
          error,
          "Could not resend the verification code.",
        ),
      });
    } finally {
      setIsResending(false);
    }
  }

  return (
    <form className="space-y-4" noValidate onSubmit={handleSubmit}>
      <div className="flex items-center justify-center gap-4">
        {[
          ["G", "Continue with Google"],
          ["X", "Continue with X"],
          ["in", "Continue with LinkedIn"],
          ["...", "More sign-up options"],
        ].map(([label, ariaLabel]) => (
          <button
            aria-label={ariaLabel}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold text-[#6d6079] shadow-[0_3px_8px_rgba(38,23,53,0.16)] transition hover:-translate-y-0.5 hover:text-[#6a00c2] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/10"
            key={ariaLabel}
            type="button"
          >
            {label}
          </button>
        ))}
      </div>

      <FormField
        id="fullName"
        label="Full name"
        value={values.fullName}
        onChange={updateField("fullName")}
        error={errors.fullName}
        autoComplete="name"
        placeholder="Enter your full name"
        required
        disabled={isSubmitting}
      />
      <FormField
        id="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={updateField("email")}
        error={errors.email}
        autoComplete="email"
        placeholder="Enter email address"
        required
        disabled={isSubmitting}
      />
      <PasswordField
        id="password"
        label="Password"
        value={values.password}
        onChange={updateField("password")}
        error={errors.password}
        autoComplete="new-password"
        placeholder="Enter password"
        required
        disabled={isSubmitting}
        showToggle={false}
      />

      {values.password ? (
        <div className="rounded-lg bg-white px-1 pb-2 pt-1 shadow-[0_10px_18px_rgba(38,23,53,0.14)]">
          <div className="mb-3 grid grid-cols-4 gap-3">
            {passwordRules.map((rule, index) => (
              <span
                className={`h-1 rounded-full ${
                  index < activePasswordBars
                    ? passwordStrengthColor
                    : "bg-[#c7cbd3]"
                }`}
                key={rule.label}
              />
            ))}
          </div>
          <div className="space-y-2 text-xs text-[#8a8192]">
            <p className="text-[10px]">
              Craft your password. It must contain :
            </p>
            {passwordRules.map((rule) => {
              const isMet = rule.test(values.password);

              return (
                <div className="flex items-center gap-2" key={rule.label}>
                  <RuleIcon isMet={isMet} />
                  <span>{rule.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <PasswordField
        id="confirmPassword"
        label="Confirm Password"
        value={values.confirmPassword}
        onChange={updateField("confirmPassword")}
        error={errors.confirmPassword}
        autoComplete="new-password"
        placeholder="Enter password"
        required
        disabled={isSubmitting}
        showToggle={false}
      />

      <div className="space-y-1">
        <label className="flex items-start gap-2 text-[11px] leading-5 text-[#6f6778]">
          <input
            checked={values.termsAccepted}
            className="mt-0.5 h-5 w-5 rounded border-[#9d6fea] accent-[#8f5ee6] focus:ring-[#7a00c8]"
            disabled={isSubmitting}
            id="termsAccepted"
            name="termsAccepted"
            onChange={updateTerms}
            type="checkbox"
          />
          <span>
            By selecting this, you acknowledge that you have read and accept the{" "}
            <a className="font-semibold text-[#6a00c2]" href="#terms">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="font-semibold text-[#6a00c2]" href="#privacy">
              Privacy Policy
            </a>
            .
          </span>
        </label>
        {errors.termsAccepted ? (
          <p className="px-2 text-[11px] text-[#ff4b4b]">
            {errors.termsAccepted}
          </p>
        ) : null}
      </div>

      {message ? (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            message.type === "success"
              ? "border-[#b8d8ca] bg-[#edf8f2] text-[#185b50]"
              : "border-[#f1b9af] bg-[#fff0ed] text-[#9f2f27]"
          }`}
          role="status"
        >
          {message.text}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-2xl bg-[#7600c6] px-4 text-sm font-bold text-white shadow-[0_8px_16px_rgba(118,0,198,0.24)] transition hover:bg-[#5e009f] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/20 disabled:cursor-not-allowed disabled:bg-[#b990d7]"
      >
        {isSubmitting ? "Creating account..." : "Continue"}
      </button>

      {message?.type === "success" ? (
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={isSubmitting || isResending}
          className="h-10 w-full rounded-2xl border border-[#e8d8f6] px-4 text-xs font-bold text-[#6a00c2] transition hover:bg-[#f8edff] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/10 disabled:cursor-not-allowed disabled:text-[#9b8fa8]"
        >
          {isResending ? "Sending..." : "Resend verification code"}
        </button>
      ) : null}

      <p className="text-sm text-[#7f718a]">
        Already have an account?{" "}
        <Link className="font-bold text-[#6a00c2] hover:text-[#50008f]" href="/login">
          Login
        </Link>
      </p>
    </form>
  );
}
