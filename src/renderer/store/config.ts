import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { detectEnvironment } from 'renderer/utils';

export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export enum KeyOption {
  Enter = 'Enter',
  ChapterNext = 'Ctrl + Right',
  ShiftEnter = 'Shift + Enter',
  AltEnter = 'Alt + Enter',
  MetaEnter = 'Meta + Enter',
}

const DEFAULT_CONFIG = {
  KeyOption: KeyOption.ChapterNext as KeyOption,
  fontSize: 14,
  theme: Theme.Light as Theme,
  os: detectEnvironment().os,
  env: detectEnvironment().env,
};

export type DefaultConfig = typeof DEFAULT_CONFIG;

export type ConfigStore = DefaultConfig & {
  reset: () => void;
  update: (updater: (config: DefaultConfig) => void) => void;
};

const CONFIG_KEY = 'app-config';

export const useAppConfig = create<ConfigStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_CONFIG,

      reset() {
        set(() => ({ ...DEFAULT_CONFIG }));
      },

      update(updater) {
        const config = { ...get() };
        updater(config);
        set(() => config);
      },
    }),
    {
      name: CONFIG_KEY,
    }
  )
);
