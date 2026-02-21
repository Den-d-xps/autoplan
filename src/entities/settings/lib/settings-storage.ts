import { load } from '@tauri-apps/plugin-store';
import type { ISettings } from '../model/types';
import { DEFAULT_SETTINGS } from '../config';

const STORE_FILE = 'settings.json';
const SETTINGS_KEY = 'settings';

export async function loadSettings(): Promise<ISettings> {
  const store = await load(STORE_FILE);
  const saved = await store.get<ISettings>(SETTINGS_KEY);
  return saved ?? DEFAULT_SETTINGS;
}

export async function saveSettings(settings: ISettings): Promise<void> {
  const store = await load(STORE_FILE);
  await store.set(SETTINGS_KEY, settings);
  await store.save();
}