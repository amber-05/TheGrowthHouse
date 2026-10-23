/**
 * Form schema types and the single validation routine used by BOTH the browser
 * (instant feedback) and the API route (the authoritative check).
 */

export type FieldType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox-group"
  | "consent";

export type Option = { value: string; label: string };

export type Field = {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  placeholder?: string;
  help?: string;
  options?: Option[];
  minLength?: number;
  maxLength?: number;
  /** Regex source string (serialisable so configs can pass server -> client). */
  pattern?: string;
  patternMessage?: string;
  /** Layout hint only. */
  width?: "half" | "full";
  /** 0-based step index when the form defines `steps`. */
  step?: number;
};

export type FormConfig = {
  /** Public workflow id, also the :form segment of /api/submit/:form. */
  id: "founder" | "investor" | "enquiry";
  fields: Field[];
  /** Optional step titles; fields pick their step via `step`. Omit for a single-page form. */
  steps?: string[];
  submitLabel: string;
  successTitle: string;
  successMessage: string;
};

export type Values = Record<string, string | string[] | boolean>;
export type Errors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9()\-\s.]{7,20}$/;
const DEFAULT_MAX = 200;
const TEXTAREA_MAX = 3000;

export function emptyValues(fields: Field[], preset: Values = {}): Values {
  const v: Values = {};
  for (const f of fields) {
    v[f.name] =
      preset[f.name] ??
      (f.type === "consent" ? false : f.type === "checkbox-group" ? [] : "");
  }
  return v;
}

/** Validates against the config and returns cleaned values (known fields only). */
export function validate(
  fields: Field[],
  input: Record<string, unknown>,
): { errors: Errors; clean: Values } {
  const errors: Errors = {};
  const clean: Values = {};

  for (const f of fields) {
    const raw = input[f.name];
    const required = f.required ?? false;

    if (f.type === "consent") {
      const ok = raw === true;
      clean[f.name] = ok;
      if (required && !ok) errors[f.name] = "Please confirm to continue.";
      continue;
    }

    if (f.type === "checkbox-group") {
      const allowed = new Set((f.options ?? []).map((o) => o.value));
      const arr = Array.isArray(raw)
        ? raw.filter((x): x is string => typeof x === "string" && allowed.has(x))
        : [];
      clean[f.name] = arr;
      if (required && arr.length === 0) errors[f.name] = "Select at least one option.";
      continue;
    }

    const str = typeof raw === "string" ? raw.trim() : "";
    clean[f.name] = str;

    if (!str) {
      if (required) errors[f.name] = "This field is required.";
      continue;
    }

    const max = f.maxLength ?? (f.type === "textarea" ? TEXTAREA_MAX : DEFAULT_MAX);
    if (str.length > max) {
      errors[f.name] = `Please keep this under ${max} characters.`;
    } else if (f.minLength && str.length < f.minLength) {
      errors[f.name] = `Please enter at least ${f.minLength} characters.`;
    } else if (f.type === "email" && !EMAIL_RE.test(str)) {
      errors[f.name] = "Enter a valid email address.";
    } else if (f.type === "tel" && !PHONE_RE.test(str)) {
      errors[f.name] = "Enter a valid phone number.";
    } else if (f.type === "url" && !isHttpUrl(str)) {
      errors[f.name] = "Enter a valid URL starting with http:// or https://";
    } else if (f.type === "number" && !Number.isFinite(Number(str))) {
      errors[f.name] = "Enter a number.";
    } else if (
      (f.type === "select" || f.type === "radio") &&
      !(f.options ?? []).some((o) => o.value === str)
    ) {
      errors[f.name] = "Choose one of the listed options.";
    } else if (f.pattern && !new RegExp(f.pattern).test(str)) {
      errors[f.name] = f.patternMessage ?? "This value is not in the expected format.";
    }
  }

  return { errors, clean };
}

function isHttpUrl(s: string) {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
