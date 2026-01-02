import { chromium } from "playwright";
import fs from "fs";
import { PATHS } from "../constants/paths.js";
import { URLS } from "../constants/urls.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const chromiumPath = path.join(__dirname, "../../dist/playwright/chromium/chrome-win/chrome.exe");

(async () => {
  if (!fs.existsSync(PATHS.AUTH_FILE)) {
    process.exit(1); // нет сохранённой сессии → не залогинен
  }

  const context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, { 
    headless: false,
    executablePath: chromiumPath
  });

  const page = await context.newPage();
  await page.goto(URLS.DASHBOARD, { waitUntil: "domcontentloaded" });

  if (page.url().includes("/dashboard")) {
    await context.close();
    process.exit(0); // залогинен
  } else {
    await context.close();
    process.exit(1); // не залогинен
  }
})();
