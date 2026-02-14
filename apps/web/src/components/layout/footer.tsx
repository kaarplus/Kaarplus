import Link from "next/link";

import { SITE_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-lg font-bold text-primary">{SITE_NAME}</span>
            <p className="text-sm text-muted-foreground">
              Eesti suurim autode ost-müügi platvorm.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Teenused</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/cars" className="hover:text-foreground">Autode otsimine</Link>
              <Link href="/sell" className="hover:text-foreground">Müü auto</Link>
              <Link href="/search/advanced" className="hover:text-foreground">Detailotsing</Link>
            </nav>
          </div>

          {/* Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Info</h3>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link href="/faq" className="hover:text-foreground">KKK</Link>
              <Link href="/terms" className="hover:text-foreground">Kasutustingimused</Link>
              <Link href="/privacy" className="hover:text-foreground">Privaatsuspoliitika</Link>
              <Link href="/cookies" className="hover:text-foreground">Küpsised</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Kontakt</h3>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <a href="mailto:info@kaarplus.ee" className="hover:text-foreground">
                info@kaarplus.ee
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {SITE_NAME}. Kõik õigused kaitstud.</p>
        </div>
      </div>
    </footer>
  );
}
