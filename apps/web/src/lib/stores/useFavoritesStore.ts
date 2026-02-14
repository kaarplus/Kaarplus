"use client";

import { create } from "zustand";

interface FavoritesState {
  favoriteIds: Set<string>;
  isLoaded: boolean;
}

interface FavoritesActions {
  toggleFavorite: (listingId: string) => void;
  setFavorites: (ids: string[]) => void;
  isFavorite: (listingId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState & FavoritesActions>((set, get) => ({
  favoriteIds: new Set(),
  isLoaded: false,
  toggleFavorite: (listingId) =>
    set((state) => {
      const newFavorites = new Set(state.favoriteIds);
      if (newFavorites.has(listingId)) {
        newFavorites.delete(listingId);
      } else {
        newFavorites.add(listingId);
      }
      return { favoriteIds: newFavorites };
    }),
  setFavorites: (ids) => set({ favoriteIds: new Set(ids), isLoaded: true }),
  isFavorite: (listingId) => get().favoriteIds.has(listingId),
}));
