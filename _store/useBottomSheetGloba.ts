import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { RefObject } from "react";
import { create } from "zustand";

type States = {
  bottomSheetRef: RefObject<BottomSheet> | null;
  setBottomSheet: (bottomSheet: RefObject<BottomSheet>) => void;
  snapeIndex: number;
  setSnapeIndex: (index: number) => void;
};
const useBottomSheetGlobal = create<States>((set) => ({
  bottomSheetRef: null,
  snapeIndex: -1,
  setSnapeIndex: (index: number) => set({ snapeIndex: index }),
  setBottomSheet: (bottomSheetRef: RefObject<BottomSheetMethods>) =>
    set({ bottomSheetRef }),
}));

export default useBottomSheetGlobal;
