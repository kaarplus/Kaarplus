import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Car } from "lucide-react";

export const metadata: Metadata = {
    title: "Ametlikud Esindused | Kaarplus",
    description: "Leia usaldusväärsed autoesindused ja partnerid.",
};

async function getDealerships() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dealerships`, {
            next: { revalidate: 3600 },
        });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data;
    } catch (error) {
        console.error("Failed to fetch dealerships:", error);
        return [];
    }
}

export default async function DealershipsPage() {
    const dealerships = await getDealerships();

    return (
        <div className="container py-12">
            <div className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Ametlikud Esindused</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    Tutvu meie usaldusväärsete koostööpartneritega. Kõik esindused on kontrollitud ja pakuvad kvaliteetseid sõidukeid.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dealerships.map((dealer: any) => (
                    <Card key={dealer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 relative bg-muted">
                            {dealer.coverImage ? (
                                <Image
                                    src={dealer.coverImage}
                                    alt={dealer.name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                                    <Car className="h-16 w-16 text-slate-300" />
                                </div>
                            )}
                            <div className="absolute -bottom-8 left-6">
                                <div className="h-16 w-16 rounded-full border-4 border-background bg-background overflow-hidden shadow-sm relative">
                                    {dealer.image ? (
                                        <Image
                                            src={dealer.image}
                                            alt={dealer.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                                            {dealer.name?.charAt(0) || "D"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <CardHeader className="pt-10 pb-2">
                            <h2 className="text-xl font-bold">{dealer.name}</h2>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin size={14} />
                                <span>{dealer.address || "Asukoht määramata"}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {dealer.bio || "Kirjeldus puudub."}
                            </p>
                        </CardContent>
                        <CardFooter className="border-t bg-muted/20 p-4">
                            <div className="flex items-center justify-between w-full">
                                <span className="text-sm font-medium">
                                    {dealer._count?.listings || 0} aktiivset kuulutust
                                </span>
                                <Button size="sm" variant="secondary" asChild>
                                    <Link href={`/dealers/${dealer.id}`}>
                                        Vaata esindust
                                    </Link>
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {dealerships.length === 0 && (
                <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                    <p className="text-muted-foreground">Hetkel ei ole ühtegi esindust registreeritud.</p>
                </div>
            )}
        </div>
    );
}
