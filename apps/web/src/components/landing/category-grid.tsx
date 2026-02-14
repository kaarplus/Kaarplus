import { CarFront, Truck, Bus, Zap } from "lucide-react";
import Link from "next/link";

export function CategoryGrid() {
    const categories = [
        { name: "Sedan", icon: CarFront, href: "/listings?bodyType=Sedan" },
        { name: "Hatchback", icon: CarFront, href: "/listings?bodyType=Hatchback" },
        { name: "SUV", icon: Truck, href: "/listings?bodyType=SUV" },
        { name: "Coupe", icon: CarFront, href: "/listings?bodyType=Coupe" },
        { name: "Convertible", icon: CarFront, href: "/listings?bodyType=Convertible" },
        { name: "Electric", icon: Zap, href: "/listings?fuelType=Electric" },
        { name: "Hybrid", icon: Zap, href: "/listings?fuelType=Hybrid" },
        { name: "Commercial", icon: Bus, href: "/listings?bodyType=Van" },
    ];

    return (
        <section className="container py-16 px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Sirvi kategooriate kaupa</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map((cat, index) => (
                    <Link
                        key={index}
                        href={cat.href}
                        className="flex flex-col items-center justify-center p-6 bg-card hover:bg-muted/50 transition-colors border rounded-lg gap-2 group"
                    >
                        <cat.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
