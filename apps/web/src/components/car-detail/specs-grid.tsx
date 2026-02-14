"use client";

import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { et } from "date-fns/locale";

interface SpecsGridProps {
    listing: {
        id: string;
        year: number;
        mileage: number;
        fuelType: string;
        transmission: string;
        powerKw: number;
        bodyType: string;
        driveType?: string | null;
        doors?: number | null;
        seats?: number | null;
        colorExterior: string;
        colorInterior?: string | null;
        condition: string;
        vin?: string | null;
        registrationDate?: string | null;
        createdAt: string;
    };
}

export function SpecsGrid({ listing }: SpecsGridProps) {
    const specItems = [
        { label: "Seisukord", value: listing.condition },
        { label: "Esmaregistreerimine", value: listing.year.toString() },
        { label: "Läbisõit", value: `${listing.mileage.toLocaleString("et-EE")} km` },
        { label: "Mootor", value: listing.fuelType },
        { label: "Võimsus", value: `${listing.powerKw} kW (${Math.round(listing.powerKw * 1.341)} hj)` },
        { label: "Käigukast", value: listing.transmission },
        { label: "Vedu", value: listing.driveType || "Esivedu" },
        { label: "Keretüüp", value: listing.bodyType },
        { label: "Uksi / Kohti", value: `${listing.doors || "—"} / ${listing.seats || "—"}` },
        { label: "Välisvärv", value: listing.colorExterior },
        { label: "Sisevärv", value: listing.colorInterior || "—" },
        { label: "VIN-kood", value: listing.vin || "Määramata", isUppercase: true },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                {specItems.map((item, index) => (
                    <div key={index} className="flex justify-between py-3.5 border-b border-border/50 last:border-0 md:last:border-b">
                        <span className="text-muted-foreground text-sm font-medium">{item.label}</span>
                        <span className={`font-semibold text-slate-800 ${item.isUppercase ? 'uppercase' : ''}`}>
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-6 text-xs text-muted-foreground pt-2">
                <span>Kuulutus lisatud: {format(new Date(listing.createdAt), "dd. MMMM yyyy", { locale: et })}</span>
                <span>ID: {listing.id?.substring(0, 8).toUpperCase()}</span>
            </div>
        </div>
    );
}
