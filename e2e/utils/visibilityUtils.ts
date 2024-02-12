import { Locator, expect } from "@playwright/test";

export async function assertComponentsVisible(components: Locator[]) {
  for (const component of components) {
    await expect(component).toBeVisible();
  }
}

export async function assertErrorUtil(component: Locator, message: string) {
  await expect(component).toBeVisible();
  await expect(component).toHaveText(message);
}

export async function assertComponentsHidden(components: Locator[]) {
  for (const component of components) {
    await expect(component).toBeHidden();
  }
}
