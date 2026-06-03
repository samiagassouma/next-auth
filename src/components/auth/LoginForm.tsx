"use client";

import Link from "next/link";
import { useState, type ChangeEvent } from "react";
import { getApiErrorMessage, login } from "@/lib/auth-api";
import {
  hasValidationErrors,
  type FieldErrors,
  type LoginValues,
  validateLogin,
} from "@/lib/validation";
import FormField from "./FormField";
import PasswordField from "./PasswordField";

type FormMessage = {
  type: "success" | "error";
  text: string;
};

const initialValues: LoginValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const [values, setValues] = useState<LoginValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<keyof LoginValues>>({});
  const [message, setMessage] = useState<FormMessage | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field: keyof LoginValues) {
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

    const nextErrors = validateLogin(values);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      await login(values);
      setMessage({
        type: "success",
        text: "Login successful.",
      });
      setValues(initialValues);
    } catch (error) {
      setMessage({
        type: "error",
        text: getApiErrorMessage(error, "Login failed. Please try again."),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      <FormField
        id="email"
        label="Email"
        type="email"
        value={values.email}
        onChange={updateField("email")}
        error={errors.email}
        autoComplete="email"
        placeholder="you@example.com"
        required
        disabled={isSubmitting}
      />
      <PasswordField
        id="password"
        label="Password"
        value={values.password}
        onChange={updateField("password")}
        error={errors.password}
        autoComplete="current-password"
        placeholder="Your password"
        required
        disabled={isSubmitting}
      />

      <div className="flex justify-between">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me" className="text-sm font-semibold text-[#226f68] hover:text-[#185b50]">
          Remember me
        </label>
        <Link
          className="text-sm font-semibold text-[#226f68] hover:text-[#185b50]"
          href="/forgot-password"
        >
          Forgot your password?
        </Link>
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
        {isSubmitting ? "Signing in..." : "Login"}
      </button>


      <p className="text-center text-sm text-[#596255]">
       Don&rsquo;t have an account?{" "}
        <Link className="font-semibold text-[#226f68] hover:text-[#185b50]" href="/signup">
          Sign up
        </Link>
      </p>
    </form>
  );
}
