import { expect, Page } from "@playwright/test";
import axios from "axios";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export const acceptCookie = async (page: Page) => {
  await page.getByRole("button", { name: "Accept additional cookies" }).click();
  await page.getByRole("button", { name: "Hide cookie message" }).click();
};
export const textCheck = async (page: Page, text: string) => {
  await expect(page.getByText(text)).toBeVisible();
};

export const linkCheck = async (page: Page, text: string) => {
  await expect(page.getByRole("link", { name: text })).toBeVisible();
};

export const buttonCheck = async (page: Page, text: string) => {
  await expect(page.getByRole("button", { name: text })).toBeVisible();
};

export const invisibleTextCheck = async (page: Page, text: string) => {
  await expect(page.getByText(text)).not.toBeVisible();
};

export const headingCheck = async (page: Page, text: string) => {
  await expect(page.getByRole("heading", { name: text })).toBeVisible();
};

export const setCookie = async () => {
  return [
    {
      name: "cookiesAccepted",
      value: "true",
      path: "/",
      domain: "localhost:3000",
    },
  ];
};

export const testEmail = `paddy.duff31+${Math.floor(
  Math.random() * 1000000
)}@gmail.com`;

export const getUsers = async () => {
  const url =
    "http://localhost:8001/tables/nihrd-dynamodb-dev-dte-participant-registration/items";
  const response = await axios.get(url);

  console.log(response.data.Items);

  return response.data.Items;
};

export const getUserByEmail = async (email: string) => {
  const url = `https://localhost:5001/api/users/details/${email}/email`;
  const response = await axios.get(url);

  return response.data.content;
};

export const loaderRemove = async (page: Page) => {
  await page.waitForSelector('[data-testid="loader"]', { state: "hidden" });
};

export const deleteAllParticipants = async () => {
  await axios.delete(
    "http://localhost:8001/tables/nihrd-dynamodb-dev-dte-participant-registration/all"
  );
};
