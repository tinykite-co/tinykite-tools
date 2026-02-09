import { expect, test } from "@playwright/test";

test("home lists tools", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Tinykite Tools" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Word Count" })).toBeVisible();
});
