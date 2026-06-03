import type {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
} from "react";

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  error?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
};

export default function FormField({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
  placeholder,
  autoComplete,
  required,
  disabled,
}: FormFieldProps) {
  const errorId = `${id}-error`;
  const inputClassName = `h-10 w-full rounded-2xl border bg-white px-4 text-sm text-[#1a1230] shadow-[0_4px_9px_rgba(38,23,53,0.16)] outline-none transition placeholder:text-[#d6b9ee] disabled:cursor-not-allowed disabled:bg-[#f9f6fb] disabled:text-[#9b8fa8] ${
    error
      ? "border-[#ff4b4b] focus:border-[#ff4b4b] focus:ring-4 focus:ring-[#ff4b4b]/10"
      : "border-[#e8d8f6] focus:border-[#7a00c8] focus:ring-4 focus:ring-[#7a00c8]/10"
  }`;

  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold text-[#6a00c2]" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
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
      {error ? (
        <p className="px-2 text-[11px] text-[#ff4b4b]" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}
