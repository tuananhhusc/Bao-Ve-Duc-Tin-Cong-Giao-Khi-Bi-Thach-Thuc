import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quyền riêng tư",
  description:
    "Thông tin về phân tích lưu lượng và dữ liệu trên trang đọc biện giáo.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-prose px-4 py-16 sm:px-6">
      <p className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="text-primary underline underline-offset-4">
          ← Về trang chủ
        </Link>
      </p>
      <h1 className="font-serif text-3xl font-semibold text-foreground">
        Quyền riêng tư
      </h1>
      <div className="mt-8 space-y-4 text-[1.0625rem] leading-relaxed text-foreground">
        <p>
          Trang này phục vụ đọc tài liệu tĩnh. Máy chủ có thể ghi nhật ký kỹ
          thuật thông thường (như địa chỉ IP, loại trình duyệt) theo cấu hình
          hosting của bạn.
        </p>
        <p>
          Nếu chủ sở hữu trang bật{" "}
          <strong className="font-semibold">Plausible Analytics</strong> qua
          biến môi trường, dịch vụ đó thu thập thống kê lưu lượng tổng hợp,
          không dùng cookie theo dõi cá nhân theo mô hình của Plausible. Bạn có
          thể tắt hoàn toàn bằng cách không đặt{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-sm">
            NEXT_PUBLIC_PLAUSIBLE_DOMAIN
          </code>
          .
        </p>
        <p>
          Các liên kết ngoài trong phần nguồn trích dẫn dẫn tới trang bên thứ
          ba; chính sách riêng tư của từng trang đó được áp dụng khi bạn truy
          cập.
        </p>
      </div>
    </main>
  );
}
