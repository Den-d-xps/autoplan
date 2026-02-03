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
    await page.goto(URLS.THEATERS, { waitUntil: "domcontentloaded" });

    // ждём, пока список кинотеатров появится
    const cinemaList = page.locator('.aside-component-list');
    await cinemaList.waitFor({ state: 'visible' });

    // находим все элементы кинотеатров
    const cinemaItems = cinemaList.locator('.aside-component-list-item');

    // получаем массив номеров
    const cinemaNumbers = await cinemaItems.evaluateAll((elements) => {
    return elements
      .map(el => {
        const numberNode = Array.from(el.childNodes).find(
          node =>
            node.nodeType === Node.TEXT_NODE &&
            node.textContent?.trim().match(/^\d+$/)
        );

        return numberNode?.textContent?.trim() ?? null;
      })
      .filter(Boolean);
    });

    console.log(JSON.stringify({
      type: "theaters",
      payload: cinemaNumbers,
    }));
  } catch (error: any) {
    console.error(JSON.stringify({
      type: "error",
      message: error.message ?? String(error),
    }));
    process.exitCode = 1;

  } finally {
    // ВСЕГДА закрываем браузер
    if (context) {
      await context.close();
    }
    // Явно завершаем процесс
    process.exit();
  }

})()