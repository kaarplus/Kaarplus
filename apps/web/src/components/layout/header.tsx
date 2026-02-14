import Link from "next/link";

import { SITE_NAME } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">{SITE_NAME}</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/cars" className="transition-colors hover:text-primary">
            Autod
          </Link>
          <Link href="/sell" className="transition-colors hover:text-primary">
            Müü auto
          </Link>
          <Link href="/compare" className="transition-colors hover:text-primary">
            Võrdle
          </Link>
        </nav>

        {/* Auth buttons - placeholder, implemented in P1-T05 */}
        <div className="flex items-center space-x-4">
          <Link
            href="/login"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Logi sisse
          </Link>
          <Link
            href="/register"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Registreeri
          </Link>
        </div>
      </div>
    </header>
  );
}
