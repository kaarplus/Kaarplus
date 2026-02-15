import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Kasutustingimused",
    description: "Kaarplus platvormi kasutustingimused — reeglid ja kohustused platvormi kasutamisel.",
};

export default function TermsPage() {
    return (
        <article className="prose prose-slate max-w-none">
            <h1>Kasutustingimused</h1>
            <p className="text-muted-foreground text-lg">
                Kehtiv alates: 1. jaanuar 2026
            </p>

            <Separator className="my-6" />

            <section>
                <h2>1. Teenuse kirjeldus</h2>
                <p>
                    Kaarplus on veebiplatvorm, mis võimaldab eraisikutel ja ettevõtetel
                    müüa ning osta sõidukeid Eestis. Platvorm pakub kuulutuste avaldamise,
                    otsingu ja suhtlusvahendeid.
                </p>
            </section>

            <section>
                <h2>2. Kasutajaks registreerumine</h2>
                <ul>
                    <li>Registreeruda saavad vähemalt 18-aastased isikud</li>
                    <li>Esitatud andmed peavad olema tõesed ja ajakohased</li>
                    <li>Iga isik tohib omada ühte kontot</li>
                    <li>Vastutate oma konto turvalisuse eest</li>
                </ul>
            </section>

            <section>
                <h2>3. Kuulutuste reeglid</h2>
                <ul>
                    <li>Kuulutus peab kirjeldama tegelikku sõidukit</li>
                    <li>Fotod peavad olema autentsed ja hiljuti tehtud</li>
                    <li>Hinnad kuvatakse eurodes (EUR), KM-ga/KM-ta</li>
                    <li>Eraisikud: kuni 5 aktiivset kuulutust</li>
                    <li>Kõik kuulutused läbivad manuaalse kontrolli enne avaldamist</li>
                    <li>Keelatud on pettus, eksitav info ja ebaseaduslik tegevus</li>
                </ul>
            </section>

            <section>
                <h2>4. Maksed</h2>
                <p>
                    Makseid töötleb Stripe. Kaarplus ei salvesta kaardiandmeid.
                    Kõik tehingud toimuvad eurodes. Tagastamised toimuvad vastavalt
                    konkreetse teenuse tingimustele.
                </p>
            </section>

            <section>
                <h2>5. Vastutuse piirangud</h2>
                <p>
                    Kaarplus on vahendusplatvorm ega ole ostu-müügi lepingu osapool.
                    Me ei vastuta sõiduki seisukorra, müüja aususe ega tehingu tulemuse eest.
                    Soovitame alati sõidukit enne ostu kontrollida.
                </p>
            </section>

            <section>
                <h2>6. Konto lõpetamine</h2>
                <p>
                    Saate oma konto igal ajal kustutada seadete alt. Jätame endale õiguse
                    peatada või sulgeda kontosid, mis rikuvad kasutustingimusi.
                </p>
            </section>

            <section>
                <h2>7. Kontakt</h2>
                <p>
                    Küsimuste korral:{" "}
                    <a href="mailto:info@kaarplus.ee" className="text-primary hover:underline">
                        info@kaarplus.ee
                    </a>
                </p>
            </section>
        </article>
    );
}
