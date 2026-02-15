import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Privaatsuspoliitika",
    description: "Kaarplus privaatsuspoliitika — kuidas me teie andmeid kogume, kasutame ja kaitseme.",
};

export default function PrivacyPage() {
    return (
        <article className="prose prose-slate max-w-none">
            <h1>Privaatsuspoliitika</h1>
            <p className="text-muted-foreground text-lg">
                Kehtiv alates: 1. jaanuar 2026
            </p>

            <Separator className="my-6" />

            <section>
                <h2>1. Üldinfo</h2>
                <p>
                    Kaarplus OÜ (&quot;meie&quot;, &quot;meid&quot;, &quot;Kaarplus&quot;) on pühendunud
                    teie privaatsuse kaitsmisele. See poliitika selgitab, kuidas me kogume,
                    kasutame, säilitame ja kaitseme teie isikuandmeid kooskõlas Euroopa Liidu
                    isikuandmete kaitse üldmäärusega (GDPR).
                </p>
            </section>

            <section>
                <h2>2. Andmete kogumine</h2>
                <p>Me kogume järgmisi andmeid:</p>
                <ul>
                    <li><strong>Registreerimisandmed:</strong> nimi, e-posti aadress, telefoninumber</li>
                    <li><strong>Kuulutuste andmed:</strong> sõiduki info, fotod, hind, asukoht</li>
                    <li><strong>Tehniline info:</strong> IP-aadress, brauseri tüüp, seadme andmed</li>
                    <li><strong>Küpsised:</strong> vajalikud, analüütilised ja turundusküpsised (teie nõusolekul)</li>
                </ul>
            </section>

            <section>
                <h2>3. Andmete kasutamine</h2>
                <p>Teie andmeid kasutatakse:</p>
                <ul>
                    <li>Konto loomiseks ja haldamiseks</li>
                    <li>Kuulutuste avaldamiseks ja haldamiseks</li>
                    <li>Ostja-müüja suhtluse võimaldamiseks</li>
                    <li>Platvormi parandamiseks ja analüüsimiseks</li>
                    <li>Õiguslike kohustuste täitmiseks</li>
                </ul>
            </section>

            <section>
                <h2>4. Teie õigused</h2>
                <p>GDPR alusel on teil järgmised õigused:</p>
                <ul>
                    <li><strong>Juurdepääsuõigus:</strong> õigus saada koopia oma andmetest</li>
                    <li><strong>Parandamisõigus:</strong> õigus parandada ebatäpseid andmeid</li>
                    <li><strong>Kustutamisõigus:</strong> õigus nõuda andmete kustutamist</li>
                    <li><strong>Andmete ülekandmise õigus:</strong> õigus saada oma andmed masinloetaval kujul</li>
                    <li><strong>Vastuväite esitamise õigus:</strong> õigus esitada vastuväide andmete töötlemisele</li>
                </ul>
                <p>
                    Oma andmete ekspordi ja konto kustutamise funktsioonid leiate
                    seadete alt pärast sisselogimist.
                </p>
            </section>

            <section>
                <h2>5. Andmete säilitamine</h2>
                <p>
                    Säilitame teie andmeid nii kaua, kui teil on aktiivne konto. Konto
                    kustutamise taotlusel anonümiseerime teie andmed 30 päeva jooksul.
                </p>
            </section>

            <section>
                <h2>6. Küpsised</h2>
                <p>
                    Kasutame küpsiseid veebisaidi nõuetekohaseks toimimiseks, analüüsiks ja
                    turunduseks. Täpsemat teavet leiate meie{" "}
                    <a href="/cookies" className="text-primary hover:underline">
                        küpsiste poliitikast
                    </a>.
                </p>
            </section>

            <section>
                <h2>7. Kontakt</h2>
                <p>
                    Privaatsusega seotud küsimuste korral võtke ühendust:{" "}
                    <a href="mailto:privacy@kaarplus.ee" className="text-primary hover:underline">
                        privacy@kaarplus.ee
                    </a>
                </p>
            </section>
        </article>
    );
}
