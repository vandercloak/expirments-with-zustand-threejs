import create, { State, StateCreator, StoreMutatorIdentifier } from "zustand";
import { immer } from "zustand/middleware/immer";
export function createImmerStore<
  T extends State,
  Mos extends [StoreMutatorIdentifier, unknown][] = []
>(initializer: StateCreator<T, [...Mos, ["zustand/immer", never]]>) {
  return create<T, Mos>(immer<T, Mos>(initializer) as any);
}
