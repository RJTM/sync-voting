import create from "zustand";
import { middleware } from "@liveblocks/zustand";
import { client } from "./liveblocks.config";

interface ScoreState {
  score: number;
  name: string;
  shouldReveal: boolean;
  hasVoted: boolean;
  setScore: (score: number) => void;
  setName: (name: string) => void;
  reveal: () => void;
}

const useStore = create(
  middleware(
    (set) => ({
      score: undefined,
      name: "",
      shouldReveal: false,
      hasVoted: false,
      setScore: (score: number) => set({ score, hasVoted: true }),
      setName: (name: string) => set({ name }),
      reveal: () => set({ shouldReveal: true }),
      reset: () =>
        set({ score: undefined, shouldReveal: false, hasVoted: false }),
    }),
    {
      client,
      presenceMapping: { score: true, name: true, hasVoted: true },
      storageMapping: { shouldReveal: true },
    }
  )
);

export default useStore;
