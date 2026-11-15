import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#0f1315" }}>
        <svg width="132" height="132" viewBox="0 0 48 48">
          <path d="M6 12V36M15 12V36M6 24H19.5M33 12V36M42 12V36M28.5 24H42" stroke="#e6eae3" strokeWidth="4" strokeLinecap="round" fill="none" />
          <circle cx="24" cy="24" r="4" fill="none" stroke="#e3b34a" strokeWidth="3" />
        </svg>
      </div>
    ),
    size,
  );
}
