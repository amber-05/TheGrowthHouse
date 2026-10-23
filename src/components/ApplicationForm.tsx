"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
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
  const [step, setStep] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  const hp = useRef<HTMLInputElement>(null);
  const stepRef = useRef<HTMLParagraphElement>(null);

  const steps = config.steps;
  const lastStep = steps ? steps.length - 1 : 0;
  const stepOf = (f: Field) => f.step ?? 0;
  const visible = steps ? config.fields.filter((f) => stepOf(f) === step) : config.fields;

  const goTo = (n: number) => {
    setStep(n);
    requestAnimationFrame(() => stepRef.current?.focus());
  };

  const set = (name: string, v: Values[string]) => {
    setValues((s) => ({ ...s, [name]: v }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: "" }));
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

    // Not on the final step yet: validate this step only, then advance.
    if (steps && step < lastStep) {
      const { errors: errs } = validate(visible, values);
      setErrors(errs);
      if (Object.keys(errs).length) focusFirstError(errs);
      else goTo(step + 1);
      return;
    }

    const { errors: errs } = validate(config.fields, values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      const bad = config.fields.find((f) => errs[f.name]);
      if (steps && bad && stepOf(bad) !== step) {
        setStep(stepOf(bad));
        requestAnimationFrame(() => focusFirstError(errs));
      } else {
        focusFirstError(errs);
      }
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
        const bad = config.fields.find((f) => data.fields[f.name]);
        if (steps && bad) setStep(stepOf(bad));
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3>{config.successTitle}</h3>
        <p>{config.successMessage}</p>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={status === "submitting"}>
      {steps && (
        <div className="stepper">
          <ol aria-label="Progress">
            {steps.map((s, i) => (
              <li key={s} aria-current={i === step ? "step" : undefined} data-done={i < step}>
                <span className="stepper__n">{i + 1}</span>
                <span className="stepper__t">{s}</span>
              </li>
            ))}
          </ol>
          <p ref={stepRef} tabIndex={-1} className="sr-only" aria-live="polite">
            Step {step + 1} of {steps.length}: {steps[step]}
          </p>
        </div>
      )}
      <div className="form-grid">
        {visible.map((f) => (
          <FieldControl
            key={f.name}
            field={f}
            id={`${uid}-${f.name}`}
            value={values[f.name]}
            error={errors[f.name]}
            onChange={(v) => set(f.name, v)}
          />
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
            {steps && step > 0 && (
              <button className="btn btn--ghost" type="button" onClick={() => goTo(step - 1)} disabled={status === "submitting"}>
                Back
              </button>
            )}
            <button className="btn" type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? (
                <>
                  <span className="spinner" aria-hidden="true" /> Sending…
                </>
              ) : steps && step < lastStep ? (
                <>Continue <span aria-hidden="true">→</span></>
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

function FieldControl({
  field: f,
  id,
  value,
  error,
  onChange,
}: {
  field: Field;
  id: string;
  value: Values[string];
  error?: string;
  onChange: (v: Values[string]) => void;
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
          {...aria}
        />
      ) : f.type === "select" ? (
        <select id={id} className="input" value={value as string} onChange={(e) => onChange(e.target.value)} {...aria}>
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
