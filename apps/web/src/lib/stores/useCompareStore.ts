"use client";

import { create } from "zustand";

import { COMPARISON_MAX } from "../constants";

interface CompareState {
  selectedIds: string[];
}

interface CompareActions {
  toggleCompare: (listingId: string) => void;
  removeFromCompare: (listingId: string) => void;
  clearCompare: () => void;
  isSelected: (listingId: string) => boolean;
  canAdd: () => boolean;
}

export const useCompareStore = create<CompareState & CompareActions>((set, get) => ({
  selectedIds: [],
  toggleCompare: (listingId) =>
    set((state) => {
      if (state.selectedIds.includes(listingId)) {
        return { selectedIds: state.selectedIds.filter((id) => id !== listingId) };
      }
      if (state.selectedIds.length >= COMPARISON_MAX) {
        return state; // Don't add if at max
      }
      return { selectedIds: [...state.selectedIds, listingId] };
    }),
  removeFromCompare: (listingId) =>
    set((state) => ({
      selectedIds: state.selectedIds.filter((id) => id !== listingId),
    })),
  clearCompare: () => set({ selectedIds: [] }),
  isSelected: (listingId) => get().selectedIds.includes(listingId),
  canAdd: () => get().selectedIds.length < COMPARISON_MAX,
}));
