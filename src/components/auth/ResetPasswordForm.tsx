"use client";

import Link from "next/link";
import { useState, type ChangeEvent } from "react";
import { getApiErrorMessage, resetPassword } from "@/lib/auth-api";
import {
  hasValidationErrors,
  type FieldErrors,
  type RecoveryMethod,
  type ResetPasswordValues,
  validateResetPassword,
} from "@/lib/validation";
import PasswordField from "./PasswordField";

type ResetPasswordFormProps = {
  token?: string;
  method?: RecoveryMethod;
  email?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  uid?: string;
  otp?: string;
};

type FormMessage = {
  type: "success" | "error";
  text: string;
};

const initialValues: ResetPasswordValues = {
  newPassword: "",
  confirmNewPassword: "",
};

export default function ResetPasswordForm({
  token,
  method,
  email,
  phoneNumber,
  whatsappNumber,
  uid,
  otp,
}: ResetPasswordFormProps) {
  const [values, setValues] = useState<ResetPasswordValues>(initialValues);
  const [errors, setErrors] = useState<
    FieldErrors<keyof ResetPasswordValues>
  >({});
  const [message, setMessage] = useState<FormMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof ResetPasswordValues) {
    return (event: ChangeEvent<HTMLInputElement>) => {
      setValues((current) => ({
        ...current,
        [field]: event.target.value,
      }));
      setErrors((current) => ({
        ...current,
        [field]: undefined,
      }));
      setMessage(null);
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateResetPassword(values);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await resetPassword({
        ...values,
        token,
        method,
        email,
        phoneNumber,
        whatsappNumber,
        uid,
        otp,
      });
      setMessage({
        type: "success",
        text: "Your password has been reset.",
      });
      setValues(initialValues);
    } catch (error) {
      setMessage({
        type: "error",
        text: getApiErrorMessage(
          error,
          "Password reset failed. Please try again.",
        ),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <PasswordField
        id="newPassword"
        label="New password"
        value={values.newPassword}
        onChange={updateField("newPassword")}
        error={errors.newPassword}
        autoComplete="new-password"
        placeholder="At least 8 characters"
        required
        disabled={isSubmitting}
      />
      <PasswordField
        id="confirmNewPassword"
        label="Confirm new password"
        value={values.confirmNewPassword}
        onChange={updateField("confirmNewPassword")}
        error={errors.confirmNewPassword}
        autoComplete="new-password"
        placeholder="Repeat the new password"
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
        {isSubmitting ? "Updating..." : "Update Password"}
      </button>

      <p className="text-center text-sm text-[#596255]">
        Password already updated?{" "}
        <Link className="font-semibold text-[#226f68] hover:text-[#185b50]" href="/login">
          Log in
        </Link>
      </p>
    </form>
  );
}
