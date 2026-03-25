type ArticleJsonLdProps = {
  dateModified: string;
};

export function ArticleJsonLd({ dateModified }: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline:
      "Bảo Vệ Đức Tin Công Giáo Khi Bị Thách Thức: Báo Cáo Nghiên Cứu Chuyên Sâu",
    abstract:
      "Phân tích phương pháp và nội dung biện giáo Công giáo đương đại: nền tảng tinh thần, chiến thuật đối thoại, cứ liệu thần học.",
    inLanguage: "vi",
    dateModified,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
