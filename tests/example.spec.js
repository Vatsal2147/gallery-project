import { test, expect } from "@playwright/test";

test("user can move to the next page", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await expect(page.getByText("Page 1")).toBeVisible();

  await page.getByRole("button", { name: "Next" }).click();

  await expect(page.getByText("Page 2")).toBeVisible();
});