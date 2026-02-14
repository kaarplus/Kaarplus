import { cn } from "@/lib/utils";
import { Gauge, Fuel, Settings2, Zap, Calendar } from "lucide-react";

interface SpecIconsProps {
    mileage?: number;
    fuelType?: string;
    transmission?: string;
    year?: number;
    power?: string;
    compact?: boolean;
    className?: string;
}

export function SpecIcons({
    mileage,
    fuelType,
    transmission,
    year,
    power,
    compact = false,
    className,
}: SpecIconsProps) {
    // Use formatNumber or locale string for mileage
    const formattedMileage = mileage ? new Intl.NumberFormat("et-EE").format(mileage) + " km" : null;

    return (
        <div className={cn("flex flex-wrap gap-x-4 gap-y-2 text-sm text-foreground", className)}>
            {year && (
                <div className="flex items-center gap-1.5" title="Year">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>{year}</span>
                </div>
            )}
            {mileage && (
                <div className="flex items-center gap-1.5" title="Mileage">
                    <Gauge size={16} className="text-muted-foreground" />
                    <span>{formattedMileage}</span>
                </div>
            )}
            {fuelType && (
                <div className="flex items-center gap-1.5" title="Fuel Type">
                    <Fuel size={16} className="text-muted-foreground" />
                    <span>{fuelType}</span>
                </div>
            )}
            {transmission && (
                <div className="flex items-center gap-1.5" title="Transmission">
                    <Settings2 size={16} className="text-muted-foreground" />
                    <span>{transmission}</span>
                </div>
            )}
            {power && !compact && (
                <div className="flex items-center gap-1.5" title="Power">
                    <Zap size={16} className="text-muted-foreground" />
                    <span>{power}</span>
                </div>
            )}
        </div>
    );
}
