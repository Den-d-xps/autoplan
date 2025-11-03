import { chromium } from "playwright";
import fs from "fs";
import { PATHS } from "../constants/paths.js";


(async () => {
  if (!fs.existsSync(PATHS.AUTH_FILE)) {
    process.exit(1); // нет сохранённой сессии → не залогинен
  }

  const context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, { headless: true });
  const page = await context.newPage();

  await page.goto("https://kinoplan.io/dashboard", { waitUntil: "domcontentloaded" });

  if (page.url().includes("/dashboard")) {
    await context.close();
    process.exit(0); // залогинен
  } else {
    await context.close();
    process.exit(1); // не залогинен
  }
})();
