import { create } from "zustand";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface FavoritesStore {
    favoriteIds: Set<string>;
    isLoaded: boolean;
    toggleFavorite: (listingId: string) => Promise<void>;
    loadFavorites: () => Promise<void>;
    isFavorite: (listingId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
    favoriteIds: new Set<string>(),
    isLoaded: false,

    loadFavorites: async () => {
        try {
            const response = await fetch(`${API_URL}/api/user/favorites/ids`, {
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Failed to load favorites");
            }

            const json = await response.json();
            const ids: string[] = json.data ?? [];

            set({ favoriteIds: new Set(ids), isLoaded: true });
        } catch (error) {
            console.error("Failed to load favorites:", error);
            set({ isLoaded: true });
        }
    },

    toggleFavorite: async (listingId: string) => {
        const { favoriteIds } = get();
        const wasFavorited = favoriteIds.has(listingId);

        // Optimistic update
        const nextIds = new Set(favoriteIds);
        if (wasFavorited) {
            nextIds.delete(listingId);
        } else {
            nextIds.add(listingId);
        }
        set({ favoriteIds: nextIds });

        try {
            const response = await fetch(`${API_URL}/api/user/favorites/${listingId}`, {
                method: wasFavorited ? "DELETE" : "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to toggle favorite");
            }
        } catch (error) {
            // Revert optimistic update on failure
            console.error("Failed to toggle favorite:", error);
            const revertedIds = new Set(get().favoriteIds);
            if (wasFavorited) {
                revertedIds.add(listingId);
            } else {
                revertedIds.delete(listingId);
            }
            set({ favoriteIds: revertedIds });
        }
    },

    isFavorite: (listingId: string) => {
        return get().favoriteIds.has(listingId);
    },
}));
