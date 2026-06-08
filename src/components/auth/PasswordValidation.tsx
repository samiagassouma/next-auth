type PasswordValidationProps = {
  password: string;
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

function RuleIcon({ isMet }: { isMet: boolean }) {
  return (
    <span
      className={`relative inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-full ${isMet ? "bg-[#6dcc35]" : "bg-[#8d96a3]"
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

export default function PasswordValidation({
  password,
}: PasswordValidationProps) {
  if (!password) return null;

  const activePasswordBars = passwordRules.filter((rule) =>
    rule.test(password)
  ).length;

  const passwordStrengthColor =
    activePasswordBars <= 1
      ? "bg-red-500"
      : activePasswordBars <= 3
        ? "bg-yellow-500"
        : "bg-green-500";

  return (
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
          Craft your password. It must contain:
        </p>

        {passwordRules.map((rule) => {
          const isMet = rule.test(password);

          return (
            <div className="flex items-center gap-2" key={rule.label}>
              <RuleIcon isMet={isMet} />
              <span>{rule.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}