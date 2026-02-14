"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isLoading?: boolean;
}

export function Pagination({ currentPage, totalPages, onPageChange, isLoading }: PaginationProps) {
    if (totalPages <= 1) return null;

    const renderPageButtons = () => {
        const pages = [];
        const showThreshold = 2; // Show 2 pages before and after current

        // Always show first page
        pages.push(
            <Button
                key={1}
                variant={currentPage === 1 ? "default" : "outline"}
                size="icon"
                className="w-10 h-10"
                onClick={() => onPageChange(1)}
                disabled={isLoading}
            >
                1
            </Button>
        );

        if (currentPage > showThreshold + 2) {
            pages.push(<MoreHorizontal key="dots-start" className="text-muted-foreground" />);
        }

        // Show pages around current
        for (
            let i = Math.max(2, currentPage - showThreshold);
            i <= Math.min(totalPages - 1, currentPage + showThreshold);
            i++
        ) {
            pages.push(
                <Button
                    key={i}
                    variant={currentPage === i ? "default" : "outline"}
                    size="icon"
                    className="w-10 h-10"
                    onClick={() => onPageChange(i)}
                    disabled={isLoading}
                >
                    {i}
                </Button>
            );
        }

        if (currentPage < totalPages - showThreshold - 1) {
            pages.push(<MoreHorizontal key="dots-end" className="text-muted-foreground" />);
        }

        // Always show last page
        if (totalPages > 1) {
            pages.push(
                <Button
                    key={totalPages}
                    variant={currentPage === totalPages ? "default" : "outline"}
                    size="icon"
                    className="w-10 h-10"
                    onClick={() => onPageChange(totalPages)}
                    disabled={isLoading}
                >
                    {totalPages}
                </Button>
            );
        }

        return pages;
    };

    return (
        <div className="flex items-center gap-2">
            <Button
                variant="outline"
                size="icon"
                className="w-10 h-10"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || isLoading}
            >
                <ChevronLeft size={20} />
            </Button>

            <div className="flex items-center gap-2">
                {renderPageButtons()}
            </div>

            <Button
                variant="outline"
                size="icon"
                className="w-10 h-10"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages || isLoading}
            >
                <ChevronRight size={20} />
            </Button>
        </div>
    );
}
