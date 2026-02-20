import { chromium } from "playwright";
import { PATHS } from "../constants/paths.js";
import { URLS } from "../constants/urls.js";

(async () => {
  let context;

  try {
    context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, {
      headless: true,
      executablePath: chromium.executablePath(),
    });

    const page = await context.newPage();
    await page.goto(URLS.PROFILE, { waitUntil: "domcontentloaded" });

    // ждём, пока имя пользователя появится
    const nameEl = page.locator('.user-profile-main-header-user__name');
    await nameEl.waitFor({ state: 'visible' });

    const fullName = await nameEl.textContent() ?? "user";
    const name = fullName.trim().split(/\s+/)[0];

    // получаем URL аватарки из background-image
    const avatarEl = page.locator('.image-downloader-preview__image');
    const avatar = await avatarEl.evaluate((el) => {
      const bg = getComputedStyle(el).backgroundImage;
      const match = bg.match(/url\(["']?(.+?)["']?\)/);
      return match?.[1] ?? "";
    });

    console.log(JSON.stringify({
      type: "user_info",
      payload: { name, avatar },
    }));
  } catch (error: any) {
    console.error(JSON.stringify({
      type: "error",
      message: error.message ?? String(error),
    }));
    process.exitCode = 1;
  } finally {
    if (context) {
      await context.close();
    }
    process.exit();
  }
})();