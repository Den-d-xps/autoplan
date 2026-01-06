import { chromium } from "playwright";
import fs from "fs";
import { PATHS } from "../constants/paths.js";
import { URLS } from "../constants/urls.js";


(async () => {

  // Создаем папки
  if (!fs.existsSync(PATHS.BASE_DIR)) fs.mkdirSync(PATHS.BASE_DIR, { recursive: true });
  if (!fs.existsSync(PATHS.PROFILE_DIR)) fs.mkdirSync(PATHS.PROFILE_DIR, { recursive: true });

  const context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, {
    headless: false,
  });

  const page = await context.newPage();
  await page.goto(URLS.LOGIN);

  // ждём пока пользователь попадает на dashboard
  await page.waitForURL("**/dashboard", { timeout: 0 });

  // сохраняем auth.json
  await context.storageState({ path: PATHS.AUTH_FILE });

  await context.close();
})();

