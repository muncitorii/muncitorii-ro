import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#1e3a8a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
    ),
    { ...size },
  );
}
