declare module 'settings' {

  interface Settings {
    logfile: string;
    base_map: string;
  }

  const settings: Settings;
  export = settings;
}
