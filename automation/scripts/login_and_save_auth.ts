import { chromium } from "playwright";
import fs from "fs";
import { PATHS } from "../constants/paths.js";
import { URLS } from "../constants/urls.js";
import path from "path";
import { fileURLToPath } from "url";

// абсолютный путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// путь к chromium внутри packaged app
const chromiumPath = path.join(__dirname, "../../dist/playwright/chromium/chrome-win/chrome.exe");

(async () => {

  // Создаем папки
  if (!fs.existsSync(PATHS.BASE_DIR)) fs.mkdirSync(PATHS.BASE_DIR, { recursive: true });
  if (!fs.existsSync(PATHS.PROFILE_DIR)) fs.mkdirSync(PATHS.PROFILE_DIR, { recursive: true });

  // создаём persistent context с явным executablePath
  const context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, {
    headless: false,
    executablePath: chromiumPath,
  });

  const page = await context.newPage();
  await page.goto(URLS.LOGIN);

  // ждём пока пользователь попадает на dashboard
  await page.waitForURL("**/dashboard", { timeout: 0 });

  // сохраняем auth.json
  await context.storageState({ path: PATHS.AUTH_FILE });

  await context.close();
})();

