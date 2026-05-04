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
        {/* Decorative grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top: badge + logo mark */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            zIndex: 1,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              width: "76px",
              height: "76px",
              borderRadius: "20px",
              background: "linear-gradient(135deg, #c2410c 0%, #ea580c 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 40px rgba(194, 65, 12, 0.45)",
            }}
          >
            <svg width="44" height="44" viewBox="0 0 64 64" fill="none">
              <path
                d="M14 28C14 17.5 22.3 10 32 10C41.7 10 50 17.5 50 28V31H14V28Z"
                fill="white"
              />
              <path
                d="M18 34C18 43 24.1 49 32 49C39.9 49 46 43 46 34"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M24 49H40"
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Tag */}
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              color: "rgba(255, 255, 255, 0.85)",
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "0.5px",
            }}
          >
            ✦ Platforma #1 pentru meseriași din România
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1, display: "flex" }} />

        {/* Main heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "108px",
              fontWeight: 900,
              color: "white",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              display: "flex",
            }}
          >
            Muncitorii<span style={{ color: "#ea580c" }}>.ro</span>
          </div>

          <div
            style={{
              fontSize: "38px",
              fontWeight: 500,
              color: "rgba(255, 255, 255, 0.75)",
              lineHeight: 1.3,
              marginTop: "24px",
              maxWidth: "900px",
              letterSpacing: "-0.01em",
            }}
          >
            Meseriași verificați. Recenzii reale. Profile cu portofoliu.
          </div>

          {/* Bottom value props */}
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
                    fontSize: "22px",
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

        {/* Bottom URL */}
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
