import { devices, PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  testDir: "./e2e/tests/features",
  outputDir: "./e2e/test-results",
  testMatch: /features/,
  testIgnore: "**/src/**",
  reporter: [
    ["list", { printSteps: true }],
    ["html", { outputFolder: "./e2e/test-report" }],
  ],
  globalSetup: "./e2e/hooks/GlobalSetup.ts",
  timeout: 60000,
  workers: 6, // to enforce parallel workers in Actions Workflow
  retries: 2,
  projects: [
    {
      name: "BPoR-VS",
      testIgnore: "**/accessibilityTests/**",
      use: {
        trace: "on",
        baseURL: `${process.env.TEST_BASE_URL}`,
        headless: true,
        screenshot: "on",
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: "BPoR-VS Firefox",
      testIgnore: "**/tests/**",
      use: {
        ...devices["Desktop Firefox"],
        trace: "on",
        baseURL: `${process.env.TEST_BASE_URL}`,
        headless: true,
        screenshot: "on",
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: "BPoR-VS Safari",
      testIgnore: "**/tests/**",
      use: {
        ...devices["Desktop Safari"],
        trace: "on",
        baseURL: `${process.env.TEST_BASE_URL}`,
        headless: true,
        screenshot: "on",
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: "BPoR-VS Microsoft Edge",
      testIgnore: "**/tests/**",
      use: {
        ...devices["Desktop Edge"],
        channel: "msedge",
        trace: "on",
        baseURL: `${process.env.TEST_BASE_URL}`,
        headless: true,
        screenshot: "on",
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: "BPoR-VS Google Chrome",
      testIgnore: "**/tests/**",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        trace: "on",
        baseURL: `${process.env.TEST_BASE_URL}`,
        headless: true,
        screenshot: "on",
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: "BPoR-VS Mobile Chrome",
      testIgnore: "**/tests/**",
      use: {
        ...devices["Pixel 5"],
        trace: "on",
        baseURL: `${process.env.TEST_BASE_URL}`,
        headless: true,
        screenshot: "on",
        launchOptions: {
          slowMo: 0,
        },
      },
    },
    {
      name: "BPoR-VS Mobile Safari",
      testIgnore: "**/tests/**",
      use: {
        ...devices["iPhone 13"],
        trace: "on",
        baseURL: `${process.env.TEST_BASE_URL}`,
        headless: true,
        screenshot: "on",
        launchOptions: {
          slowMo: 0,
        },
      },
    },
  ],
};

export default config;
