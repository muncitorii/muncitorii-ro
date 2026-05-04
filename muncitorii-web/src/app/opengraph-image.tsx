import { ImageResponse } from "next/og";

export const alt = "Muncitorii.ro — Meseriași verificați din România";
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
          backgroundColor: "#1e3a8a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(194, 65, 12, 0.18) 0%, transparent 45%), radial-gradient(circle at 75% 80%, rgba(35, 229, 219, 0.10) 0%, transparent 50%), linear-gradient(135deg, #172554 0%, #1e3a8a 50%, #1e3a72 100%)",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Decorative grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top: badge */}
        <div
          style={{
            display: "flex",
            padding: "10px 22px",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            zIndex: 1,
            alignSelf: "flex-start",
          }}
        >
          ✦ Platforma #1 pentru meseriași din România
        </div>

        <div style={{ flex: 1, display: "flex" }} />

        {/* Main heading — typography logo style */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "150px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.05em",
              display: "flex",
            }}
          >
            Muncitorii<span style={{ color: "#ea580c" }}>.</span>ro
          </div>

          <div
            style={{
              fontSize: "40px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.75)",
              lineHeight: 1.3,
              marginTop: "32px",
              maxWidth: "1000px",
              letterSpacing: "-0.01em",
            }}
          >
            Meseriași verificați. Recenzii reale. Profile cu portofoliu.
          </div>

          <div
            style={{
              display: "flex",
              gap: "32px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            {["✓ Gratuit", "✓ Fără comision", "✓ Profil verificat", "✓ Recenzii reale"].map(
              (item) => (
                <div
                  key={item}
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "rgba(255, 255, 255, 0.6)",
                    display: "flex",
                  }}
                >
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            fontSize: "22px",
            fontWeight: 700,
            color: "rgba(255, 255, 255, 0.45)",
            letterSpacing: "0.05em",
            display: "flex",
          }}
        >
          muncitorii.ro
        </div>
      </div>
    ),
    { ...size },
  );
}
