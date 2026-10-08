import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { getSiteContent } from "@/lib/site-content";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { brand, contact } = await getSiteContent();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#f7f3ed",
          color: "#1d1915",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#9a6b43" }}>
          {`${brand.subtitle || "Event Studio"} · ${contact.region}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, lineHeight: 1 }}>{brand.shortName}</div>
          <div style={{ fontSize: 44, marginTop: 24, color: "#6d6358" }}>{brand.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
