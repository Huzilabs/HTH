import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const G = "#0f1315";
const I = "#e6eae3";
const A = "#e3b34a";
const SUBTLE = "#9da19d";
const LINE = "#313536";

const fontDir = join(process.cwd(), "assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "archivo-latin-400-normal.woff")),
  readFile(join(fontDir, "archivo-latin-700-normal.woff")),
  readFile(join(fontDir, "jetbrains-mono-latin-400-normal.woff")),
]);

/** Brand-style Open Graph image: graphite ground, chalk headline, amber route. */
export async function renderOg({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [regular, bold, mono] = await fonts;
  const size = title.length > 60 ? 60 : title.length > 36 ? 72 : 84;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: G,
          color: I,
          padding: "64px 72px",
          fontFamily: "Archivo",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="56" height="56" viewBox="0 0 48 48">
              <path d="M6 12V36M15 12V36M6 24H19.5M33 12V36M42 12V36M28.5 24H42" stroke={I} strokeWidth="4" strokeLinecap="round" fill="none" />
              <circle cx="24" cy="24" r="4" fill="none" stroke={A} strokeWidth="3" />
            </svg>
            <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-0.02em" }}>Hub to Hub</div>
          </div>
          <div style={{ fontFamily: "JetBrains Mono", fontSize: 20, color: SUBTLE, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.02, letterSpacing: "-0.035em", maxWidth: 1000 }}>
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {["Website", "CRM", "AI agent", "Follow-up", "Sale"].map((s, i, arr) => (
            <div key={s} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    border: `4px solid ${A}`,
                    background: i === arr.length - 1 ? A : G,
                  }}
                />
                <div style={{ fontFamily: "JetBrains Mono", fontSize: 18, color: SUBTLE }}>{s}</div>
              </div>
              {i < arr.length - 1 && <div style={{ width: 150, height: 4, background: A, marginTop: -30 }} />}
            </div>
          ))}
          <div style={{ flex: 1, height: 1, background: LINE, marginLeft: 24, marginTop: -30 }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo", data: regular, weight: 400, style: "normal" },
        { name: "Archivo", data: bold, weight: 700, style: "normal" },
        { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}
