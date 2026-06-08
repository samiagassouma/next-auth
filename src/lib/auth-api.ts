const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "");

export type ApiResult = Record<string, unknown> | unknown[] | string | null;

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RecoveryMethod = "email" | "phone" | "whatsapp";

export type RecoveryPayload = {
  method: RecoveryMethod;
  identifier: string;
};

export type ResetPasswordPayload = {
  newPassword: string;
  confirmNewPassword: string;
  method?: RecoveryMethod;
  token?: string;
  email?: string;
  phoneNumber?: string;
  whatsappNumber?: string;
  uid?: string;
  otp?: string;
};

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

function buildUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL ?? ""}${normalizedPath}`;
}

export function getSocialAuthUrl(path: string) {
  return buildUrl(path);
}

async function readResponse(response: Response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function messageFromUnknown(value: unknown): string {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(messageFromUnknown).filter(Boolean).join(" ");
  }

  return "";
}

function extractErrorMessage(data: unknown) {
  if (typeof data === "string") {
    return data;
  }

  if (data && typeof data === "object" && !Array.isArray(data)) {
    const record = data as Record<string, unknown>;
    const directMessage =
      messageFromUnknown(record.message) ||
      messageFromUnknown(record.detail) ||
      messageFromUnknown(record.error) ||
      messageFromUnknown(record.non_field_errors);

    if (directMessage) {
      return directMessage;
    }

    for (const [field, value] of Object.entries(record)) {
      const fieldMessage = messageFromUnknown(value);

      if (fieldMessage) {
        return `${field}: ${fieldMessage}`;
      }
    }
  }

  return "Something went wrong. Please try again.";
}

async function request<T extends ApiResult>(
  path: string,
  options: RequestInit = {},
) {
  const headers = new Headers(options.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(buildUrl(path), {
    ...options,
    headers,
    credentials: "include",
  });
  const data = await readResponse(response);

  if (!response.ok) {
    throw new ApiError(extractErrorMessage(data), response.status, data);
  }

  return data as T;
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ApiError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}

export function signup(payload: SignupPayload) {
  return request("/api/auth/signup/", {
    method: "POST",
    body: JSON.stringify({
      full_name: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
      password2: payload.confirmPassword,
    }),
  });
}

export function login(payload: LoginPayload) {
  return request("/api/auth/login/", {
    method: "POST",
    body: JSON.stringify({
      email: payload.email.trim().toLowerCase(),
      password: payload.password,
    }),
  });
}

function buildRecoveryPayload(payload: RecoveryPayload) {
  const identifier = payload.identifier.trim();

  if (payload.method === "email") {
    return {
      email: identifier.toLowerCase(),
      method: payload.method,
    };
  }

  if (payload.method === "phone") {
    return {
      phone_number: identifier,
      method: payload.method,
    };
  }

  return {
    whatsapp_number: identifier,
    method: payload.method,
  };
}

export function forgotPassword(payload: RecoveryPayload) {
  return request("/api/auth/forgot-password/", {
    method: "POST",
    body: JSON.stringify(buildRecoveryPayload(payload)),
  });
}

export function resendOtp(payload: RecoveryPayload) {
  return request("/api/auth/resend-otp/", {
    method: "POST",
    body: JSON.stringify(buildRecoveryPayload(payload)),
  });
}

export function resetPassword(payload: ResetPasswordPayload) {
  const body: Record<string, string> = {
    new_password: payload.newPassword,
    new_password2: payload.confirmNewPassword,
  };

  if (payload.token) {
    body.token = payload.token;
  }

  if (payload.email) {
    body.email = payload.email.trim().toLowerCase();
  }

  if (payload.phoneNumber) {
    body.phone_number = payload.phoneNumber.trim();
  }

  if (payload.whatsappNumber) {
    body.whatsapp_number = payload.whatsappNumber.trim();
  }

  if (payload.method) {
    body.method = payload.method;
  }

  if (payload.uid) {
    body.uid = payload.uid;
  }

  if (payload.otp) {
    body.otp = payload.otp;
  }

  return request("/api/auth/reset-password/", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export function verifyEmail(token: string) {
  return request(`/api/auth/verify-email/${encodeURIComponent(token)}/`, {
    method: "GET",
  });
}


export function verifyOtp( payload: {
  otp: string,
  email: string
}) {
  const { otp, email } = payload;
  console.log("Verifying OTP with backend...", otp, email);

  return request("/api/auth/forgot-password/", {
    method: "POST",
    body: JSON.stringify({
      otp: otp.trim(),
      email: email.trim().toLowerCase(),
    }),
    })
}
