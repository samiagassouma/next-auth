export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export type SignupValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type ForgotPasswordValues = {
  identifier: string;
};

export type ResetPasswordValues = {
  newPassword: string;
  confirmNewPassword: string;
};

export type RecoveryMethod = "email" | "phone" | "whatsapp";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function hasValidationErrors<T extends string>(
  errors: FieldErrors<T>,
) {
  return Object.values(errors).some(Boolean);
}

function validateEmail(email: string) {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "This is a required field";
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    return "Enter a valid email address.";
  }

  return undefined;
}

function validatePhoneNumber(value: string, label: string) {
  const trimmedValue = value.trim();
  const digitCount = trimmedValue.replace(/\D/g, "").length;

  if (!trimmedValue) {
    return "This is a required field";
  }

  if (!/^\+?[\d\s().-]+$/.test(trimmedValue) || digitCount != 8 ) {
    return `Enter a valid ${label}.`;
  }

  return undefined;
}

function validatePassword(password: string, label = "Password") {
  if (!password) {
    return "This is a required field";
  }

  if (password.length < 8) {
    return `${label} must be at least 8 characters.`;
  }

  if (!/\d/.test(password)) {
    return `${label} must include at least one number.`;
  }

  if (!/[A-Z]/.test(password)) {
    return `${label} must include at least one uppercase letter.`;
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return `${label} must include at least one symbol.`;
  }

  return undefined;
}

export function validateSignup(values: SignupValues) {
  const errors: FieldErrors<keyof SignupValues> = {};
  const fullName = values.fullName.trim();

  if (!fullName) {
    errors.fullName = "This is a required field";
  } else if (fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters.";
  }

  errors.email = validateEmail(values.email);
  errors.password = validatePassword(values.password);

  if (!values.confirmPassword) {
    errors.confirmPassword = "This is a required field";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.termsAccepted) {
    errors.termsAccepted = "You must accept the terms and privacy policy.";
  }

  return errors;
}

export function validateLogin(values: LoginValues) {
  const errors: FieldErrors<keyof LoginValues> = {};

  errors.email = validateEmail(values.email);

  if (!values.password) {
    errors.password = "This is a required field";
  }

  return errors;
}

export function validateForgotPassword(
  values: ForgotPasswordValues,
  method: RecoveryMethod = "email",
) {
  const errors: FieldErrors<keyof ForgotPasswordValues> = {};

  if (method === "email") {
    errors.identifier = validateEmail(values.identifier);
  } else {
    errors.identifier = validatePhoneNumber(
      values.identifier,
      method === "phone" ? "phone number" : "WhatsApp number",
    );
  }

  return errors;
}

export function validateResetPassword(values: ResetPasswordValues) {
  const errors: FieldErrors<keyof ResetPasswordValues> = {};

  errors.newPassword = validatePassword(values.newPassword, "New password");

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "This is a required field";
  } else if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "New passwords do not match.";
  }

  return errors;
}
