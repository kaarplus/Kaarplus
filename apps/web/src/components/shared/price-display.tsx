import { cn, formatPrice } from "@/lib/utils";

interface PriceDisplayProps {
    price: number;
    includeVat?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}

export function PriceDisplay({
    price,
    includeVat = true,
    size = "md",
    className,
}: PriceDisplayProps) {
    const formatted = formatPrice(price, includeVat);
    // Split price and VAT indicator to style them differently if needed
    // formatPrice returns something like "20 000 € (km-ga)"

    // For now, simple implementation

    const sizeClasses = {
        sm: "text-lg",
        md: "text-xl",
        lg: "text-2xl md:text-3xl",
    };

    return (
        <div className={cn("font-bold text-primary tabular-nums", sizeClasses[size], className)}>
            {formatted}
        </div>
    );
}
