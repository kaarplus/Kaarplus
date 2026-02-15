import type { Metadata } from "next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { generateFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
    title: "Korduma kippuvad küsimused",
    description: "Kaarplus KKK — vastused kõige sagedamini esitatud küsimustele auto ostmise ja müümise kohta.",
};

const faqs = [
    {
        question: "Kuidas ma saan oma autot müüa?",
        answer: "Logige sisse, vajutage päises nuppu \"Lisa kuulutus\" ja täitke 4-sammuline vorm: valige sõiduki tüüp, sisestage andmed, laadige fotod üles ja kinnitage. Meie meeskond kontrollib kuulutuse enne avaldamist.",
    },
    {
        question: "Kui palju maksab kuulutuse lisamine?",
        answer: "Eraisikutele on esimese kuulutuse lisamine tasuta. Eraisik saab omada kuni 5 aktiivset kuulutust. Edasimüüjad saavad piiramatu arvu kuulutusi tasulise paketiga.",
    },
    {
        question: "Kui kaua võtab kuulutuse kontroll aega?",
        answer: "Tavaliselt kontrollime kuulutused 24 tunni jooksul. Nädalavahetustel ja pühade ajal võib see võtta kuni 48 tundi.",
    },
    {
        question: "Kas Kaarplus pakub garantiid?",
        answer: "Kaarplus on vahendusplatvorm. Me pakume sõiduki taustakontrolli ja vahendame garantiipakkumisi koostööpartneritelt, kuid ei ole ostu-müügi lepingu osapool.",
    },
    {
        question: "Kuidas saan ostjana müüjaga ühendust võtta?",
        answer: "Avage sõiduki kuulutus ja vajutage nuppu \"Võta ühendust\". Saate saata sõnumi otse läbi platvormi.",
    },
    {
        question: "Mis valuutas hinnad kuvatakse?",
        answer: "Kõik hinnad kuvatakse eurodes (EUR). Iga hinna juures on näidatud, kas hind sisaldab käibemaksu (KM-ga) või mitte (KM-ta).",
    },
    {
        question: "Kuidas saan oma andmeid eksportida?",
        answer: "Logige sisse ja minge seadete alla. Seal leiate \"Andmete eksport\" nupu, mis laadib alla JSON-faili kõigi teie isikuandmete ja kuulutustega.",
    },
    {
        question: "Kuidas saan oma konto kustutada?",
        answer: "Logige sisse ja minge seadete alla. Vajutage \"Kustuta konto\" nuppu. Teie andmed anonümiseeritakse 30 päeva jooksul.",
    },
];

export default function FaqPage() {
    const faqJsonLd = generateFaqJsonLd(faqs);

    return (
        <article>
            <JsonLd data={faqJsonLd} />
            <h1 className="text-3xl font-bold tracking-tight mb-2">
                Korduma kippuvad küsimused
            </h1>
            <p className="text-muted-foreground mb-8">
                Leidke vastused enamlevinud küsimustele auto ostmise ja müümise kohta.
            </p>

            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-base">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </article>
    );
}
