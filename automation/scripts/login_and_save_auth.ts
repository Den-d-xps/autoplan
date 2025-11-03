import { chromium } from "playwright";
import fs from "fs";
import { PATHS } from "../constants/paths.js";

(async () => {

  // Создаем папки
  if (!fs.existsSync(PATHS.BASE_DIR)) fs.mkdirSync(PATHS.BASE_DIR, { recursive: true });
  if (!fs.existsSync(PATHS.PROFILE_DIR)) fs.mkdirSync(PATHS.PROFILE_DIR, { recursive: true });


  // создаём persistent context, чтобы сохранять cookies/локальное хранилище
  const context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, {
    headless: false, // показываем окно пользователю для логина
  });

  const page = await context.newPage();
  await page.goto("https://kinoplan.io/start");

  // ждём пока пользователь попадает на dashboard
  await page.waitForURL("**/dashboard", { timeout: 0 });

  // сохраняем auth.json
  await context.storageState({ path: PATHS.AUTH_FILE });

  await context.close();
})();

