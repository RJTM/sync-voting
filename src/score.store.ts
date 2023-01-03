import { liveblocks, WithLiveblocks } from "@liveblocks/zustand";
import create from "zustand";
import { client } from "./liveblocks.config";

interface ScoreState {
  score?: number;
  name?: string;
  shouldReveal: boolean;
  hasVoted: boolean;
  setScore: (score: number) => void;
  setName: (name: string) => void;
  reveal: () => void;
  reset: () => void;
}

const useStore = create<
  WithLiveblocks<ScoreState, Pick<ScoreState, "score" | "name" | "hasVoted">>
>()(
  liveblocks(
    (set) => ({
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
