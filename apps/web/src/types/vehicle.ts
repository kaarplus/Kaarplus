export interface VehicleSummary {
    id: string;
    make: string;
    model: string;
    variant?: string;
    year: number;
    price: number;
    includeVat: boolean;
    mileage: number;
    fuelType: string;
    transmission: string;
    power?: string;
    bodyType: string;
    thumbnailUrl: string;
    status: "ACTIVE" | "PENDING" | "SOLD" | "REJECTED" | "EXPIRED";
    badges?: Array<"new" | "hot_deal" | "certified" | "verified">;
    isFavorited?: boolean;
    createdAt: string;
}
