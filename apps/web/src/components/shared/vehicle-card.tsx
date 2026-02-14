import { VehicleSummary } from "@/types/vehicle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Maximize2, Camera } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PriceDisplay } from "@/components/shared/price-display";
import { SpecIcons } from "@/components/shared/spec-icons";
import { formatDistanceToNow } from "date-fns";
import { et } from "date-fns/locale";

interface VehicleCardProps {
    vehicle: VehicleSummary;
    variant?: "grid" | "list";
    showFavorite?: boolean;
}

export function VehicleCard({ vehicle, variant = "grid", showFavorite = true }: VehicleCardProps) {
    const isGrid = variant === "grid";

    // Mock relative time format if needed
    const timeAgo = formatDistanceToNow(new Date(vehicle.createdAt), { addSuffix: true, locale: et });

    return (
        <Card className={`group relative overflow-hidden flex ${isGrid ? "flex-col" : "flex-row"} h-full hover:shadow-lg transition-shadow duration-300`}>
            {/* Listing Status Badge */}
            {vehicle.status === "SOLD" && (
                <Badge variant="destructive" className="absolute top-3 left-3 z-10">Müüdud</Badge>
            )}
            {vehicle.status === "PENDING" && (
                <Badge variant="secondary" className="absolute top-3 left-3 z-10">Ootel</Badge>
            )}

            {/* Feature Badges */}
            <div className="absolute top-3 right-3 flex flex-col gap-1 z-10 items-end">
                {vehicle.badges?.map((badge) => (
                    <Badge key={badge} variant={badge === "hot_deal" ? "destructive" : "default"} className="uppercase text-[10px] py-0.5">
                        {badge.replace("_", " ")}
                    </Badge>
                ))}
            </div>

            {/* Image Container */}
            <div className={`relative ${isGrid ? "aspect-[4/3] w-full" : "w-[280px] shrink-0 aspect-[4/3]"} bg-gray-100`}>
                <Image
                    src={vehicle.thumbnailUrl}
                    alt={`${vehicle.make} ${vehicle.model}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Favorite Button Overlay */}
                {showFavorite && (
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-red-500"
                    // TODO: Connect to useFavoritesStore
                    >
                        <Heart size={18} className={vehicle.isFavorited ? "fill-red-500 text-red-500" : ""} />
                    </Button>
                )}
            </div>

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-4 gap-2">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-1">
                            <Link href={`/listing/${vehicle.id}`}>
                                {vehicle.make} {vehicle.model}
                            </Link>
                        </h3>
                        {vehicle.variant && (
                            <p className="text-sm text-muted-foreground line-clamp-1">{vehicle.variant}</p>
                        )}
                    </div>
                    {/* Price shown top right in list view, bottom in grid view perhaps? Or consistent? */}
                    {!isGrid && <PriceDisplay price={vehicle.price} includeVat={vehicle.includeVat} />}
                </div>

                {/* Specs */}
                <SpecIcons
                    mileage={vehicle.mileage}
                    fuelType={vehicle.fuelType}
                    transmission={vehicle.transmission}
                    year={vehicle.year}
                    power={vehicle.power}
                    compact={isGrid}
                    className="mt-1"
                />

                <div className="mt-auto pt-3 flex items-end justify-between border-t border-border/50">
                    {isGrid ? (
                        <PriceDisplay price={vehicle.price} includeVat={vehicle.includeVat} />
                    ) : (
                        <div className="text-xs text-muted-foreground">
                            Lisatud: {timeAgo}
                        </div>
                    )}

                    <div className="flex items-center gap-2">
                        {/* Example action buttons or location */}
                        <span className="text-xs text-muted-foreground">Tallinn</span>
                    </div>
                </div>
            </div>
        </Card>
    );
}
