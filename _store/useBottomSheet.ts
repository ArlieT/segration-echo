//create bottom sheet controller

import BottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet";
import { create } from "zustand";

type BottomSheetController = {
  action: Function | null;
  close: Function | null;

  setAction: (f: Function) => void;
  setActionClose: (f: Function) => void;
};

const useBottomSheetController = create<BottomSheetController>((set) => ({
  action: null,
  setAction: (f: Function) => set({ action: f }),
  close: null,
  setActionClose: (f: Function) => set({ close: f }),
}));

export default useBottomSheetController;
