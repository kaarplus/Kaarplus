"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api-client";

const passwordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function PasswordSettings() {
    const { t } = useTranslation('dashboard');
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: PasswordFormValues) {
        setIsLoading(true);
        try {
            await apiFetch("/auth/change-password", {
                method: "POST",
                body: JSON.stringify({
                    currentPassword: data.currentPassword,
                    newPassword: data.newPassword,
                }),
            });

            toast({
                title: t('settings.security.password.success', { defaultValue: 'Password changed' }),
                description: t('settings.security.password.successDesc', { defaultValue: 'Your password has been successfully updated' }),
            });

            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                title: t('settings.security.password.error', { defaultValue: 'Failed to change password' }),
                description: error instanceof Error ? error.message : t('settings.security.password.errorDesc', { defaultValue: 'Please check your current password and try again' }),
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card className="rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-slate-50 text-slate-500">
                    <Shield className="size-5" />
                </div>
                <h2 className="text-lg font-semibold text-foreground">
                    {t('settings.security.title', { defaultValue: 'Security' })}
                </h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('settings.security.password.current', { defaultValue: 'Current Password' })}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('settings.security.password.new', { defaultValue: 'New Password' })}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{t('settings.security.password.confirm', { defaultValue: 'Confirm New Password' })}</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {t('settings.security.password.submit', { defaultValue: 'Update Password' })}
                    </Button>
                </form>
            </Form>
        </Card>
    );
}
