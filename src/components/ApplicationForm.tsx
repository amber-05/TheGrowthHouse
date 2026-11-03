"use client";

import Link from "next/link";
import Icon from "./Icon";
import { Fragment, useId, useRef, useState } from "react";
import { emptyValues, validate, type Errors, type Field, type FormConfig, type Values } from "@/lib/forms";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Renders any FormConfig. Validation uses the same routine as the server.
 * Success is only shown after the API confirms the submission was stored.
 */
export default function ApplicationForm({
  config,
  preset,
}: {
  config: FormConfig;
  preset?: Values;
}) {
  const uid = useId();
  const [values, setValues] = useState<Values>(() => emptyValues(config.fields, preset));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const hp = useRef<HTMLInputElement>(null);

  const set = (name: string, v: Values[string]) => {
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
  };

  const checkField = (f: Field) => {
    if (!values[f.name]) return; // empty fields are flagged when the step is submitted
    const { errors: errs } = validate([f], values);
    setErrors((e) => ({ ...e, [f.name]: errs[f.name] ?? "" }));
  };

  const focusFirstError = (errs: Errors) => {
    const first = config.fields.find((f) => errs[f.name]);
    if (!first) return;
    requestAnimationFrame(() => {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-name="${first.name}"] :is(input,select,textarea)`);
      el?.focus();
    });
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "submitting") return;
    setFormError("");

    const { errors: errs } = validate(config.fields, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(`/api/submit/${config.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, _hp: hp.current?.value ?? "" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("success");
        return;
      }
      if (res.status === 422 && data.fields) {
        setErrors(data.fields);
        requestAnimationFrame(() => focusFirstError(data.fields));
      }
      setFormError(data.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setFormError("We could not reach the server. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="success" role="status" tabIndex={-1} ref={(el) => el?.focus()}>
        <div className="success__mark" aria-hidden="true">
          <Icon name="check" size={28} />
        </div>
        <h3>{config.successTitle}</h3>
        <p>{config.successMessage}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={status === "submitting"}>
      <div className="form-grid">
        {config.fields.map((f, i) => (
          <Fragment key={f.name}>
            {f.group && f.group !== config.fields[i - 1]?.group && (
              <h3 className="form-section">
                <span className="form-section__n" aria-hidden="true">{sectionNumber(config, i)}</span>
                {f.group}
              </h3>
            )}
            <FieldControl
              field={f}
              id={`${uid}-${f.name}`}
              value={values[f.name]}
              error={errors[f.name]}
              onChange={(v) => set(f.name, v)}
              onBlur={() => checkField(f)}
            />
          </Fragment>
        ))}

        <div className="hp" aria-hidden="true">
          <label>
            Leave this field empty
            <input ref={hp} type="text" name="_hp" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <div className="form-actions">
          {formError && (
            <div className="alert" role="alert">{formError}</div>
          )}
          <div className="btn-row">
            <button className="btn" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Sending…
                </>
              ) : (
                config.submitLabel
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

/** 1-based position of the section that starts at field index `i`. */
function sectionNumber(config: FormConfig, i: number) {
  const seen = new Set<string>();
  for (const f of config.fields.slice(0, i + 1)) if (f.group) seen.add(f.group);
  return seen.size;
}

function FieldControl({
  field: f,
  id,
  value,
  error,
  onChange,
  onBlur,
}: {
  field: Field;
  id: string;
  value: Values[string];
  error?: string;
  onChange: (v: Values[string]) => void;
  onBlur?: () => void;
}) {
  const helpId = f.help ? `${id}-help` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [helpId, errId].filter(Boolean).join(" ") || undefined;
  const cls = `field${f.width === "half" ? " field--half" : ""}`;
  const aria = { "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, "aria-required": f.required || undefined };
  const label = (
    <>
      {f.label}
      {f.required && <span className="req" aria-hidden="true"> *</span>}
    </>
  );
  const meta = (
    <>
      {f.help && <span id={helpId} className="help">{f.help}</span>}
      {error && <span id={errId} className="error">{error}</span>}
    </>
  );

  if (f.type === "consent") {
    return (
      <div className={cls} data-name={f.name} data-invalid={!!error}>
        <label className="choice">
          <input type="checkbox" checked={value === true} onChange={(e) => onChange(e.target.checked)} {...aria} />
          <span>
            {label} See our{" "}
            <Link href="/privacy" target="_blank" className="consent-link">Privacy Policy</Link>.
          </span>
        </label>
        {meta}
      </div>
    );
  }

  if (f.type === "radio" || f.type === "checkbox-group") {
    const multi = f.type === "checkbox-group";
    const selected = multi ? (value as string[]) : (value as string);
    return (
      <fieldset className={cls} data-name={f.name} data-invalid={!!error} aria-describedby={describedBy}>
        <legend>{label}</legend>
        <div className="choices">
          {(f.options ?? []).map((o) => (
            <label className="choice" key={o.value}>
              <input
                type={multi ? "checkbox" : "radio"}
                name={`${id}-${f.name}`}
                value={o.value}
                checked={multi ? (selected as string[]).includes(o.value) : selected === o.value}
                onChange={(e) =>
                  multi
                    ? onChange(
                        e.target.checked
                          ? [...(selected as string[]), o.value]
                          : (selected as string[]).filter((x) => x !== o.value),
                      )
                    : onChange(o.value)
                }
              />
              <span>{o.label}</span>
            </label>
          ))}
        </div>
        {meta}
      </fieldset>
    );
  }

  return (
    <div className={cls} data-name={f.name} data-invalid={!!error}>
      <label htmlFor={id}>{label}</label>
      {f.type === "textarea" ? (
        <textarea
          id={id}
          className="input"
          value={value as string}
          placeholder={f.placeholder}
          maxLength={f.maxLength ?? 3000}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          {...aria}
        />
      ) : f.type === "select" ? (
        <select id={id} className="input" value={value as string} onChange={(e) => onChange(e.target.value)} onBlur={onBlur} {...aria}>
          <option value="">Select…</option>
          {(f.options ?? []).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className="input"
          type={f.type}
          value={value as string}
          placeholder={f.placeholder}
          maxLength={f.maxLength ?? 200}
          autoComplete={AUTOCOMPLETE[f.name]}
          inputMode={f.type === "tel" ? "tel" : f.type === "number" ? "decimal" : undefined}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          {...aria}
        />
      )}
      {meta}
    </div>
  );
}

const AUTOCOMPLETE: Record<string, string> = {
  fullName: "name",
  name: "name",
  email: "email",
  phone: "tel",
  company: "organization",
};
