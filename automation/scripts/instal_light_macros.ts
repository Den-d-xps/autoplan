import { chromium } from "playwright";
import { PATHS } from "../constants/paths.js";



(async () => {
  
  const [,, movie_name, time_value, cinema_number] = process.argv;

  const context = await chromium.launchPersistentContext(PATHS.PROFILE_DIR, {
    // headless: false,
  });
  const page = await context.newPage();
  await page.goto("https://kinoplan.io/tms/content", { waitUntil: "networkidle" });

  
  // Шаг 1: Выбор кинотеатра
  const headerEl = page.locator(".b-header");
  const currentCinemaEl = headerEl.locator(".b-current-cinema");
  const selectCinemaEl = currentCinemaEl.locator(".b-header-select");
  
  const count = await selectCinemaEl.count();

  for (let i = 0; i < count; i++) {
    const el = selectCinemaEl.nth(i);
    if (await el.isVisible()) {
      await el.click();
      break;
    }
  }

  await page.waitForSelector(".b-dropdown-selector");

  const dropdownSelectorEl = currentCinemaEl.locator(".b-dropdown-selector");
  const dropdownSelectorSearch = dropdownSelectorEl.locator(".b-dropdown-selector-search");
  const searchCinemaInput = dropdownSelectorSearch.locator("input[placeholder='Поиск']");
  const searchCinemaResult = dropdownSelectorEl.locator(".b-dropdown-selector-items");

  searchCinemaInput.fill(cinema_number);
  await page.waitForTimeout(1000);

  const firstCinemaResult = searchCinemaResult.locator(".b-dropdown-selector-item").first();
  firstCinemaResult.click();

  await page.waitForSelector(".kinoplan-section");


  // Шаг 2: Поиск и выбор пакета с фильмом
  const section = page.locator(".kinoplan-section");
  const sectionHeader = section.locator(".b-tms-content__space");
  const sectionContent = section.locator(".b-tms-content-wrapper");
  const searchSPLInput = sectionHeader.locator("input[placeholder='Название пакета или релиза']");

  searchSPLInput.fill(movie_name);
  await page.waitForTimeout(1000);

  const tableResults = sectionContent.locator(".b-simple-table-body");
  const firstSPLResult = tableResults.locator(".b-simple-table-row").first();
  const resultCheckbox = firstSPLResult.locator(".checkbox__input");
  resultCheckbox.click();

  await sectionHeader.locator('button:has(span:has-text("Свет"))').click();
  
  await page.waitForSelector(".ui-popup-container");


  // Шаг 3: Внести время метки
  const popupContainer = page.locator(".ui-popup-container");
  const popupBody = popupContainer.locator(".ui-content");
  const popupFooter = popupContainer.locator(".ui-footer");
  
  const uiInput = popupBody.locator(".ui-input");
  await uiInput.click();  


  await page.waitForSelector(".ui-time-input");
  const timeInputConteiner = page.locator(".ui-time-input");
  const HHInput = timeInputConteiner.getByPlaceholder('HH')
  const MMInput = timeInputConteiner.getByPlaceholder('MM')
  const SSInput = timeInputConteiner.getByPlaceholder('SS')

  const timeValue = JSON.parse(time_value);

  await HHInput.fill(timeValue.hh.toString());
  await MMInput.fill(timeValue.mm.toString());
  await SSInput.fill(timeValue.ss.toString());

  const popupButton = popupFooter.locator('button:has(span:has-text("Установить"))');
  await popupBody.click();
  await popupButton.click();

  await context.close();


})();
