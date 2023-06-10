import { downloadAs } from 'renderer/utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DEFAULT_CONFIG {
  bookSources: BookSource[];
  currentIndex: number;
}

export type SourceConfigStore = DEFAULT_CONFIG & {
  newSource: (source: BookSource) => void;
  deleteSource: (sourceName: string) => Message;
  current: () => BookSource;
  export: () => Message;
};

const CONFIG_KEY = 'app-source';

export const useBookSourceStore = create<SourceConfigStore>()(
  persist(
    (set, get) => ({
      bookSources: [] as BookSource[],
      currentIndex: 0,

      current() {
        return get().bookSources[get().currentIndex];
      },

      clearSource() {
        set(() => ({
          bookSources: [] as BookSource[],
        }));
      },

      newSource(source: BookSource) {
        set((state) => ({
          bookSources: [source].concat(state.bookSources),
        }));
      },

      deleteSource(sourceName: string) {
        const index = get().bookSources.findIndex(
          (item) => item.SourceName == sourceName
        );

        if (index == -1) return { message: 'faild', state: false };

        set((state) => ({
          bookSources: state.bookSources.filter((_, i) => i !== index),
        }));
        return { state: true, message: 'success' };
      },

      export() {
        downloadAs(JSON.stringify(get().bookSources), 'BookSource.json');
        return {
          state: true,
          message: 'success',
        };
      },

      import(){

      }
    }),
    {
      name: CONFIG_KEY,
    }
  )
);
