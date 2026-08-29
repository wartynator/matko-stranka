"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  CheckCircleIcon,
  CircleNotchIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react/dist/ssr";
import { company, serviceTypes } from "@/lib/content";

type Fields = {
  company: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  details: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const EMPTY: Fields = {
  company: "",
  name: "",
  email: "",
  phone: "",
  service: "",
  details: "",
};

function validate(v: Fields): Errors {
  const e: Errors = {};
  if (!v.company.trim()) e.company = "Enter the company or site operator name.";
  if (!v.name.trim()) e.name = "Enter the name of the person we should speak to.";
  if (!v.email.trim()) e.email = "Enter a work email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v.email.trim()))
    e.email = "That email address does not look complete.";
  if (!v.phone.trim()) e.phone = "Enter a direct number for urgent work.";
  else if (v.phone.replace(/\D/g, "").length < 9)
    e.phone = "That number looks too short to dial.";
  if (!v.service) e.service = "Choose the closest service type.";
  if (v.details.trim().length < 20)
    e.details = "Give us at least a sentence on the site and the scope.";
  return e;
}

const fieldBase =
  "w-full rounded-[var(--radius-input)] border border-line bg-surface-2 px-3.5 py-3 text-[0.95rem] text-ink " +
  "transition-colors duration-200 outline-none placeholder:text-ink-3 " +
  "hover:border-line-strong focus:border-accent focus:ring-2 focus:ring-accent/35 " +
  "aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/30";

export function ConsultationForm({ compact = false }: Readonly<{ compact?: boolean }>) {
  const uid = useId();
  const reduce = useReducedMotion();
  const [values, setValues] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "failed">("idle");

  const set = (k: keyof Fields) => (v: string) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(ev: React.SyntheticEvent) {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = document.getElementById(`${uid}-${Object.keys(found)[0]}`);
      first?.focus();
      return;
    }
    setState("sending");
    try {
      // Wire this to the real enquiry endpoint or CRM webhook before launch.
      await new Promise((r) => setTimeout(r, 1100));
      setState("sent");
      setValues(EMPTY);
    } catch {
      setState("failed");
    }
  }

  if (state === "sent") {
    return (
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-4 rounded-[var(--radius-card)] border border-line bg-surface-2 p-8"
        role="status"
      >
        <CheckCircleIcon size={34} weight="light" className="text-accent-text" />
        <div>
          <p className="text-xl font-semibold tracking-[-0.01em] text-ink">
            Enquiry received.
          </p>
          <p className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink-2">
            A senior engineer will call you within one working day. If the site is
            already down, phone the duty line instead and we will mobilise now.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="text-[0.9rem] font-medium text-accent-text underline underline-offset-4 hover:no-underline"
        >
          Send another enquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <Field
          id={`${uid}-company`}
          label="Company name"
          value={values.company}
          onChange={set("company")}
          error={errors.company}
          autoComplete="organization"
        />
        <Field
          id={`${uid}-name`}
          label="Contact name"
          value={values.name}
          onChange={set("name")}
          error={errors.name}
          autoComplete="name"
        />
        <Field
          id={`${uid}-email`}
          label="Work email"
          type="email"
          value={values.email}
          onChange={set("email")}
          error={errors.email}
          autoComplete="email"
        />
        <Field
          id={`${uid}-phone`}
          label="Direct phone"
          type="tel"
          value={values.phone}
          onChange={set("phone")}
          error={errors.phone}
          hint="Used only if the enquiry is urgent."
          autoComplete="tel"
        />

        <div className={compact ? "" : "sm:col-span-2"}>
          <Label htmlFor={`${uid}-service`}>Service type</Label>
          <select
            id={`${uid}-service`}
            name="service"
            value={values.service}
            onChange={(e) => set("service")(e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? `${uid}-service-err` : undefined}
            className={`${fieldBase} appearance-none bg-[length:0] pr-10`}
          >
            <option value="">Select a service</option>
            {serviceTypes.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <FieldError id={`${uid}-service-err`} message={errors.service} />
        </div>

        <div className={compact ? "" : "sm:col-span-2"}>
          <Label htmlFor={`${uid}-details`}>Project details</Label>
          <textarea
            id={`${uid}-details`}
            name="details"
            rows={5}
            value={values.details}
            onChange={(e) => set("details")(e.target.value)}
            aria-invalid={Boolean(errors.details)}
            aria-describedby={
              errors.details ? `${uid}-details-err` : `${uid}-details-hint`
            }
            className={`${fieldBase} resize-y`}
          />
          {errors.details ? (
            <FieldError id={`${uid}-details-err`} message={errors.details} />
          ) : (
            <p id={`${uid}-details-hint`} className="mt-2 text-[0.8rem] text-ink-3">
              Site location, existing supply, access windows and any deadline.
            </p>
          )}
        </div>
      </div>

      {state === "failed" && (
        <p
          role="alert"
          className="mt-5 flex items-start gap-2 text-[0.9rem] text-danger"
        >
          <WarningCircleIcon size={18} weight="light" className="mt-0.5 shrink-0" />
          We could not send that. Please try again, or call the duty line directly.
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2.5 rounded-[var(--radius-control)] bg-accent px-6 py-3.5 text-[0.95rem] font-semibold whitespace-nowrap text-on-accent transition-[background-color,scale] duration-160 ease-out hover:bg-accent-hover active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {state === "sending" && (
            <CircleNotchIcon size={17} weight="light" className="animate-spin" />
          )}
          {state === "sending" ? "Sending" : "Request Consultation"}
        </button>
        <p className="text-[0.8rem] text-ink-3">
          Replies within one working day. Urgent faults, call{" "}
          <a
            href={company.phoneHref}
            className="text-accent-text underline underline-offset-4 hover:no-underline"
          >
            {company.phone}
          </a>
          {"."}
        </p>
      </div>
    </form>
  );
}

function Label({
  htmlFor,
  children,
}: Readonly<{ htmlFor: string; children: React.ReactNode }>) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-[0.82rem] font-medium tracking-[0.01em] text-ink-2"
    >
      {children}
    </label>
  );
}

function FieldError({ id, message }: Readonly<{ id: string; message?: string }>) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[0.8rem] text-danger">
      {message}
    </p>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  hint,
  type = "text",
  autoComplete,
}: Readonly<{
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  type?: string;
  autoComplete?: string;
}>) {
  let describedBy: string | undefined;
  if (error) describedBy = `${id}-err`;
  else if (hint) describedBy = `${id}-hint`;

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={fieldBase}
      />
      <FieldError id={`${id}-err`} message={error} />
      {!error && hint && (
        <p id={`${id}-hint`} className="mt-2 text-[0.8rem] text-ink-3">
          {hint}
        </p>
      )}
    </div>
  );
}
