import { ShieldCheck, Search, Banknote, Award } from "lucide-react";

export function ValuePropositions() {
    const features = [
        {
            icon: ShieldCheck,
            title: "Kontrollitud ajalugu",
            description: "Kõik sõidukid läbivad põhjaliku taustakontrolli.",
        },
        {
            icon: Banknote,
            title: "Turvaline tehing",
            description: "Maksa deposiiti alles siis, kui olete autoga rahul.",
        },
        {
            icon: Search,
            title: "Lihtne otsing",
            description: "Kasutage meie täpset filtrit unistuste auto leidmiseks.",
        },
        {
            icon: Award,
            title: "Usaldusväärsed müüjad",
            description: "Meie partnerid on sertifitseeritud ja kontrollitud.",
        },
    ];

    return (
        <section className="container py-24 px-4 md:px-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center space-y-4 text-center p-6 bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow">
                        <div className="p-3 bg-primary/10 rounded-full text-primary">
                            <feature.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
