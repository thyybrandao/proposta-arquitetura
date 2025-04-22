import { create } from "zustand";

interface MediatorState {
  words: string[];
  add: (word: string) => void;
  remove: (word: string) => void;
}

export const useMediatorStore = create<MediatorState>()((set) => ({
  words: [],
  add: (word) => set(({ words }) => ({ words: [...words, word] })),
  remove: (word: string) =>
    set(({ words }) => ({ words: words.filter((w) => w !== word) })),
  clear: () => set(() => ({ words: [] })),
}));
