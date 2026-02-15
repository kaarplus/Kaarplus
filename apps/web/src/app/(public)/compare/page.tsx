import type { Metadata } from "next";
import { ComparePageClient } from "@/components/comparison/compare-page-client";

export const metadata: Metadata = {
    title: "Võrdle autosid | Kaarplus",
    description:
        "Võrdle kuni 4 autot kõrvuti. Vaata spetsifikatsioone, varustust ja hindu.",
    openGraph: {
        title: "Võrdle autosid | Kaarplus",
        description:
            "Võrdle kuni 4 autot kõrvuti. Vaata spetsifikatsioone, varustust ja hindu.",
    },
};

export default function ComparePage() {
    return <ComparePageClient />;
}
