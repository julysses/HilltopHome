import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Placeholder mark until the real vectorized "H" monogram is available:
// a crimson rounded square with a bold white "H".
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#CE0435",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          fontWeight: 800,
          color: "#FFFFFF",
        }}
      >
        H
      </div>
    ),
    { ...size },
  );
}
