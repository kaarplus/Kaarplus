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
    const formattedMileage = mileage ? new Intl.NumberFormat("et-EE").format(mileage) + " km" : null;

    if (compact) {
        return (
            <div className={cn("flex items-center justify-between w-full text-center", className)}>
                {mileage && (
                    <div className="flex flex-col items-center gap-1">
                        <Gauge size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-700 leading-none">{formattedMileage}</span>
                    </div>
                )}
                {fuelType && (
                    <div className="flex flex-col items-center gap-1">
                        <Fuel size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-700 leading-none">{fuelType}</span>
                    </div>
                )}
                {transmission && (
                    <div className="flex flex-col items-center gap-1">
                        <Settings2 size={14} className="text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-700 leading-none">
                            {transmission.toLowerCase().includes("aut") ? "Auto" : "Käsits"}
                        </span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={cn("flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground", className)}>
            {year && (
                <div className="flex items-center gap-2" title="Year">
                    <Calendar size={16} className="text-slate-400" />
                    <span className="font-semibold">{year}</span>
                </div>
            )}
            {mileage && (
                <div className="flex items-center gap-2" title="Mileage">
                    <Gauge size={16} className="text-slate-400" />
                    <span className="font-semibold">{formattedMileage}</span>
                </div>
            )}
            {fuelType && (
                <div className="flex items-center gap-2" title="Fuel Type">
                    <Fuel size={16} className="text-slate-400" />
                    <span className="font-semibold">{fuelType}</span>
                </div>
            )}
            {transmission && (
                <div className="flex items-center gap-2" title="Transmission">
                    <Settings2 size={16} className="text-slate-400" />
                    <span className="font-semibold">{transmission}</span>
                </div>
            )}
            {power && (
                <div className="flex items-center gap-2" title="Power">
                    <Zap size={16} className="text-slate-400" />
                    <span className="font-semibold">{power}</span>
                </div>
            )}
        </div>
    );
}
