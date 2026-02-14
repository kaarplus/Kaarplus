"use client";

import { create } from "zustand";

interface FilterState {
  make: string | null;
  model: string | null;
  yearMin: number | null;
  yearMax: number | null;
  priceMin: number | null;
  priceMax: number | null;
  fuelType: string[];
  transmission: string | null;
  bodyType: string | null;
  color: string | null;
  query: string;
  sort: "newest" | "oldest" | "price_asc" | "price_desc";
  page: number;
}

interface FilterActions {
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
}

const initialState: FilterState = {
  make: null,
  model: null,
  yearMin: null,
  yearMax: null,
  priceMin: null,
  priceMax: null,
  fuelType: [],
  transmission: null,
  bodyType: null,
  color: null,
  query: "",
  sort: "newest",
  page: 1,
};

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...initialState,
  setFilter: (key, value) => set({ [key]: value, page: 1 }),
  resetFilters: () => set(initialState),
  setPage: (page) => set({ page }),
}));
