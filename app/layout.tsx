import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { getServices, site } from "@/lib/content";
import { organizationLd, professionalServiceLd } from "@/lib/seo";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.legalName, template: `%s | ${site.legalName}` },
  description: site.description,
  applicationName: site.legalName,
  openGraph: { siteName: site.legalName, type: "website", locale: "en" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0f1315",
  colorScheme: "dark light",
};

/** Runs before first paint: saved choice, else the OS preference, else dark. Prevents a theme flash. */
const themeScript = `(function(){try{var t=localStorage.getItem("hth-theme");if(t!=="light"&&t!=="dark"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"}document.documentElement.dataset.theme=t;if(t==="light"){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","#f5f4ef")}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${archivo.variable} ${jetbrains.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 font-semibold text-ground focus:not-sr-only focus:fixed focus:left-4 focus:top-3"
        >
          Skip to content
        </a>
        {children}
        <JsonLd data={[organizationLd(), professionalServiceLd(getServices().map((s) => s.name))]} />
      </body>
    </html>
  );
}
