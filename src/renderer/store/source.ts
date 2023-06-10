import { downloadAs } from 'renderer/utils';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { sortBy, uniqBy } from 'lodash';

interface DEFAULT_CONFIG {
  bookSources: BookSource[];
  currentIndex: number;
}

export type SourceConfigStore = DEFAULT_CONFIG & {
  current: () => BookSource;
  clearSource: () => void;
  newSource: (source: BookSource) => void;
  deleteSource: (sourceName: string) => Message;
  getSourceByName: (sourcename: string) => BookSource | undefined;
  exportSource: () => Message;
  updateSource: (source: BookSource) => Message;
  importSource: (sources: BookSource[]) => Message;
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
          currentIndex: -1,
        }));
      },

      getSourceByName(sourcename: string) {
        return get().bookSources.find((item) => item.SourceName === sourcename);
      },

      updateSource(source: BookSource) {
        this.newSource(source);
        return {
          state: true,
          message: 'success',
        };
      },

      newSource(source: BookSource) {
        const uniqueSortedSources = sortBy(
          uniqBy([source].concat(get().bookSources), 'BaseUrl'),
          'Weight'
        );
        set((state) => ({
          bookSources: uniqueSortedSources,
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

      exportSource() {
        downloadAs(JSON.stringify(get().bookSources), 'BookSource.json');
        return {
          state: true,
          message: 'success',
        };
      },

      importSource(sources: BookSource[]) {
        console.log(sources);

        const uniqueSortedSources = sortBy(
          uniqBy(sources, 'BaseUrl'),
          'Weight'
        );

        set((state) => ({
          bookSources: uniqueSortedSources,
        }));

        return {
          state: true,
          message: 'hello',
        };
      },
    }),
    {
      name: CONFIG_KEY,
    }
  )
);
