"use client";

import { CheckCircle, XCircle } from "lucide-react";
import { cn, formatNumber, formatPrice } from "@/lib/utils";
import { CompareVehicle } from "@/store/use-compare-store";

interface ComparisonTableProps {
    vehicles: CompareVehicle[];
    showDifferencesOnly: boolean;
}

interface SpecRow {
    label: string;
    key: string;
    getValue: (v: CompareVehicle) => string | number | boolean | undefined;
    format?: "number" | "price" | "boolean" | "power" | "text";
}

const specSections: { title: string; rows: SpecRow[] }[] = [
    {
        title: "Põhiandmed",
        rows: [
            { label: "Keretüüp", key: "bodyType", getValue: (v) => v.bodyType },
            { label: "Kütuse liik", key: "fuelType", getValue: (v) => v.fuelType },
            { label: "Käigukast", key: "transmission", getValue: (v) => v.transmission },
            { label: "Vedav sild", key: "driveType", getValue: (v) => v.driveType },
            { label: "Uste arv", key: "doors", getValue: (v) => v.doors, format: "number" },
            { label: "Istekohti", key: "seats", getValue: (v) => v.seats, format: "number" },
            { label: "Seisukord", key: "condition", getValue: (v) => v.condition },
        ],
    },
    {
        title: "Jõudlus ja andmed",
        rows: [
            { label: "Võimsus", key: "powerKw", getValue: (v) => v.powerKw, format: "power" },
            { label: "Läbisõit", key: "mileage", getValue: (v) => v.mileage, format: "number" },
            { label: "Hind", key: "price", getValue: (v) => v.price, format: "price" },
            { label: "Aasta", key: "year", getValue: (v) => v.year },
        ],
    },
    {
        title: "Välimus",
        rows: [
            { label: "Värvus (väline)", key: "colorExterior", getValue: (v) => v.colorExterior },
            { label: "Värvus (sisemine)", key: "colorInterior", getValue: (v) => v.colorInterior },
            { label: "Asukoht", key: "location", getValue: (v) => v.location },
        ],
    },
];

function getFeatureKeys(vehicles: CompareVehicle[]): string[] {
    const keys = new Set<string>();
    vehicles.forEach((v) => {
        if (v.features && typeof v.features === "object") {
            Object.keys(v.features).forEach((k) => keys.add(k));
        }
    });
    return Array.from(keys).sort();
}

function formatValue(
    value: string | number | boolean | undefined,
    format?: string
): string {
    if (value === undefined || value === null || value === "") return "—";

    switch (format) {
        case "number":
            return typeof value === "number" ? formatNumber(value) : String(value);
        case "price":
            return typeof value === "number" ? formatPrice(value) : String(value);
        case "power":
            return typeof value === "number"
                ? `${value} kW (${Math.round(value * 1.341)} hj)`
                : String(value);
        case "boolean":
            return ""; // handled by icon rendering
        default:
            return String(value);
    }
}

function hasDifference(
    vehicles: CompareVehicle[],
    getValue: (v: CompareVehicle) => string | number | boolean | undefined
): boolean {
    if (vehicles.length < 2) return false;
    const values = vehicles.map(getValue).map(String);
    return new Set(values).size > 1;
}

export function ComparisonTable({ vehicles, showDifferencesOnly }: ComparisonTableProps) {
    const emptySlots = 4 - vehicles.length;
    const featureKeys = getFeatureKeys(vehicles);

    return (
        <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px]">
                    <tbody>
                        {specSections.map((section) => {
                            const visibleRows = showDifferencesOnly
                                ? section.rows.filter((row) =>
                                      hasDifference(vehicles, row.getValue)
                                  )
                                : section.rows;

                            if (visibleRows.length === 0) return null;

                            return (
                                <SectionBlock
                                    key={section.title}
                                    title={section.title}
                                    rows={visibleRows}
                                    vehicles={vehicles}
                                    emptySlots={emptySlots}
                                    showDifferencesOnly={showDifferencesOnly}
                                />
                            );
                        })}

                        {/* Features section */}
                        {featureKeys.length > 0 && (
                            <>
                                <tr className="bg-muted/50 border-y border-border">
                                    <td
                                        className="py-3 px-6 text-sm font-bold text-foreground uppercase tracking-wider"
                                        colSpan={vehicles.length + 1 + emptySlots}
                                    >
                                        Varustus
                                    </td>
                                </tr>
                                {featureKeys
                                    .filter((key) => {
                                        if (!showDifferencesOnly) return true;
                                        const vals = vehicles.map((v) =>
                                            v.features?.[key] !== undefined
                                                ? String(v.features[key])
                                                : "—"
                                        );
                                        return new Set(vals).size > 1;
                                    })
                                    .map((key) => {
                                        const isDiff =
                                            vehicles.length >= 2 &&
                                            new Set(
                                                vehicles.map((v) =>
                                                    v.features?.[key] !== undefined
                                                        ? String(v.features[key])
                                                        : "—"
                                                )
                                            ).size > 1;

                                        return (
                                            <tr
                                                key={key}
                                                className={cn(
                                                    "border-b border-border/50 hover:bg-muted/30 transition-colors",
                                                    isDiff && "bg-yellow-50"
                                                )}
                                            >
                                                <td className="sticky left-0 py-4 px-6 text-sm font-medium text-muted-foreground bg-card w-[240px]">
                                                    {key}
                                                </td>
                                                {vehicles.map((v) => {
                                                    const val = v.features?.[key];
                                                    const isBool = typeof val === "boolean";

                                                    return (
                                                        <td
                                                            key={v.id}
                                                            className="py-4 px-6 text-sm text-foreground"
                                                        >
                                                            {isBool ? (
                                                                val ? (
                                                                    <CheckCircle
                                                                        size={20}
                                                                        className="text-primary"
                                                                    />
                                                                ) : (
                                                                    <XCircle
                                                                        size={20}
                                                                        className="text-muted-foreground/30"
                                                                    />
                                                                )
                                                            ) : val !== undefined ? (
                                                                String(val)
                                                            ) : (
                                                                <span className="text-muted-foreground italic">
                                                                    —
                                                                </span>
                                                            )}
                                                        </td>
                                                    );
                                                })}
                                                {Array.from({ length: emptySlots }).map((_, i) => (
                                                    <td
                                                        key={`empty-${i}`}
                                                        className="py-4 px-6 text-sm text-muted-foreground italic"
                                                    >
                                                        —
                                                    </td>
                                                ))}
                                            </tr>
                                        );
                                    })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function SectionBlock({
    title,
    rows,
    vehicles,
    emptySlots,
    showDifferencesOnly,
}: {
    title: string;
    rows: SpecRow[];
    vehicles: CompareVehicle[];
    emptySlots: number;
    showDifferencesOnly: boolean;
}) {
    return (
        <>
            <tr className="bg-muted/50 border-y border-border">
                <td
                    className="py-3 px-6 text-sm font-bold text-foreground uppercase tracking-wider"
                    colSpan={vehicles.length + 1 + emptySlots}
                >
                    {title}
                </td>
            </tr>
            {rows.map((row) => {
                const isDiff = hasDifference(vehicles, row.getValue);

                return (
                    <tr
                        key={row.key}
                        className={cn(
                            "border-b border-border/50 hover:bg-muted/30 transition-colors",
                            isDiff && showDifferencesOnly && "bg-yellow-50"
                        )}
                    >
                        <td className="sticky left-0 py-4 px-6 text-sm font-medium text-muted-foreground bg-card w-[240px] z-10">
                            {row.label}
                        </td>
                        {vehicles.map((v) => {
                            const value = row.getValue(v);
                            const formatted = formatValue(value, row.format);
                            const isBoolean = row.format === "boolean";

                            return (
                                <td
                                    key={v.id}
                                    className={cn(
                                        "py-4 px-6 text-sm text-foreground",
                                        (row.format === "number" ||
                                            row.format === "price" ||
                                            row.format === "power") &&
                                            "tabular-nums"
                                    )}
                                >
                                    {isBoolean ? (
                                        value ? (
                                            <CheckCircle
                                                size={20}
                                                className="text-primary"
                                            />
                                        ) : (
                                            <XCircle
                                                size={20}
                                                className="text-muted-foreground/30"
                                            />
                                        )
                                    ) : formatted === "—" ? (
                                        <span className="text-muted-foreground italic">—</span>
                                    ) : (
                                        formatted
                                    )}
                                </td>
                            );
                        })}
                        {Array.from({ length: emptySlots }).map((_, i) => (
                            <td
                                key={`empty-${i}`}
                                className="py-4 px-6 text-sm text-muted-foreground italic"
                            >
                                —
                            </td>
                        ))}
                    </tr>
                );
            })}
        </>
    );
}
