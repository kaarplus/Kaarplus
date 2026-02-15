import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Lemmikud | Kaarplus",
    robots: {
        index: false,
        follow: false,
    },
};

export function FavoritesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

export default FavoritesLayout;
