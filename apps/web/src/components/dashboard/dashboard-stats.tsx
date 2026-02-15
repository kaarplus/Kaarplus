"use client";

import { List, Eye, Heart, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";

interface DashboardStatsData {
  activeListings: number;
  totalViews: number;
  totalFavorites: number;
  totalMessages: number;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  iconBgClass: string;
  iconColorClass: string;
  trend?: { value: number; isPositive: boolean };
}

function StatCard({
  title,
  value,
  icon: Icon,
  iconBgClass,
  iconColorClass,
  trend,
}: StatCardProps) {
  return (
    <Card className="flex items-center gap-4 rounded-xl border p-6">
      <div
        className={`flex size-12 flex-shrink-0 items-center justify-center rounded-full ${iconBgClass}`}
      >
        <Icon className={`size-6 ${iconColorClass}`} />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold tabular-nums text-foreground">
          {formatNumber(value)}
        </p>
        {trend && (
          <p
            className={`text-xs font-medium ${
              trend.isPositive ? "text-green-600" : "text-red-500"
            }`}
          >
            {trend.isPositive ? "+" : ""}
            {trend.value}% sellel kuul
          </p>
        )}
      </div>
    </Card>
  );
}

interface DashboardStatsProps {
  stats: DashboardStatsData;
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  const cards: StatCardProps[] = [
    {
      title: "Aktiivsed kuulutused",
      value: stats.activeListings,
      icon: List,
      iconBgClass: "bg-primary/10",
      iconColorClass: "text-primary",
    },
    {
      title: "Vaatamisi kokku",
      value: stats.totalViews,
      icon: Eye,
      iconBgClass: "bg-blue-50",
      iconColorClass: "text-blue-500",
    },
    {
      title: "Lemmikutesse lisatud",
      value: stats.totalFavorites,
      icon: Heart,
      iconBgClass: "bg-amber-50",
      iconColorClass: "text-amber-500",
    },
    {
      title: "Sõnumid",
      value: stats.totalMessages,
      icon: MessageCircle,
      iconBgClass: "bg-slate-100",
      iconColorClass: "text-slate-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
