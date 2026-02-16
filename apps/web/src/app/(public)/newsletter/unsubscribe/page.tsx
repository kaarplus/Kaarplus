"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Loader2, Mail } from "lucide-react";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"confirm" | "loading" | "success" | "error">(
    token ? "confirm" : "error"
  );
  const [message, setMessage] = useState(
    token ? "" : "Vigane link. Palun kasutage e-kirjas olevat linki."
  );

  const handleUnsubscribe = async () => {
    if (!token) return;
    setStatus("loading");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(token)}`
      );

      if (res.ok) {
        setStatus("success");
        setMessage(
          "Olete edukalt uudiskirjast lahkunud. Ei saada teile enam e-kirju."
        );
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus("error");
        setMessage(
          data.error || "Midagi läks valesti. Palun proovige uuesti."
        );
      }
    } catch {
      setStatus("error");
      setMessage("Ühenduse viga. Palun proovige uuesti.");
    }
  };

  return (
    <div className="mx-auto max-w-md text-center">
      {status === "confirm" && (
        <div className="space-y-4">
          <Mail className="mx-auto size-16 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Uudiskirjast lahkumine
          </h1>
          <p className="text-muted-foreground">
            Kas olete kindel, et soovite uudiskirjast lahkuda?
          </p>
          <button
            onClick={handleUnsubscribe}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Jah, lahku uudiskirjast
          </button>
        </div>
      )}

      {status === "loading" && (
        <div className="space-y-4">
          <Loader2 className="mx-auto size-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Palun oodake...</p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4">
          <CheckCircle className="mx-auto size-16 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">
            Uudiskirjast lahkumine
          </h1>
          <p className="text-muted-foreground">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4">
          <XCircle className="mx-auto size-16 text-destructive" />
          <h1 className="text-2xl font-bold text-foreground">Viga</h1>
          <p className="text-muted-foreground">{message}</p>
        </div>
      )}
    </div>
  );
}

export default function NewsletterUnsubscribePage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Suspense fallback={
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto size-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Palun oodake...</p>
        </div>
      }>
        <UnsubscribeContent />
      </Suspense>
    </div>
  );
}
