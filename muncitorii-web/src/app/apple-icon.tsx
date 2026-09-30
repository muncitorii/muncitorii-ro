import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same brand mark as icon.tsx, scaled up with more breathing room since
// iOS applies its own corner mask on top of this image.
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: "linear-gradient(135deg, #1e3a8a 0%, #172554 100%)",
        }}
      >
        <svg width="112" height="112" viewBox="0 0 64 64" fill="none">
          <path
            d="M14 28C14 17.5 22.3 10 32 10C41.7 10 50 17.5 50 28V31H14V28Z"
            fill="white"
          />
          <path
            d="M18 34C18 43 24.1 49 32 49C39.9 49 46 43 46 34"
            stroke="white"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M24 49H40"
            stroke="#ea580c"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
