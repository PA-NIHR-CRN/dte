import { Locator, Page, expect } from "@playwright/test";

export async function assertComponentsVisible(components: any[]) {
  for (const component of components) {
    await expect(component).toBeVisible();
  }
}
