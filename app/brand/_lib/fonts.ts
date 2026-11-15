import {
  Archivo,
  Geist,
  Instrument_Serif,
  JetBrains_Mono,
  Newsreader,
  Schibsted_Grotesk,
} from "next/font/google";

// Direction A: Junction
export const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-a-display",
  display: "swap",
});
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-a-body",
  display: "swap",
});

// Direction B: Network
export const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-b-display",
  display: "swap",
});
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-b-mono",
  display: "swap",
});

// Direction C: Grid
export const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-c-display",
  display: "swap",
});
export const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-c-serif",
  display: "swap",
});

export const brandFontVars = [
  instrumentSerif.variable,
  geist.variable,
  archivo.variable,
  jetbrainsMono.variable,
  schibsted.variable,
  newsreader.variable,
].join(" ");
