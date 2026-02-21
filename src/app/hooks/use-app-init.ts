import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@store";
import { listen } from "@tauri-apps/api/event";
import { invoke } from "@tauri-apps/api/core";
import { handleCheckAuth, handleLogin } from "@feat/auth";
import { userActions, userSelectors } from "@entities/user";
import { settingsActions, loadSettings, saveSettings } from "@entities/settings";
import { appActions, appSelectors } from "@/app/model";
import { store } from "@store";

async function loadTheaters(dispatch: ReturnType<typeof useAppDispatch>) {
  const unlistenTheaters = await listen("theaters_list", (event) => {
    const payload = event.payload as string[];
    const theaters = payload.map((number) => `ОП${number}`);
    dispatch(userActions.set_theaters(theaters));
  });

  await invoke("get_theaters");
  unlistenTheaters();
}

async function loadUserInfo(dispatch: ReturnType<typeof useAppDispatch>) {
  const unlistenUserInfo = await listen("user_info", (event) => {
    const payload = event.payload as { name: string; avatar: string };
    dispatch(userActions.set_user_info(payload));
  });

  await invoke("get_user_info");
  unlistenUserInfo();
}

export const useAppInit = () => {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(appSelectors.selectIsInitialized);
  const progress = useAppSelector(appSelectors.selectProgress);
  const statusMessage = useAppSelector(appSelectors.selectStatusMessage);
  const error = useAppSelector(appSelectors.selectError);

  const runInit = useCallback(async () => {
    dispatch(appActions.resetInit());

    try {
      // Шаг 1: Проверка авторизации
      dispatch(appActions.setProgress({ progress: 10, message: "Проверка авторизации" }));
      const isLoggedIn = await dispatch(handleCheckAuth()).unwrap();

      // Шаг 2: Если не авторизован — запускаем логин
      if (!isLoggedIn) {
        dispatch(appActions.setProgress({ progress: 30, message: "Вход в систему" }));
        await dispatch(handleLogin()).unwrap();
      }

      // Шаг 3: Загрузка профиля пользователя
      dispatch(appActions.setProgress({ progress: 45, message: "Загрузка профиля" }));
      await loadUserInfo(dispatch);

      // Шаг 4: Загрузка кинотеатров
      dispatch(appActions.setProgress({ progress: 70, message: "Загрузка кинотеатров" }));
      await loadTheaters(dispatch);

      // Шаг 5: Загрузка настроек (после кинотеатров, с фильтрацией)
      dispatch(appActions.setProgress({ progress: 85, message: "Загрузка настроек" }));
      const savedSettings = await loadSettings();
      const userTheaters = userSelectors.selectTheaters(store.getState());
      const userTheaterNumbers = userTheaters.map((t) => t.slice(2));
      const filteredTheaters = savedSettings.main.theaters.filter(
        (t) => userTheaterNumbers.includes(t)
      );
      const filteredSettings = { ...savedSettings, main: { ...savedSettings.main, theaters: filteredTheaters } };
      dispatch(settingsActions.setAllSettings(filteredSettings));

      if (filteredTheaters.length !== savedSettings.main.theaters.length) {
        await saveSettings(filteredSettings);
      }

      // Готово — задержка чтобы анимация статуса успела проиграться
      dispatch(appActions.setProgress({ progress: 100, message: "Готово" }));
      await new Promise((r) => setTimeout(r, 500));
      dispatch(appActions.setInitialized());
    } catch (err) {
      const message = err instanceof Error ? err.message : "Ошибка инициализации";
      dispatch(appActions.setError(message));
    }
  }, [dispatch]);

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    runInit();
  }, [runInit]);

  return {
    isInitialized,
    progress,
    statusMessage,
    error,
    onReinit: runInit,
  };
};