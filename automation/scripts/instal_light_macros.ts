import { chromium } from "playwright";
import { PATHS } from "../constants/paths.js";
import { URLS } from "../constants/urls.js";



(async () => {
  
  const [,, movie_name, time_value, cinema_number, position] = process.argv;

  const context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, {
    headless: false,
  });
  const page = await context.newPage();
  await page.goto(URLS.CONTENT, { waitUntil: "networkidle" });

  // Обьявление всех локаторов
  const headerEl = page.locator(".b-header");
  const currentCinemaEl = headerEl.locator(".b-current-cinema");
  const selectCinemaEl = currentCinemaEl.locator(".b-header-select");
  const dropdownSelectorEl = currentCinemaEl.locator(".b-dropdown-selector");
  const dropdownSelectorSearch = dropdownSelectorEl.locator(".b-dropdown-selector-search");
  const searchCinemaInput = dropdownSelectorSearch.locator("input[placeholder='Поиск']");
  const searchCinemaResult = dropdownSelectorEl.locator(".b-dropdown-selector-items");
  const firstCinemaResult = searchCinemaResult.locator(".b-dropdown-selector-item").first();
  const section = page.locator(".kinoplan-section");
  const sectionHeader = section.locator(".b-tms-content__space");
  const sectionContent = section.locator(".b-tms-content-wrapper");
  const searchSPLInput = sectionHeader.locator("input[placeholder='Название пакета или релиза']");
  const tableResults = sectionContent.locator(".b-simple-table-body");
  const firstSPLResult = tableResults.locator(".b-simple-table-row").first();
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
  
  // Шаг 1: Выбор кинотеатра
  const count = await selectCinemaEl.count();

  for (let i = 0; i < count; i++) {
    const el = selectCinemaEl.nth(i);
    if (await el.isVisible()) {
      await el.click();
      break;
    }
  }

  await searchCinemaInput.waitFor({ state: 'visible' });
  await searchCinemaInput.fill(cinema_number);
  await page.waitForTimeout(1000);
  await firstCinemaResult.waitFor({ state: 'visible' });
  await firstCinemaResult.click();

  
  // Шаг 2: Поиск и выбор пакета с фильмом
  await section.waitFor({ state: 'visible' });

  await searchSPLInput.waitFor({ state: 'visible' });
  await searchSPLInput.fill(movie_name);

  await tableResults.waitFor({ state: 'visible' });
  await firstSPLResult.waitFor({ state: 'visible' });
  await resultCheckbox.waitFor({ state: 'visible' }); 
  await resultCheckbox.click();

  await lightButton.waitFor({ state: 'visible' }); 
  await lightButton.click();


  // Шаг 3: Внести время метки
  popupContainer.waitFor({ state: 'visible' });

  await popupBody.waitFor({ state: 'visible' });
  await uiInput.waitFor({ state: 'visible' });
  await uiInput.click();

  await timeInputConteiner.waitFor({ state: 'visible' });
  await HHInput.waitFor({ state: 'visible' });
  await MMInput.waitFor({ state: 'visible' });
  await SSInput.waitFor({ state: 'visible' });

  const timeValue = JSON.parse(time_value);
  await HHInput.fill(timeValue.hh.toString());
  await MMInput.fill(timeValue.mm.toString());
  await SSInput.fill(timeValue.ss.toString());

  await selectButton.waitFor({ state: 'visible' });
  await selectButton.click();

  await selectUnderlayer.waitFor({ state: 'visible' });
  await selectList.waitFor({ state: 'visible' });
  await selectStart.waitFor({ state: 'visible' });
  await selectEnd.waitFor({ state: 'visible' });

  if (position === 'start') {
    await selectStart.click();
  } else {
    await selectEnd.click();
  }

  await submitButton.waitFor({ state: 'visible' });
  await submitButton.click();

  await popupContainer.waitFor({ state: 'detached' })

  await context.close();
})();
