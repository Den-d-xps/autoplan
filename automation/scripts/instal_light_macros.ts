import { chromium } from "playwright";
import { PATHS } from "../constants/paths.js";
import { URLS } from "../constants/urls.js";


const [,, movie_name, time_value, cinema_number, position, id] = process.argv;

function report( progress: number | null, message: string, type: "info" | "error" = "info") {
  console.log(JSON.stringify({ progress, message, type, id }));
}

async function safeStep(progress: number, message: string, stepFn: () => Promise<void>) {
  try {
    report(progress, message);
    await stepFn();
  } catch (err: any) {
    const errorMsg = `${err.message || err}`;
    report(progress, errorMsg, "error");
    process.exit(1);
  }
}

(async () => {
  report(0, "Запуск макроса установки света...");

  const context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, {
    headless: true,
    executablePath: chromium.executablePath(),
  });


  const timeValue = JSON.parse(time_value);

  const page = await context.newPage();

  await safeStep(5, "Переход на страницу контента...", async () => {
    await page.goto(URLS.CONTENT, { waitUntil: "domcontentloaded" });
  });

  // Обьявление всех локаторов
  const headerEl = page.locator(".b-header");
  const desktopHeaderEl = headerEl.locator(".kinoplan-header");
  const currentCinemaEl = desktopHeaderEl.locator(".b-current-cinema");
  const selectCinemaEl = currentCinemaEl.locator(".b-header-select");
  const dropdownSelectorEl = currentCinemaEl.locator(".b-dropdown-selector");
  const dropdownSelectorSearch = dropdownSelectorEl.locator(".b-dropdown-selector-search");
  const searchCinemaInput = dropdownSelectorSearch.locator("input[placeholder='Поиск']");
  const searchCinemaResult = dropdownSelectorEl.locator(".b-dropdown-selector-items");
  const notFoundCinema = searchCinemaResult.locator('.b-dropdown-selector-search_not-found');
  const firstCinemaResult = searchCinemaResult.locator(".b-dropdown-selector-item").first();
  const section = page.locator(".kinoplan-section");
  const sectionHeader = section.locator(".b-tms-content__space");
  const sectionContent = section.locator(".b-tms-content-wrapper");
  const searchSPLInput = sectionHeader.locator("input[placeholder='Название пакета или релиза']");
  const notFoundMovie = sectionContent.locator('span:has-text("Ничего не найдено")')
  const tableResults = sectionContent.locator(".b-simple-table-body");
  const rowsTableResults = tableResults.locator(".b-simple-table-row");
  const firstSPLResult = rowsTableResults.first();
  const macroInfo = firstSPLResult.locator(".b-simple-table-cell:has-text('Время титров')");
  const resultCheckbox = firstSPLResult.locator(".checkbox__input");
  const lightButton = sectionHeader.locator('button:has(span:has-text("Свет"))');
  const popupContainer = page.locator(".ui-popup-container");
  const popupBody = popupContainer.locator(".ui-content");
  const popupFooter = popupContainer.locator(".ui-footer");
  const uiInput = popupBody.locator(".ui-input");
  const selectButton = popupBody.locator('button.ui-btn.ui-select');
  const submitButton = popupFooter.locator('button:has(span:has-text("Установить"))');
  const timeInputConteiner = page.locator(".ui-time-input");
  const HHInput = timeInputConteiner.getByPlaceholder('HH')
  const MMInput = timeInputConteiner.getByPlaceholder('MM')
  const SSInput = timeInputConteiner.getByPlaceholder('SS')
  const selectUnderlayer = page.locator(".ui-select-underlayer");
  const selectList = selectUnderlayer.locator(".ui-select-list");
  const selectStart = selectList.locator('.ui-select-option:has-text("С начала фильма")');
  const selectEnd = selectList.locator('.ui-select-option:has-text("С конца фильма")');
  

  // Шаг 1: Поиск и выбор кинотеатра
  await safeStep(20, "Поиск и выбор кинотеатра...", async () => {
    await selectCinemaEl.waitFor({ state: "visible" });
    await selectCinemaEl.click();
    await searchCinemaInput.waitFor({ state: "visible" });
    await searchCinemaInput.fill(cinema_number);
    await page.waitForTimeout(1000);

    const resultFound = await Promise.race([
      firstCinemaResult.waitFor({ state: "visible", timeout: 5000 }).then(() => true).catch(() => false),
      notFoundCinema.waitFor({ state: "visible", timeout: 5000 }).then(() => false).catch(() => false),
    ]);

    if (!resultFound) {
      throw new Error("Кинотеатр не найден...");
    } else {
      await firstCinemaResult.click();
    }
  });

  // Шаг 2: Поиск и выбор пакета с фильмом
  await safeStep(35, "Поиск CPL пакета...", async () => {
    await section.waitFor({ state: 'visible' });
    await searchSPLInput.waitFor({ state: 'visible' });
    await searchSPLInput.fill(movie_name);

    const resultFound = await Promise.any([
      tableResults.waitFor({ state: 'visible' }).then(() => true),
      notFoundMovie.waitFor({ state: 'visible' }).then(() => false),
    ]).catch(() => false);

    if (!resultFound) {
      throw new Error("CPL не найден...");
    }
    
    await firstSPLResult.waitFor({ state: 'visible' });
  })

  // Шаг 3: Проверка: Метка уже установлена?
  await safeStep(50, "Проверка на существующую метку", async () => {
    const exists = await macroInfo.count(); // проверяем, есть ли элемент вообще
    if (exists != 0) {
    // Метка ещё не установлена — продолжаем без ошибок
      await macroInfo.waitFor({ state: 'visible' });
      const macroText = await macroInfo.innerText();
      const targetTime = `${timeValue.hh.toString().padStart(2, "0")}:${timeValue.mm.toString().padStart(2, "0")}:${timeValue.ss.toString().padStart(2, "0")}`;
      const targetPosition = position === "start" ? "с начала фильма" : "с конца фильма";

      if (macroText.includes(targetTime) && macroText.includes(targetPosition)) {
        throw new Error("Такая метка уже установлена!");
      }
    }
  });
  
  // Шаг 4: открытие окна "Свет"
  await safeStep(55, "Настройка времени метки света.", async () => {
    await resultCheckbox.waitFor({ state: 'visible' }); 
    await resultCheckbox.click();
    await lightButton.waitFor({ state: "visible" });
    await lightButton.click();
    await popupContainer.waitFor({ state: "visible" });
  });

  // Шаг 5: ввод времени
  await safeStep(75, "Настройка времени метки света..", async () => {
    await uiInput.waitFor({ state: "visible" });
    await uiInput.click();

    await timeInputConteiner.waitFor({ state: "visible" });
    await HHInput.waitFor({ state: "visible" });
    await MMInput.waitFor({ state: "visible" });
    await SSInput.waitFor({ state: "visible" });

    // const timeValue = JSON.parse(time_value);
    await HHInput.fill(timeValue.hh.toString());
    await MMInput.fill(timeValue.mm.toString());
    await SSInput.fill(timeValue.ss.toString());
  });

  // Шаг 6: выбор позиции (с начала / с конца)
  await safeStep(85, "Настройка времени метки света...", async () => {
    await selectButton.waitFor({ state: "visible" });
    await selectButton.click();
    await selectUnderlayer.waitFor({ state: "visible" });
    await selectList.waitFor({ state: 'visible' });
    await selectStart.waitFor({ state: 'visible' });
    await selectEnd.waitFor({ state: 'visible' });
    if (position === "start") {
      await selectStart.click();
    } else {
      await selectEnd.click();
    }
  });

  // Шаг 7: установка макроса
  await safeStep(95, "Применение изменений...", async () => {
    await submitButton.waitFor({ state: "visible" });
    await submitButton.click();
    await popupContainer.waitFor({ state: "detached" });
  });

  report(100, "");
  await context.close();
})();
