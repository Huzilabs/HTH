import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact-schema";

/**
 * Receives the contact form and forwards it to a GoHighLevel inbound webhook (GHL_WEBHOOK_URL).
 * The webhook URL stays server-side and is never exposed to the browser.
 */
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

  const [firstName, ...rest] = body.name!.trim().split(/\s+/);
  const payload = {
    first_name: firstName,
    last_name: rest.join(" "),
    full_name: body.name!.trim(),
    email: body.email!.trim(),
    phone: (body.whatsapp ?? "").trim(),
    whatsapp: (body.whatsapp ?? "").trim(),
    company_name: (body.company ?? "").trim(),
    services: body.services!,
    services_text: body.services!.join(", "),
    budget: body.budget,
    message: body.message!.trim(),
    source: "Website contact form",
    page: req.headers.get("referer") ?? "",
    submitted_at: new Date().toISOString(),
  };

  const url = process.env.GHL_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[contact] GHL_WEBHOOK_URL is not set. Payload not sent:", payload);
      return NextResponse.json({ ok: true, dev: true });
    }
    console.error("[contact] GHL_WEBHOOK_URL is not set.");
    return NextResponse.json({ ok: false, error: "Form is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Failed to forward to GHL:", err);
    return NextResponse.json({ ok: false, error: "Could not send." }, { status: 502 });
  }
}
