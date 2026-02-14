import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
    rating: number; // 0 to 5
    count?: number; // Review count
    size?: "sm" | "md";
    showCount?: boolean;
}

export function StarRating({ rating, count, size = "md", showCount = true }: StarRatingProps) {
    const iconSize = size === "sm" ? 14 : 16;
    const textSize = size === "sm" ? "text-xs" : "text-sm";

    return (
        <div className="flex items-center gap-1">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={iconSize}
                        className={cn(
                            "fill-current",
                            star <= Math.round(rating) ? "text-yellow-400" : "text-gray-200"
                        )}
                        strokeWidth={0} // Filled style
                    />
                ))}
            </div>
            {showCount && count !== undefined && (
                <span className={cn("text-muted-foreground ml-1", textSize)}>
                    ({count})
                </span>
            )}
        </div>
    );
}
