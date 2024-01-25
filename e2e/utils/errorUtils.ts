import { Locator, Page, expect } from "@playwright/test";

export async function assertErrorUtil(component: any, message: string) {
  await expect(component).toBeVisible();
  await expect(component).toHaveText(message);
}

export async function assertErrorsHidden(component: any) {
  await expect(component).toBeHidden();
}
