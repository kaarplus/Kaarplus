"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ConsentState {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
}

interface CookieSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    consent: ConsentState;
    onSave: (consent: ConsentState) => void;
    onRejectAll: () => void;
}

export function CookieSettingsModal({
    open,
    onOpenChange,
    consent,
    onSave,
    onRejectAll,
}: CookieSettingsModalProps) {
    const [localConsent, setLocalConsent] = useState<ConsentState>(consent);

    const handleOpenChange = (newOpen: boolean) => {
        if (newOpen) {
            setLocalConsent(consent);
        }
        onOpenChange(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold">
                        Küpsiste eelistused
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    {/* Essential Cookies */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-bold">
                                    Vajalikud küpsised
                                </span>
                                <Badge
                                    variant="secondary"
                                    className="text-[10px] uppercase font-bold"
                                >
                                    Nõutud
                                </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Vajalikud veebisaidi nõuetekohaseks toimimiseks. Neid ei saa
                                keelata.
                            </p>
                        </div>
                        <Switch checked disabled className="cursor-not-allowed" />
                    </div>

                    <Separator />

                    {/* Analytics Cookies */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <span className="text-sm font-bold block mb-1">
                                Analüütilised küpsised
                            </span>
                            <p className="text-xs text-muted-foreground">
                                Aitavad meil mõista, kuidas külastajad meie veebisaidiga
                                suhtlevad, kogudes anonüümseid andmeid.
                            </p>
                        </div>
                        <Switch
                            checked={localConsent.analytics}
                            onCheckedChange={(checked) =>
                                setLocalConsent((prev) => ({ ...prev, analytics: checked }))
                            }
                        />
                    </div>

                    <Separator />

                    {/* Marketing Cookies */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <span className="text-sm font-bold block mb-1">
                                Turundusküpsised
                            </span>
                            <p className="text-xs text-muted-foreground">
                                Kasutatakse külastajate jälgimiseks veebisaitidel, et kuvada
                                asjakohaseid ja kaasahaaravaid reklaame.
                            </p>
                        </div>
                        <Switch
                            checked={localConsent.marketing}
                            onCheckedChange={(checked) =>
                                setLocalConsent((prev) => ({ ...prev, marketing: checked }))
                            }
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            onRejectAll();
                            onOpenChange(false);
                        }}
                        className="text-muted-foreground"
                    >
                        Keeldu kõigist
                    </Button>
                    <Button
                        size="sm"
                        onClick={() =>
                            onSave({ ...localConsent, essential: true })
                        }
                    >
                        Salvesta eelistused
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
