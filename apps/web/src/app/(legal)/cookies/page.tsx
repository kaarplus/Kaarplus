import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: "Küpsiste poliitika",
    description: "Kaarplus küpsiste poliitika — milliseid küpsiseid kasutame ja miks.",
};

export default function CookiesPage() {
    return (
        <article className="prose prose-slate max-w-none">
            <h1>Küpsiste poliitika</h1>
            <p className="text-muted-foreground text-lg">
                Kehtiv alates: 1. jaanuar 2026
            </p>

            <Separator className="my-6" />

            <section>
                <h2>1. Mis on küpsised?</h2>
                <p>
                    Küpsised on väikesed tekstifailid, mida veebisait salvestab teie seadmesse.
                    Need aitavad meil pakkuda paremat kasutajakogemust ja analüüsida
                    veebisaidi kasutamist.
                </p>
            </section>

            <section>
                <h2>2. Vajalikud küpsised</h2>
                <p>
                    Need küpsised on hädavajalikud veebisaidi toimimiseks. Neid ei saa keelata.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Küpsis</th>
                            <th>Otstarve</th>
                            <th>Kehtivus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>kaarplus_session</code></td>
                            <td>Kasutaja autentimine</td>
                            <td>Seanss</td>
                        </tr>
                        <tr>
                            <td><code>kaarplus_cookie_consent</code></td>
                            <td>Küpsiste nõusoleku salvestamine</td>
                            <td>1 aasta</td>
                        </tr>
                        <tr>
                            <td><code>csrf_token</code></td>
                            <td>Turvameede vormide kaitsmiseks</td>
                            <td>Seanss</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>3. Analüütilised küpsised</h2>
                <p>
                    Aitavad meil mõista, kuidas külastajad veebisaidiga suhtlevad.
                    Need küpsised koguvad anonüümseid andmeid.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Küpsis</th>
                            <th>Otstarve</th>
                            <th>Kehtivus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>_ga</code></td>
                            <td>Google Analytics — külastajate eristamine</td>
                            <td>2 aastat</td>
                        </tr>
                        <tr>
                            <td><code>_ga_*</code></td>
                            <td>Google Analytics — seansi olek</td>
                            <td>2 aastat</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>4. Turundusküpsised</h2>
                <p>
                    Kasutatakse teile asjakohaste reklaamide kuvamiseks.
                </p>
                <table>
                    <thead>
                        <tr>
                            <th>Küpsis</th>
                            <th>Otstarve</th>
                            <th>Kehtivus</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>_fbp</code></td>
                            <td>Facebook — reklaamide jälgimine</td>
                            <td>3 kuud</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section>
                <h2>5. Küpsiste haldamine</h2>
                <p>
                    Saate oma küpsiste eelistusi igal ajal muuta, vajutades lehe jaluses olevat
                    &quot;Küpsiste seaded&quot; linki. Samuti saate küpsised oma brauseris keelata,
                    kuid see võib mõjutada veebisaidi toimimist.
                </p>
            </section>

            <section>
                <h2>6. Kontakt</h2>
                <p>
                    Küsimuste korral:{" "}
                    <a href="mailto:privacy@kaarplus.ee" className="text-primary hover:underline">
                        privacy@kaarplus.ee
                    </a>
                </p>
            </section>
        </article>
    );
}
