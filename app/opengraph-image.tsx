import { ImageResponse } from "next/og";

export const alt =
  "Biện giáo Công giáo đương đại: báo cáo phân tích chuyên sâu";

export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #faf9f6 0%, #e7e2d8 55%, #f5f4f0 100%)",
          color: "#1c1917",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#b91c1c",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Báo Cáo Nghiên Cứu Chuyên Sâu
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            marginTop: 20,
            lineHeight: 1.12,
            maxWidth: 1000,
          }}
        >
          Bảo Vệ Đức Tin Công Giáo Khi Bị Thách Thức
        </div>
        <div
          style={{
            fontSize: 26,
            marginTop: 28,
            color: "#44403c",
            maxWidth: 920,
            lineHeight: 1.35,
          }}
        >
          Báo cáo phân tích chuyên đề: nền tảng tinh thần, chiến thuật đối thoại & thần học.
        </div>
      </div>
    ),
    { ...size },
  );
}
