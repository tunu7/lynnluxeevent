import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
          {`Event Studio · ${site.contact.region}`}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, lineHeight: 1 }}>{site.shortName}</div>
          <div style={{ fontSize: 44, marginTop: 24, color: "#6d6358" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
