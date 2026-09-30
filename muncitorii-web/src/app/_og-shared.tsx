import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(cssUrl);
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(
      /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/,
    );
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

const STAGES = [
  { label: "Caiet de sarcini", done: true },
  { label: "Oferte comparabile", done: true },
  { label: "Etape cu poze", done: false },
  { label: "Dosar la recepție", done: false },
];

function ProgressCard() {
  const doneCount = STAGES.filter((s) => s.done).length;
  const progressPct = (doneCount / STAGES.length) * 100;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "380px",
        background: "white",
        borderRadius: "20px",
        padding: "28px 30px",
        boxShadow: "0 20px 60px rgba(15, 23, 42, 0.35)",
      }}
    >
      {STAGES.map((stage, i) => (
        <div
          key={stage.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginTop: i === 0 ? 0 : "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "26px",
              height: "26px",
              borderRadius: "999px",
              flexShrink: 0,
              background: stage.done ? "#1e3a8a" : "white",
              border: stage.done ? "none" : "2px solid #cbd5e1",
              color: "white",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            {stage.done ? "✓" : ""}
          </div>
          <div
            style={{
              fontSize: "19px",
              fontWeight: 600,
              color: stage.done ? "#0f172a" : "#94a3b8",
            }}
          >
            {stage.label}
          </div>
        </div>
      ))}

      <div
        style={{
          display: "flex",
          width: "100%",
          height: "10px",
          borderRadius: "999px",
          background: "#e2e8f0",
          marginTop: "24px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            width: `${progressPct}%`,
            height: "100%",
            borderRadius: "999px",
            backgroundImage: "linear-gradient(90deg, #ea580c 0%, #c2410c 100%)",
          }}
        />
      </div>
    </div>
  );
}

export async function buildBrandOgImage() {
  const text =
    "Muncitorii.roRenovări coordonate,cu dovadă.Caiet de sarcini · oferte comparabile · etape cu poze · dosar la recepțieBrașov și împrejurimimuncitorii.roCaiet de sarcini Oferte comparabile Etape cu poze Dosar la recepție";

  const [regular, semibold, bold] = await Promise.all([
    loadGoogleFont("Inter", 500, text),
    loadGoogleFont("Inter", 600, text),
    loadGoogleFont("Inter", 800, text),
  ]);

  const fonts = [
    regular && { name: "Inter", data: regular, weight: 500 as const, style: "normal" as const },
    semibold && { name: "Inter", data: semibold, weight: 600 as const, style: "normal" as const },
    bold && { name: "Inter", data: bold, weight: 800 as const, style: "normal" as const },
  ].filter(Boolean) as { name: string; data: ArrayBuffer; weight: 500 | 600 | 800; style: "normal" }[];

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
            "radial-gradient(circle at 20% 20%, rgba(194, 65, 12, 0.16) 0%, transparent 45%), radial-gradient(circle at 85% 85%, rgba(59, 108, 199, 0.18) 0%, transparent 50%), linear-gradient(135deg, #172554 0%, #1e3a8a 55%, #1e3a72 100%)",
          padding: "64px 72px",
          position: "relative",
          fontFamily: fonts.length ? "Inter" : "sans-serif",
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

        {/* Top: logo */}
        <div style={{ display: "flex", alignItems: "center", zIndex: 1 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              marginRight: "14px",
              backgroundImage:
                "linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 64 64" fill="none">
              <path
                d="M14 28C14 17.5 22.3 10 32 10C41.7 10 50 17.5 50 28V31H14V28Z"
                fill="white"
              />
              <path
                d="M18 34C18 43 24.1 49 32 49C39.9 49 46 43 46 34"
                stroke="white"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M24 49H40"
                stroke="#ea580c"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div
            style={{
              fontSize: "30px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Muncitorii<span style={{ color: "#ea580c" }}>.</span>ro
          </div>
        </div>

        {/* Middle: title + subtitle (left) and progress card (right) */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "56px",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", maxWidth: "660px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "54px",
                fontWeight: 800,
                color: "white",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                whiteSpace: "nowrap",
              }}
            >
              <div style={{ display: "flex" }}>Renovări coordonate,</div>
              <div style={{ display: "flex" }}>cu dovadă.</div>
            </div>
            <div
              style={{
                fontSize: "23px",
                fontWeight: 500,
                color: "rgba(255, 255, 255, 0.78)",
                lineHeight: 1.45,
                marginTop: "26px",
                maxWidth: "560px",
                display: "flex",
              }}
            >
              Caiet de sarcini · oferte comparabile · etape cu poze · dosar la
              recepție
            </div>
          </div>

          <ProgressCard />
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: "20px",
              fontWeight: 600,
              color: "rgba(255, 255, 255, 0.55)",
              letterSpacing: "0.01em",
              display: "flex",
            }}
          >
            Brașov și împrejurimi
          </div>
          <div
            style={{
              display: "flex",
              padding: "10px 22px",
              borderRadius: "999px",
              backgroundImage: "linear-gradient(90deg, #ea580c 0%, #c2410c 100%)",
              color: "white",
              fontSize: "22px",
              fontWeight: 700,
              letterSpacing: "0.01em",
            }}
          >
            muncitorii.ro
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
