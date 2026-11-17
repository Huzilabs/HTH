import { NextResponse } from "next/server";
import { site } from "@/lib/content";
import { validateContact, type ContactPayload } from "@/lib/contact-schema";

/**
 * Receives the contact form and emails it to the HTH inbox using Resend (free plan: 3,000 emails/month).
 * Env: RESEND_API_KEY (required in production), CONTACT_TO_EMAIL (defaults to the site email),
 * CONTACT_FROM_EMAIL (defaults to Resend's shared sender, which can only deliver to the Resend account's own email).
 * The API key stays server-side and is never exposed to the browser.
 */

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Partial<ContactPayload>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill hidden fields. Pretend success so they don't retry.
  if (body.website) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const name = body.name!.trim();
  const email = body.email!.trim();
  const fields: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["WhatsApp", (body.whatsapp ?? "").trim() || "Not given"],
    ["Company", (body.company ?? "").trim() || "Not given"],
    ["Services", body.services!.join(", ")],
    ["Budget", body.budget!],
    ["Page", req.headers.get("referer") ?? ""],
  ];
  const message = body.message!.trim();
  const text = `${fields.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${message}`;
  const html = `<h2 style="margin:0 0 16px">New project brief</h2>
<table cellpadding="6" style="border-collapse:collapse">${fields
    .map(([k, v]) => `<tr><td style="color:#666">${k}</td><td><strong>${esc(v)}</strong></td></tr>`)
    .join("")}</table>
<p style="color:#666;margin:20px 0 6px">Message</p>
<p style="white-space:pre-wrap;margin:0">${esc(message)}</p>`;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] RESEND_API_KEY is not set. Brief not emailed:\n" + text);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] RESEND_API_KEY is not set.");
    return NextResponse.json({ ok: false, error: "Form is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "HTH Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL || site.email],
        reply_to: email,
        subject: `New brief from ${name}: ${body.services!.slice(0, 3).join(", ")}`,
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to send email:", err);
    return NextResponse.json({ ok: false, error: "Could not send." }, { status: 502 });
  }
}
