"use client";

import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Bell,
  Shield,
  Download,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

// Mock user data; in production, fetch from API / session
const mockUser = {
  name: "Mart Tamm",
  email: "mart.tamm@email.ee",
  phone: "+372 5555 1234",
};

export function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    messages: true,
    favorites: false,
    marketing: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Seaded</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Halda oma profiili ja eelistusi
        </p>
      </div>

      {/* Profile section */}
      <Card className="rounded-xl border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="size-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Profiili andmed
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="size-4 text-muted-foreground" />
              Nimi
            </Label>
            <Input
              id="name"
              defaultValue={mockUser.name}
              readOnly
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="size-4 text-muted-foreground" />
              E-post
            </Label>
            <Input
              id="email"
              type="email"
              defaultValue={mockUser.email}
              readOnly
              className="bg-muted/30"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="size-4 text-muted-foreground" />
              Telefon
            </Label>
            <Input
              id="phone"
              type="tel"
              defaultValue={mockUser.phone}
              readOnly
              className="bg-muted/30"
            />
          </div>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">
          Profiili muutmiseks pöörduge klienditoe poole.
        </p>
      </Card>

      {/* Notification preferences */}
      <Card className="rounded-xl border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
            <Bell className="size-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Teavituste eelistused
          </h2>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                E-posti teavitused
              </p>
              <p className="text-xs text-muted-foreground">
                Saada teavitusi kuulutuste kohta e-postiga
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={() => toggleNotification("email")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Uued sõnumid
              </p>
              <p className="text-xs text-muted-foreground">
                Teavita mind uutest sõnumitest
              </p>
            </div>
            <Switch
              checked={notifications.messages}
              onCheckedChange={() => toggleNotification("messages")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Lemmikud
              </p>
              <p className="text-xs text-muted-foreground">
                Teavita mind lemmikute hinnamuutustest
              </p>
            </div>
            <Switch
              checked={notifications.favorites}
              onCheckedChange={() => toggleNotification("favorites")}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Turundus
              </p>
              <p className="text-xs text-muted-foreground">
                Saada mulle pakkumisi ja uudiseid
              </p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={() => toggleNotification("marketing")}
            />
          </div>
        </div>
      </Card>

      {/* GDPR section */}
      <Card className="rounded-xl border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-10 items-center justify-center rounded-full bg-amber-50 text-amber-500">
            <Shield className="size-5" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">
            Andmekaitse (GDPR)
          </h2>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Ekspordi oma andmed
              </p>
              <p className="text-xs text-muted-foreground">
                Laadi alla kõik sinu kontoga seotud andmed JSON formaadis
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-4" />
              Ekspordi andmed
            </Button>
          </div>

          <Separator />

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Kustuta konto
              </p>
              <p className="text-xs text-muted-foreground">
                Kustuta oma konto ja kõik sellega seotud andmed jäädavalt
              </p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="mr-2 size-4" />
              Kustuta konto
            </Button>
          </div>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Lisateavet andmetöötluse kohta leiad meie{" "}
          <a href="/privacy" className="text-primary underline hover:no-underline">
            privaatsuspoliitikast
          </a>
          .
        </p>
      </Card>
    </div>
  );
}
