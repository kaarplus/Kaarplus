"use client";

import { useFilterStore, FilterState } from "@/store/use-filter-store";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export function FilterBadges() {
    const filters = useFilterStore();

    const hasFilter =
        !!(filters.make ||
            filters.model ||
            filters.priceMin ||
            filters.priceMax ||
            filters.yearMin ||
            filters.yearMax ||
            filters.fuelType.length > 0 ||
            (filters.transmission && filters.transmission !== "all") ||
            filters.bodyType.length > 0 ||
            filters.q);

    if (!hasFilter) return null;

    const removeBadge = (key: keyof FilterState, value?: string) => {
        if (key === "fuelType" && value) {
            filters.toggleFuelType(value);
        } else if (key === "bodyType" && value) {
            filters.toggleBodyType(value);
        } else if (key === "transmission") {
            filters.setFilter("transmission", "all");
        } else if (key === "page") {
            filters.setPage(1);
        } else {
            // @ts-ignore
            filters.setFilter(key, "");
        }
    };

    return (
        <div className="flex flex-wrap items-center gap-2 mt-4">
            {filters.make && (
                <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-card border-border hover:bg-muted/80">
                    Mark: {filters.make}
                    <button onClick={() => removeBadge("make")}><X size={14} className="text-muted-foreground hover:text-destructive" /></button>
                </Badge>
            )}
            {filters.model && (
                <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-card border-border hover:bg-muted/80">
                    Mudel: {filters.model}
                    <button onClick={() => removeBadge("model")}><X size={14} className="text-muted-foreground hover:text-destructive" /></button>
                </Badge>
            )}
            {(filters.priceMin || filters.priceMax) && (
                <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-card border-border hover:bg-muted/80">
                    Hind: €{filters.priceMin || "0"} - €{filters.priceMax || "..."}
                    <button onClick={() => { removeBadge("priceMin"); removeBadge("priceMax"); }}><X size={14} className="text-muted-foreground hover:text-destructive" /></button>
                </Badge>
            )}
            {filters.fuelType.map((fuel) => (
                <Badge key={fuel} variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-card border-border hover:bg-muted/80">
                    Kütus: {fuel}
                    <button onClick={() => removeBadge("fuelType", fuel)}><X size={14} className="text-muted-foreground hover:text-destructive" /></button>
                </Badge>
            ))}
            {filters.transmission !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-card border-border hover:bg-muted/80">
                    Käigukast: {filters.transmission === "automatic" ? "Automaat" : "Manuaal"}
                    <button onClick={() => removeBadge("transmission")}><X size={14} className="text-muted-foreground hover:text-destructive" /></button>
                </Badge>
            )}
            {filters.bodyType.map((body) => (
                <Badge key={body} variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-card border-border hover:bg-muted/80">
                    Kere: {body}
                    <button onClick={() => removeBadge("bodyType", body)}><X size={14} className="text-muted-foreground hover:text-destructive" /></button>
                </Badge>
            ))}
            {filters.q && (
                <Badge variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-card border-border hover:bg-muted/80">
                    Otsing: &quot;{filters.q}&quot;
                    <button onClick={() => removeBadge("q")}><X size={14} className="text-muted-foreground hover:text-destructive" /></button>
                </Badge>
            )}

            <button
                onClick={filters.resetFilters}
                className="text-xs font-bold text-primary hover:underline ml-2"
            >
                Puhasta kõik
            </button>
        </div>
    );
}
