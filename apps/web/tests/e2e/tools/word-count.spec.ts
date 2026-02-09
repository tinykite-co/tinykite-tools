import { expect, test } from "@playwright/test";

test("tool page renders runner", async ({ page }) => {
  await page.goto("/tools/word-count");
  await expect(page.getByRole("heading", { name: "Word Count" })).toBeVisible();
  await expect(page.getByText("Runner: countWords")).toBeVisible();
});
