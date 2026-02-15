import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CompareVehicle {
    id: string;
    make: string;
    model: string;
    variant?: string;
    year: number;
    price: number;
    priceVatIncluded: boolean;
    mileage: number;
    fuelType: string;
    transmission: string;
    bodyType: string;
    powerKw: number;
    driveType?: string;
    doors?: number;
    seats?: number;
    colorExterior: string;
    colorInterior?: string;
    condition: string;
    location: string;
    features: Record<string, boolean | string>;
    imageUrl?: string;
}

interface CompareStore {
    vehicles: CompareVehicle[];
    addVehicle: (vehicle: CompareVehicle) => boolean;
    removeVehicle: (id: string) => void;
    clearAll: () => void;
    isInCompare: (id: string) => boolean;
    canAdd: () => boolean;
}

const MAX_COMPARE = 4;

export const useCompareStore = create<CompareStore>()(
    persist(
        (set, get) => ({
            vehicles: [],

            addVehicle: (vehicle) => {
                const state = get();
                if (state.vehicles.length >= MAX_COMPARE) return false;
                if (state.vehicles.some((v) => v.id === vehicle.id)) return false;
                set({ vehicles: [...state.vehicles, vehicle] });
                return true;
            },

            removeVehicle: (id) => {
                set((state) => ({
                    vehicles: state.vehicles.filter((v) => v.id !== id),
                }));
            },

            clearAll: () => set({ vehicles: [] }),

            isInCompare: (id) => {
                return get().vehicles.some((v) => v.id === id);
            },

            canAdd: () => {
                return get().vehicles.length < MAX_COMPARE;
            },
        }),
        {
            name: "kaarplus-compare",
        }
    )
);
