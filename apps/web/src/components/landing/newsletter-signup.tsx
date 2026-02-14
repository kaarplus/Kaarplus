"use client";

import { useToast } from "@/hooks/use-toast";

export function NewsletterSignup() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        // Simulate API call
        console.log("Newsletter signup:", email);

        toast({
            title: "Tellitud!",
            description: "Olete liitunud meie uudiskirjaga.",
        });

        e.currentTarget.reset();
    };

    return (
        <div className="bg-primary/5 py-16">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">
                        Liituge meie uudiskirjaga
                    </h2>
                    <p className="text-muted-foreground md:text-lg">
                        Saa esimesena teada parimatest pakkumistest ja uutest autodest.
                    </p>
                    <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center space-x-2">
                        <input
                            type="email"
                            name="email"
                            placeholder="Sisestage oma e-post"
                            required
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            Liitu
                        </button>
                    </form>
                    <p className="text-xs text-muted-foreground">
                        Liitudes nõustute meie <a href="/privacy" className="underline underline-offset-2">privaatsuspoliitikaga</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}
