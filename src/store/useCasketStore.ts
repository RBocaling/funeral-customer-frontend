import { create } from "zustand";
import {
  CasketPart,
  Material,
  CasketPartConfig,
  partConfigs,
} from "@/lib/constants";

interface CasketState {
  partConfigs: Record<CasketPart, CasketPartConfig>;
  isRotating: boolean;
  rotationSpeed: number;
  isCapOpen: boolean;

  // Actions
  setPartColor: (part: CasketPart, color: string) => void;
  setPartMaterial: (part: CasketPart, material: Material) => void;
  toggleRotation: () => void;
  setRotationSpeed: (speed: number) => void;
  getPartConfig: (part: CasketPart) => CasketPartConfig;
  setCapOpen: (open: boolean) => void;
  resetConfig: () => void;
}

export const useCasketStore = create<CasketState>((set, get) => ({
  // Initial state
  partConfigs: {
    [CasketPart.BODY]: { ...partConfigs[CasketPart.BODY] },
    [CasketPart.CAP]: { ...partConfigs[CasketPart.CAP] },
    [CasketPart.HANDLE]: { ...partConfigs[CasketPart.HANDLE] },
    [CasketPart.ENDCAP]: { ...partConfigs[CasketPart.ENDCAP] },
    [CasketPart.PILLOW]: { ...partConfigs[CasketPart.PILLOW] },
    [CasketPart.MOULDING]: { ...partConfigs[CasketPart.MOULDING] },
    [CasketPart.INTERIOR]: { ...partConfigs[CasketPart.INTERIOR] },
    [CasketPart.HARDWARE]: { ...partConfigs[CasketPart.HARDWARE] },
  },
  isRotating: false,
  rotationSpeed: 0.005,
  isCapOpen: false,

  // Actions
  setPartColor: (part, color) =>
    set((state) => ({
      partConfigs: {
        ...state.partConfigs,
        [part]: {
          ...state.partConfigs[part],
          color,
        },
      },
    })),

  setPartMaterial: (part, material) =>
    set((state) => ({
      partConfigs: {
        ...state.partConfigs,
        [part]: {
          ...state.partConfigs[part],
          material,
        },
      },
    })),

  toggleRotation: () =>
    set((state) => ({
      isRotating: !state.isRotating,
    })),

  setRotationSpeed: (speed) =>
    set({
      rotationSpeed: speed,
    }),

  getPartConfig: (part) => {
    return get().partConfigs[part];
  },

  setCapOpen: (open) =>
    set({
      isCapOpen: open,
    }),

  toggleCapOpen: () =>
    set((state) => ({
      isCapOpen: !state.isCapOpen,
    })),

  resetConfig: () =>
    set({
      partConfigs: {
        [CasketPart.BODY]: { ...partConfigs[CasketPart.BODY] },
        [CasketPart.CAP]: { ...partConfigs[CasketPart.CAP] },
        [CasketPart.HANDLE]: { ...partConfigs[CasketPart.HANDLE] },
        [CasketPart.ENDCAP]: { ...partConfigs[CasketPart.ENDCAP] },
        [CasketPart.PILLOW]: { ...partConfigs[CasketPart.PILLOW] },
        [CasketPart.MOULDING]: { ...partConfigs[CasketPart.MOULDING] },
        [CasketPart.INTERIOR]: { ...partConfigs[CasketPart.INTERIOR] },
        [CasketPart.HARDWARE]: { ...partConfigs[CasketPart.HARDWARE] },
      },
      isRotating: false,
      rotationSpeed: 0.005,
      isCapOpen: false,
    }),
}));
