"use client";

import { useState, type ChangeEvent } from "react";
import { forgotPassword, getApiErrorMessage } from "@/lib/auth-api";
import {
  hasValidationErrors,
  type FieldErrors,
  type ForgotPasswordValues,
  validateForgotPassword,
} from "@/lib/validation";
import FormField from "./FormField";

type ForgotPasswordFormProps = {
  onOtpRequested?: (email: string) => void;
  method: "email" | "phone" | "whatsapp";
  onChooseMethod?: () => void;
};

type FormMessage = {
  type: "success" | "error";
  text: string;
};

const initialValues: ForgotPasswordValues = {
  email: "",
};

export default function ForgotPasswordForm({
  onOtpRequested,
  method,
  onChooseMethod,
}: ForgotPasswordFormProps) {
  const [values, setValues] = useState<ForgotPasswordValues>(initialValues);
  const [errors, setErrors] = useState<
    FieldErrors<keyof ForgotPasswordValues>
  >({});
  const [message, setMessage] = useState<FormMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  function updateEmail(event: ChangeEvent<HTMLInputElement>) {
    const nextValues = { email: event.target.value };

    setValues(nextValues);

    if (hasSubmitted) {
      setErrors(validateForgotPassword(nextValues));
    }

    setMessage(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);

    const nextErrors = validateForgotPassword(values);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await forgotPassword(values);
      onOtpRequested?.(values.email.trim().toLowerCase());
    } catch (error) {
      setMessage({
        type: "error",
        text: getApiErrorMessage(
          error,
          "Password reset request failed. Please try again.",
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <FormField
        id={method}
        label={
          method === "email"
            ? "Email"
            : method === "phone"
              ? "Phone Number"
              : "WhatsApp Number"
        }
        type={method === "email" ? "email" : "tel"}
        value={values.email}
        onChange={updateEmail}
        error={errors.email}
        autoComplete="email"
        placeholder="you@example.com"
        required
        disabled={isSubmitting}
      />

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
        {isSubmitting ? "Verifying..." : "Verify"}
      </button>

      <p className="text-center text-sm text-[#596255]">
        <button
          className="font-semibold text-[#226f68] hover:text-[#185b50]"
          onClick={onChooseMethod}
          type="button"
        >
          Choose a different method
        </button>
      </p>
    </form>
  );
}
