"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFilterStore } from "@/store/use-filter-store";

const sortOptions = [
    { value: "newest", label: "Uuemad eespool" },
    { value: "oldest", label: "Vanemad eespool" },
    { value: "price_asc", label: "Odavamad eespool" },
    { value: "price_desc", label: "Kallimad eespool" },
];

export function SortControls() {
    const { sort, setFilter } = useFilterStore();

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap hidden sm:inline">Sorteeri:</span>
            <Select value={sort} onValueChange={(val) => setFilter("sort", val)}>
                <SelectTrigger className="w-[180px] h-9 text-sm font-medium">
                    <SelectValue placeholder="Sorteeri" />
                </SelectTrigger>
                <SelectContent>
                    {sortOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
