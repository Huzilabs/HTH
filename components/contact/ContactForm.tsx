"use client";

import { useRef, useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui/Button";
import { validateContact, type ContactErrors, type ContactPayload } from "@/lib/contact-schema";

type Group = { hub: string; services: string[] };
type Copy = {
  budgets: string[];
  success: { heading: string; body: string };
  error: { heading: string; body: string };
};

const field =
  "mt-2 block w-full rounded-sm border border-line-strong bg-ground px-3 py-2.5 text-ink placeholder:text-subtle focus:border-accent focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent aria-[invalid=true]:border-accent";
const labelCls = "block text-sm font-semibold text-ink";

function ErrorText({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-sm text-accent">
      <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-accent" />
      {msg}
    </p>
  );
}

export function ContactForm({ groups, copy, email }: { groups: Group[]; copy: Copy; email: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<ContactErrors>({});
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: ContactPayload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      whatsapp: String(fd.get("whatsapp") ?? ""),
      company: String(fd.get("company") ?? ""),
      services: fd.getAll("services").map(String),
      budget: String(fd.get("budget") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
    };
    const v = validateContact(data);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      const first = Object.keys(v)[0];
      const el = formRef.current?.querySelector<HTMLElement>(
        first === "services" ? "input[name=services]" : `[name=${first}]`,
      );
      el?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: ContactErrors };
      if (res.ok && json.ok) {
        setStatus("success");
        formRef.current?.reset();
      } else {
        if (json.errors) setErrors(json.errors);
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  if (status === "success") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-md border border-accent p-6 md:p-8">
        <span aria-hidden="true" className="block h-6 w-6 rounded-full border-4 border-accent bg-accent" />
        <h3 className="display mt-6 text-h3">{copy.success.heading}</h3>
        <p className="mt-3 text-muted">{copy.success.body}</p>
        <button type="button" onClick={() => setStatus("idle")} className="label mt-6 inline-flex min-h-11 items-center text-accent underline underline-offset-[6px]">
          Send another message
        </button>
      </div>
    );
  }

  const describedBy = (k: keyof ContactPayload) => (errors[k] ? `${k}-error` : undefined);

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="relative space-y-6">
      {status === "error" && (
        <div ref={statusRef} tabIndex={-1} role="alert" className="rounded-md border border-accent p-5">
          <p className="font-semibold text-ink">{copy.error.heading}</p>
          <p className="mt-1 text-sm text-muted">
            {copy.error.body}{" "}
            <a href={`mailto:${email}`} className="text-accent underline underline-offset-4">
              {email}
            </a>
            .
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Name <span className="text-subtle">(required)</span>
          </label>
          <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={describedBy("name")} className={field} />
          <ErrorText id="name-error" msg={errors.name} />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email <span className="text-subtle">(required)</span>
          </label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={describedBy("email")} className={field} />
          <ErrorText id="email-error" msg={errors.email} />
        </div>
        <div>
          <label htmlFor="whatsapp" className={labelCls}>
            WhatsApp number
          </label>
          <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="+92 300 1234567" aria-invalid={!!errors.whatsapp} aria-describedby={describedBy("whatsapp")} className={field} />
          <ErrorText id="whatsapp-error" msg={errors.whatsapp} />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>
            Company
          </label>
          <input id="company" name="company" autoComplete="organization" className={field} />
        </div>
      </div>

      <fieldset aria-describedby={describedBy("services")}>
        <legend className={labelCls}>
          Services needed <span className="text-subtle">(pick any)</span>
        </legend>
        <div className="mt-3 grid gap-6 sm:grid-cols-2">
          {groups.map((g) => (
            <div key={g.hub}>
              <p className="label text-subtle">{g.hub}</p>
              <ul className="mt-2 space-y-1">
                {g.services.map((s) => {
                  const id = `svc-${s.replace(/\W+/g, "-").toLowerCase()}`;
                  return (
                    <li key={s}>
                      <label htmlFor={id} className="flex min-h-10 cursor-pointer items-center gap-3 text-sm text-muted hover:text-ink">
                        <input id={id} type="checkbox" name="services" value={s} className="h-5 w-5 shrink-0 accent-accent" />
                        {s}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
        <ErrorText id="services-error" msg={errors.services} />
      </fieldset>

      <div>
        <label htmlFor="budget" className={labelCls}>
          Budget range <span className="text-subtle">(required)</span>
        </label>
        <select id="budget" name="budget" defaultValue="" required aria-invalid={!!errors.budget} aria-describedby={describedBy("budget")} className={field}>
          <option value="" disabled>
            Select a range
          </option>
          {copy.budgets.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <ErrorText id="budget-error" msg={errors.budget} />
      </div>

      <div>
        <label htmlFor="message" className={labelCls}>
          Message <span className="text-subtle">(required)</span>
        </label>
        <textarea id="message" name="message" rows={5} required placeholder="What do you have today, and what do you want it to do?" aria-invalid={!!errors.message} aria-describedby={describedBy("message")} className={field} />
        <ErrorText id="message-error" msg={errors.message} />
      </div>

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-accent px-6 font-semibold text-ground transition-colors hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Send brief"}
        {status !== "sending" && <Arrow />}
      </button>
    </form>
  );
}
