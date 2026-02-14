"use client";

import { useState, useEffect } from "react";
import { formatNumber } from "@/lib/utils";

const Counter = ({ end, label }: { end: number, label: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start > end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [end]);

    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-4xl md:text-5xl font-bold text-primary tabular-nums">
                {formatNumber(count)}+
            </span>
            <span className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wide">
                {label}
            </span>
        </div>
    );
};

export function StatisticsSection() {
    return (
        <section className="bg-secondary/30 py-16 border-y border-border/50">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    <Counter end={1200} label="Aktiivset Kuulutust" />
                    <Counter end={8500} label="Rahulolevat Klienti" />
                    <Counter end={150} label="Usaldusväärset Müllerit" />
                    <Counter end={45} label="Auto Marki" />
                </div>
            </div>
        </section>
    );
}
