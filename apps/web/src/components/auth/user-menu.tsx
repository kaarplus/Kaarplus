"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  User,
  Heart,
  MessageSquare,
  LayoutDashboard,
  Settings,
  LogOut,
  Car,
  Shield,
} from "lucide-react";

export function UserMenu() {
  const { data: session, status } = useSession();
  const { t } = useTranslation('common');

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <Button variant="ghost" size="sm" disabled className="gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </Button>
    );
  }

  // Not authenticated - show login button
  if (status === "unauthenticated" || !session?.user) {
    return (
      <Button variant="ghost" size="sm" asChild className="hidden sm:flex gap-2">
        <Link href="/login">
          <User className="h-4 w-4" />
          {t('nav.login')}
        </Link>
      </Button>
    );
  }

  const user = session.user;
  const userRole = (user as { role?: string }).role;
  const userInitials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : user.email?.[0].toUpperCase() || "U";

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const isAdmin = userRole === "ADMIN" || userRole === "SUPPORT";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2 pl-2 pr-3">
          <Avatar className="h-7 w-7">
            <AvatarImage src={user.image || undefined} alt={user.name || user.email || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
              {userInitials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline max-w-[100px] truncate">
            {user.name || user.email?.split("@")[0]}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" />
            {t('nav.dashboard')}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/favorites" className="cursor-pointer flex items-center gap-2">
            <Heart className="h-4 w-4" />
            {t('nav.favorites')}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/messages" className="cursor-pointer flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            {t('nav.messages')}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/listings" className="cursor-pointer flex items-center gap-2">
            <Car className="h-4 w-4" />
            {t('nav.listings')}
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings" className="cursor-pointer flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t('nav.profile')}
          </Link>
        </DropdownMenuItem>

        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/admin" className="cursor-pointer flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {t('nav.admin')}
              </Link>
            </DropdownMenuItem>
          </>
        )}

        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={handleLogout}
          className="cursor-pointer text-destructive focus:text-destructive flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          {t('nav.logout')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
