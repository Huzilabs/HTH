import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import {
  MARK_H_LEFT,
  MARK_H_RIGHT,
  MARK_LETTERS_TRANSFORM,
  MARK_NODES,
  MARK_ORBIT_LOWER,
  MARK_ORBIT_UPPER,
  MARK_T,
  MARK_VIEWBOX,
} from "./mark";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const G = "#0f1315";
const I = "#e6eae3";
const A = "#e3b34a";
const SUBTLE = "#9da19d";
const LINE = "#313536";

const fontDir = join(process.cwd(), "assets/fonts");

/** The HTH Solutions mark (shared geometry), as an inline SVG image for next/og. */
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}"><path d="${MARK_ORBIT_UPPER}" fill="${A}"/><g transform="${MARK_LETTERS_TRANSFORM}" stroke="${G}" stroke-width="14" paint-order="stroke"><path d="${MARK_H_LEFT}" fill="${I}"/><path d="${MARK_H_RIGHT}" fill="${I}"/><path d="${MARK_T}" fill="${A}"/></g><path d="${MARK_ORBIT_LOWER}" fill="${A}" stroke="${G}" stroke-width="10" paint-order="stroke"/>${MARK_NODES.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="25" fill="${A}" stroke="${G}" stroke-width="8" paint-order="stroke"/><circle cx="${x}" cy="${y}" r="12" fill="${G}"/>`).join("")}</svg>`;
const markDataUri = `data:image/svg+xml;base64,${Buffer.from(markSvg).toString("base64")}`;
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={markDataUri} width={108} height={60} alt="" />
            <div style={{ display: "flex", flexDirection: "column", borderLeft: `2px solid ${LINE}`, paddingLeft: 16 }}>
              <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1 }}>HTH</div>
              <div style={{ fontSize: 13, color: SUBTLE, letterSpacing: "0.38em", marginTop: 6 }}>SOLUTIONS</div>
            </div>
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
