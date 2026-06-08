"use client";

import { useState, type ChangeEventHandler, type FocusEventHandler } from "react";

type PasswordFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  showToggle?: boolean;
};

export default function PasswordField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autoComplete,
  required,
  disabled,
  showToggle = true,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false);
  const errorId = `${id}-error`;
  const inputClassName = `h-10 w-full rounded-2xl border bg-white px-4 text-sm text-[#1a1230] shadow-[0_4px_9px_rgba(38,23,53,0.16)] outline-none transition placeholder:text-[#d6b9ee] disabled:cursor-not-allowed disabled:bg-[#f9f6fb] disabled:text-[#9b8fa8] ${
    showToggle ? "pr-20" : ""
  } ${
    error
      ? "border-[#ff4b4b] focus:border-[#ff4b4b] focus:ring-4 focus:ring-[#ff4b4b]/10"
      : "border-[#e8d8f6] focus:border-[#7a00c8] focus:ring-4 focus:ring-[#7a00c8]/10"
  }`;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-bold text-[#6a00c2]" htmlFor={id}>
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={isVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={inputClassName}
        />
        {showToggle ? (
          <button
            type="button"
            onClick={() => setIsVisible((current) => !current)}
            disabled={disabled}
            aria-label={isVisible ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 h-7 -translate-y-1/2 rounded-lg px-3 text-xs font-semibold text-[#7a00c8] transition hover:bg-[#f1e4fb] focus:outline-none focus:ring-4 focus:ring-[#7a00c8]/10 disabled:cursor-not-allowed disabled:text-[#9b8fa8]"
          >
            {isVisible ? "Hide" : "Show"}
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="px-2 text-[11px] text-[#ff4b4b]" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
