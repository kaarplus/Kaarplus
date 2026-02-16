"use client";

import { ListingDetailed } from "@/types/listing";
import { VehicleCard } from "@/components/shared/vehicle-card";
import { Skeleton } from "@/components/ui/skeleton";
import { VehicleSummary } from "@/types/vehicle";

interface ListingGridProps {
    listings: ListingDetailed[];
    isLoading?: boolean;
}

export function ListingGrid({ listings, isLoading = false }: ListingGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="h-48 w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => {
                // Transform ListingDetailed to VehicleSummary for VehicleCard
                const summary: VehicleSummary = {
                    ...listing,
                    thumbnailUrl: listing.images[0]?.url || "",
                    user: {
                        name: listing.user.name,
                        role: listing.user.role as any, // Cast to any to satisfy stricter VehicleSummary type if needed
                        dealershipId: listing.user.dealershipId
                    }
                };

                return <VehicleCard key={listing.id} vehicle={summary} />;
            })}
        </div>
    );
}
