"use client";

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { StatsCard } from "./stats-card";
import { AnalyticsChart } from "./analytics-charts";
import { Loader2, Users, Car, CheckCircle, Clock, ShoppingCart, DollarSign, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function AnalyticsDashboard() {
    const { data: session } = useSession();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = useCallback(async () => {
        if (!session?.user?.apiToken) return;

        setIsLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/analytics`, {
                headers: {
                    "Authorization": `Bearer ${session.user.apiToken}`,
                },
            });

            if (!res.ok) throw new Error("Viga andmete laadimisel");
            const result = await res.json();
            setData(result.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [session, setIsLoading, setData, setError]);

    useEffect(() => {
        if (session) {
            fetchAnalytics();
        }
    }, [fetchAnalytics, session]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-muted-foreground animate-pulse">Analüütika laadimine...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-8 text-center max-w-lg mx-auto">
                <AlertCircle className="text-destructive mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-destructive">Midagi läks valesti</h3>
                <p className="text-muted-foreground mt-2 mb-6">{error}</p>
                <Button onClick={fetchAnalytics} variant="outline">Proovi uuesti</Button>
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Ülevaade ja Analüütika</h2>
                    <p className="text-muted-foreground mt-1">
                        Platvormi statistika, kasutajad ja finantsnäitajad.
                    </p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchAnalytics}>Värskenda</Button>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Kogutulu"
                    value={`${data.summary.totalRevenue.toLocaleString("et-EE")} €`}
                    icon={DollarSign}
                    description="Kogu teenitud tulu"
                    trend="+12% kuus"
                    trendUp={true}
                />
                <StatsCard
                    title="Aktiivsed kuulutused"
                    value={data.summary.activeListings}
                    icon={Car}
                    description={`${data.summary.totalListings} kokku lisatud`}
                />
                <StatsCard
                    title="Registreeritud kasutajad"
                    value={data.summary.totalUsers}
                    icon={Users}
                    description="+5 täna"
                    trend="+4% nädalas"
                    trendUp={true}
                />
                <StatsCard
                    title="Müüdud sõidukid"
                    value={data.summary.soldListings}
                    icon={ShoppingCart}
                    description="Edukad tehingud"
                />
            </div>

            {/* Charts */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <AnalyticsChart
                        title="Uued kuulutused (30 päeva)"
                        data={data.charts.listings}
                        dataKey="count"
                        color="#0ea5e9"
                    />
                </div>
                <div className="col-span-3">
                    <AnalyticsChart
                        title="Uued kasutajad (30 päeva)"
                        data={data.charts.registrations}
                        dataKey="count"
                        color="#10b981"
                    />
                </div>
            </div>

            {/* Recent Activity Tabs */}
            <Tabs defaultValue="payments" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="payments">Viimased maksed</TabsTrigger>
                    <TabsTrigger value="users">Uued kasutajad</TabsTrigger>
                </TabsList>
                <TabsContent value="payments" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Viimased tehingud</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Kuupäev</TableHead>
                                        <TableHead>Summa</TableHead>
                                        <TableHead>Staatus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.recent.payments.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                                                Tehingud puuduvad
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        data.recent.payments.map((payment: any) => (
                                            <TableRow key={payment.id}>
                                                <TableCell>{new Date(payment.createdAt).toLocaleDateString("et-EE")}</TableCell>
                                                <TableCell className="font-medium">{Number(payment.amount).toLocaleString("et-EE")} {payment.currency}</TableCell>
                                                <TableCell>
                                                    <Badge variant={payment.status === "COMPLETED" ? "default" : "secondary"}>
                                                        {payment.status}
                                                    </Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="users" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Viimati liitunud</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nimi</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Roll</TableHead>
                                        <TableHead>Liitus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.recent.users.map((user: any) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline">{user.role}</Badge>
                                            </TableCell>
                                            <TableCell>{new Date(user.createdAt).toLocaleDateString("et-EE")}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
