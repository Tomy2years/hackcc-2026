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
          background: "linear-gradient(180deg, #0B0F19 0%, #020617 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${icon}`} width={120} height={120} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>{EVENT.edition}</div>
            <div style={{ fontSize: 34, color: "#FBBF24", marginTop: 14 }}>{EVENT.tagline}</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 30, color: "#E2E8F0" }}>
            <div>{`${EVENT.dateLabel} · ${EVENT.venue.name}`}</div>
            <div style={{ color: "#94A3B8", fontSize: 26 }}>{EVENT.audience}</div>
          </div>
          <div style={{ fontSize: 28, color: "#FBBF24", fontWeight: 700 }}>hackcc.net</div>
        </div>
      </div>
    ),
    size
  );
}
