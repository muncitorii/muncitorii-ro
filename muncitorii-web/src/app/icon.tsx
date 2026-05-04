import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0f172a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          fontSize: "20px",
          fontWeight: 900,
          letterSpacing: "-0.05em",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        M<span style={{ color: "#c2410c" }}>.</span>
      </div>
    ),
    { ...size },
  );
}
