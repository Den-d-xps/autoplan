export interface ISettings {
  main: {
    theaters: string[],
  }
}

export interface ISettingsState {
  settings: ISettings;
}