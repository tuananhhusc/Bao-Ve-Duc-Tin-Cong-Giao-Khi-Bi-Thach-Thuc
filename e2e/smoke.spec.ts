import { expect, test } from "@playwright/test";

test("trang chủ tải được với tiêu đề và mục lục", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: /Báo cáo Phân tích/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Mục lục bài viết" }).first(),
  ).toBeVisible();
});

test("trang quyền riêng tư", async ({ page }) => {
  await page.goto("/privacy");
  await expect(
    page.getByRole("heading", { level: 1, name: "Quyền riêng tư" }),
  ).toBeVisible();
});
