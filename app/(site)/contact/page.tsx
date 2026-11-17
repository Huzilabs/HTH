import { ContactForm } from "@/components/contact/ContactForm";
import { PageIntro } from "@/components/sections/blocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { ButtonAnchor } from "@/components/ui/Button";
import { Container, Placeholder } from "@/components/ui/primitives";
import { contact, getServicesByHub, hubs, site } from "@/lib/content";
import { mailto, whatsappHref } from "@/lib/links";
import { breadcrumbLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ ...contact.seo, path: "/contact" });

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
];

function calendarUrl(): string | null {
  // Any https scheduler embed works: Cal.com, Calendly, TidyCal or GoHighLevel. GHL_CALENDAR_EMBED_URL is still read for older setups.
  const raw = process.env.BOOKING_EMBED_URL || process.env.GHL_CALENDAR_EMBED_URL;
  if (!raw) return null;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

export default function ContactPage() {
  const wa = whatsappHref();
  const cal = calendarUrl();
  const groups = hubs.map((h) => ({ hub: h.shortName, services: getServicesByHub(h.slug).map((s) => s.name) }));

  return (
    <>
      <PageIntro {...contact.hero} crumbs={crumbs}>
        <dl className="mt-10 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          <div className="bg-ground p-5">
            <dt className="label text-subtle">Email</dt>
            <dd className="mt-2">
              <a href={mailto} className="text-h4 font-semibold text-ink underline decoration-accent decoration-2 underline-offset-[6px] hover:text-accent">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="bg-ground p-5">
            <dt className="label text-subtle">{contact.whatsapp.heading}</dt>
            <dd className="mt-2">
              {wa ? (
                <ButtonAnchor href={wa} rel="noopener" arrow>
                  {contact.whatsapp.cta}
                </ButtonAnchor>
              ) : (
                <span className="font-mono text-sm text-subtle">{site.whatsapp.placeholder}</span>
              )}
            </dd>
          </div>
        </dl>
      </PageIntro>

      <section aria-labelledby="form-h" className="border-t border-line py-16 md:py-20">
        <Container className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 id="form-h" className="display text-h2">
              {contact.form.heading}
            </h2>
            <div className="mt-8">
              <ContactForm groups={groups} copy={contact.form} email={site.email} />
            </div>
          </div>

          <div id="book" className="scroll-mt-24 lg:col-span-6">
            <h2 className="display text-h2">{contact.booking.heading}</h2>
            <p className="mt-3 text-muted">{contact.booking.body}</p>
            <div className="mt-8">
              {cal ? (
                <iframe
                  src={cal}
                  title="Book a call with HTH"
                  loading="lazy"
                  className="h-[720px] w-full rounded-md border border-line bg-ink"
                />
              ) : (
                <Placeholder label={contact.booking.fallback} alt="Booking calendar" ratio="aspect-[4/5]" />
              )}
            </div>
            <p className="mt-6 text-sm text-muted">
              Calendar not loading? Email{" "}
              <a href={mailto} className="text-ink underline decoration-accent underline-offset-4">
                {site.email}
              </a>
              {wa && (
                <>
                  {" "}or{" "}
                  <a href={wa} rel="noopener" className="text-ink underline decoration-accent underline-offset-4">
                    message us on WhatsApp
                  </a>
                </>
              )}
              .
            </p>
          </div>
        </Container>
      </section>
      <JsonLd data={breadcrumbLd(crumbs)} />
    </>
  );
}
