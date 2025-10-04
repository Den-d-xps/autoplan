import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import os from "os";

const baseDir = path.join(os.homedir(), ".autoplan");
const profileDir = path.join(baseDir, "profile");
const authFilePath = path.join(baseDir, "auth.json");

(async () => {
  if (!fs.existsSync(authFilePath)) {
    process.exit(1); // нет сохранённой сессии → не залогинен
  }

  const context = await chromium.launchPersistentContext(profileDir, { headless: true });
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
