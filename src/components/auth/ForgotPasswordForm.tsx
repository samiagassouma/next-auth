"use client";

import { useState, type ChangeEvent } from "react";
import { forgotPassword, getApiErrorMessage } from "@/lib/auth-api";
import {
  hasValidationErrors,
  type FieldErrors,
  type ForgotPasswordValues,
  type RecoveryMethod,
  validateForgotPassword,
} from "@/lib/validation";
import FormField from "./FormField";

type ForgotPasswordFormProps = {
  onOtpRequested?: (payload: {
    method: RecoveryMethod;
    identifier: string;
  }) => void;
  method: RecoveryMethod;
  onChooseMethod?: () => void;
};

type FormMessage = {
  type: "success" | "error";
  text: string;
};

const initialValues: ForgotPasswordValues = {
  identifier: "",
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

  function updateIdentifier(event: ChangeEvent<HTMLInputElement>) {
    const nextValues = { identifier: event.target.value };

    setValues(nextValues);

    if (hasSubmitted) {
      setErrors(validateForgotPassword(nextValues, method));
    }

    setMessage(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);

    const nextErrors = validateForgotPassword(values, method);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const identifier = values.identifier.trim();

      await forgotPassword({
        method,
        identifier,
      });
      onOtpRequested?.({
        method,
        identifier: method === "email" ? identifier.toLowerCase() : identifier,
      });
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
        id="identifier"
        label={
          method === "email"
            ? "Email"
            : method === "phone"
              ? "Phone Number"
              : "WhatsApp Number"
        }
        type={method === "email" ? "email" : "tel"}
        value={values.identifier}
        onChange={updateIdentifier}
        error={errors.identifier}
        autoComplete={method === "email" ? "email" : "tel"}
        placeholder={
          method === "email"
            ? "Email address"
            : method === "phone"
              ? "+216 xx xxx xxx"
              : "+216 xx xxx xxx"
        }
        required
        disabled={isSubmitting}
      />

      {message ? (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${message.type === "success"
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
