"use client";

import Image from "next/image";
import { Star, MapPin, ShieldCheck, Mail, Phone, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SellerInfoProps {
    seller: {
        id: string;
        name: string | null;
        phone: string | null;
        email: string;
        role: string;
        dealershipId?: string | null;
    };
    location: string;
}

export function SellerInfo({ seller, location }: SellerInfoProps) {
    const isDealership = seller.role === "DEALERSHIP";

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Müüja info</h3>

            <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14 ring-2 ring-primary/20">
                    <AvatarImage src={`https://randomuser.me/api/portraits/${seller.id.length % 2 === 0 ? 'men' : 'women'}/${seller.id.length % 99}.jpg`} />
                    <AvatarFallback>{seller.name?.substring(0, 2).toUpperCase() || "MÜ"}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-bold text-lg leading-tight">{seller.name || "Erakasutaja"}</div>
                    <div className="flex items-center gap-1 mt-1">
                        <div className="flex text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={i} size={14} className={i < 4 ? "fill-current" : i < 4.5 ? "fill-current opacity-50" : ""} />
                            ))}
                        </div>
                        <span className="text-xs font-semibold text-muted-foreground ml-1">(4.8/5)</span>
                    </div>
                </div>
            </div>

            <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <ShieldCheck size={16} className="text-primary" />
                    <span>Kontrollitud müüja alates 2021</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <MapPin size={16} className="text-primary" />
                    <span>{location}, Eesti</span>
                </div>
                {seller.phone && (
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Phone size={16} className="text-primary" />
                        <span>{seller.phone}</span>
                    </div>
                )}
            </div>

            <Button variant="secondary" className="w-full gap-2 font-bold h-11 bg-muted/50 hover:bg-muted">
                Vaata teisi kuulutusi (12) <ChevronRight size={16} />
            </Button>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                <div className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-help" title="Tasuta ajaloo kontroll">
                    <ShieldCheck size={28} className="text-slate-700" />
                    <span className="text-[9px] font-extrabold uppercase text-center">Ajalugu</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-help" title="7-päevane tagastusõigus">
                    <Star size={28} className="text-slate-700" />
                    <span className="text-[9px] font-extrabold uppercase text-center">Garantii</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity cursor-help" title="Professionaalselt kontrollitud">
                    <MapPin size={28} className="text-slate-700" />
                    <span className="text-[9px] font-extrabold uppercase text-center">Kontrollitud</span>
                </div>
            </div>
        </div>
    );
}
