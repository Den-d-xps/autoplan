import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import os from "os";

(async () => {
  const baseDir = path.join(os.homedir(), ".autoplan");
  const profileDir = path.join(baseDir, "profile");
  const authFilePath = path.join(baseDir, "auth.json");

  // Создаем папки
  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir, { recursive: true });
  if (!fs.existsSync(profileDir)) fs.mkdirSync(profileDir, { recursive: true });


  // создаём persistent context, чтобы сохранять cookies/локальное хранилище
  const context = await chromium.launchPersistentContext(profileDir, {
    headless: false, // показываем окно пользователю для логина
  });

  const page = await context.newPage();
  await page.goto("https://kinoplan.io/start");

  // ждём пока пользователь попадает на dashboard
  await page.waitForURL("**/dashboard", { timeout: 0 });

  // сохраняем auth.json
  await context.storageState({ path: authFilePath });

  await context.close();
})();

