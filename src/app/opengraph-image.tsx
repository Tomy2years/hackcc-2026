import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { EVENT } from "@/lib/event";

export const alt = `${EVENT.edition}: ${EVENT.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const icon = await readFile(join(process.cwd(), "public/images/hackcc-icon.png"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(180deg, #191C20 0%, #0F1114 100%)",
          color: "#FFF8EB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${icon}`} width={120} height={120} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>{EVENT.edition}</div>
            <div style={{ fontSize: 34, color: "#FFD044", marginTop: 14 }}>{EVENT.tagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 30, color: "#FFF8EB" }}>
            <div>{`${EVENT.dateLabel} · ${EVENT.venue.name}`}</div>
            <div style={{ color: "#C9CCD0", fontSize: 26 }}>{`Free · ${EVENT.eligibility}`}</div>
          </div>
          <div style={{ fontSize: 28, color: "#FFD044", fontWeight: 700 }}>hackcc.net</div>
        </div>
      </div>
    ),
    size
  );
}
