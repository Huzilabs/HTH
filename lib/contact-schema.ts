/** Shared validation for the contact form (used by the client form and the API route). */
export type ContactPayload = {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  services: string[];
  budget: string;
  message: string;
  website?: string; // honeypot: must stay empty
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const e: ContactErrors = {};
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const whatsapp = (input.whatsapp ?? "").trim();
  const message = (input.message ?? "").trim();

  if (name.length < 2) e.name = "Please enter your name.";
  if (!EMAIL.test(email)) e.email = "Please enter a valid email address.";
  if (whatsapp && !/^\+?[\d\s()-]{7,20}$/.test(whatsapp))
    e.whatsapp = "Use digits with your country code, e.g. +92 300 1234567.";
  if (!input.services || input.services.length === 0) e.services = "Pick at least one service.";
  if (!input.budget) e.budget = "Pick a budget range.";
  if (message.length < 10) e.message = "Tell us a little about the project (10 characters or more).";
  if (message.length > 4000) e.message = "Please keep the message under 4,000 characters.";
  return e;
}
