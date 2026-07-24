import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { AlertTriangle, Search, TrendingUp, Sparkles } from "lucide-react";
import { AppTopbar } from "@/components/app-topbar";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { revenueSeries, categoryPerformance, insights, tableRows } from "@/lib/mock-data";

export const Route = createFileRoute("/app/analytics")({
  head: () => ({ meta: [{ title: "Analytics — Prism AI" }, { name: "description", content: "Trends, anomalies and forecasts." }] }),
  component: Analytics,
});

// Forecast series
const forecastFuture = [
  { month: "Jan", low: 178000, mid: 195000, high: 212000 },
  { month: "Feb", low: 182000, mid: 202000, high: 224000 },
  { month: "Mar", low: 190000, mid: 214000, high: 240000 },
  { month: "Apr", low: 194000, mid: 220000, high: 248000 },
];

const anomalies = [
  { date: "Nov 28", metric: "Refund rate", value: "8.2%", expected: "3.1%", severity: "high" },
  { date: "Dec 3", metric: "Signups", value: "412", expected: "220", severity: "medium" },
  { date: "Dec 12", metric: "Cart abandonment", value: "71%", expected: "58%", severity: "medium" },
  { date: "Dec 18", metric: "Support tickets", value: "148", expected: "62", severity: "high" },
];

function Analytics() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const filteredTable = useMemo(
    () => tableRows.filter((r) =>
      (r.customer.toLowerCase().includes(q.toLowerCase()) || r.email.toLowerCase().includes(q.toLowerCase())) &&
      (status === "all" || r.status === status)
    ),
    [q, status]
  );

  return (
    <>
      <AppTopbar title="Analytics" />
      <div className="p-6 space-y-6">
        <Tabs defaultValue="trends">
          <TabsList>
            <TabsTrigger value="trends"><TrendingUp className="mr-1.5 h-3.5 w-3.5" />Trends</TabsTrigger>
            <TabsTrigger value="forecast"><Sparkles className="mr-1.5 h-3.5 w-3.5" />Forecasting</TabsTrigger>
            <TabsTrigger value="anomalies"><AlertTriangle className="mr-1.5 h-3.5 w-3.5" />Anomalies</TabsTrigger>
            <TabsTrigger value="explorer">Data explorer</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-4">
            <Card className="p-5 shadow-soft">
              <h3 className="font-display text-lg font-semibold">Revenue trend</h3>
              <div className="h-80 mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueSeries}>
                    <defs>
                      <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Area type="monotone" dataKey="revenue" stroke="var(--chart-2)" strokeWidth={2} fill="url(#rev)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-5 shadow-soft">
                <h3 className="font-display text-lg font-semibold">Category sales</h3>
                <div className="h-64 mt-2">
                  <ResponsiveContainer>
                    <BarChart data={categoryPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                      <XAxis dataKey="category" stroke="var(--muted-foreground)" fontSize={12} />
                      <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                      <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                      <Bar dataKey="sales" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              <Card className="p-5 shadow-soft">
                <h3 className="font-display text-lg font-semibold">AI narrative</h3>
                <div className="mt-3 space-y-3">
                  {insights.slice(0, 3).map((i) => (
                    <div key={i.title} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <div className="text-sm font-medium">{i.title}</div>
                        <Badge variant="outline" className="text-[10px]">{i.tag}</Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{i.body}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecast">
            <Card className="p-5 shadow-soft">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-semibold">Revenue forecast — next 4 months</h3>
                  <p className="text-xs text-muted-foreground">Projected with 95% confidence band</p>
                </div>
                <Badge className="bg-sunset text-white">+12% expected</Badge>
              </div>
              <div className="h-80 mt-4">
                <ResponsiveContainer>
                  <LineChart data={forecastFuture}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                    <Legend />
                    <Line type="monotone" dataKey="high" stroke="var(--chart-3)" strokeDasharray="4 4" strokeWidth={2} />
                    <Line type="monotone" dataKey="mid" stroke="var(--chart-2)" strokeWidth={3} />
                    <Line type="monotone" dataKey="low" stroke="var(--chart-4)" strokeDasharray="4 4" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="anomalies">
            <Card className="p-5 shadow-soft">
              <h3 className="font-display text-lg font-semibold">Detected anomalies</h3>
              <div className="mt-4 space-y-2">
                {anomalies.map((a, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${a.severity === "high" ? "bg-destructive/10 text-destructive" : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"}`}>
                        <AlertTriangle className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{a.metric}</div>
                        <div className="text-xs text-muted-foreground">{a.date} · observed {a.value} vs expected {a.expected}</div>
                      </div>
                    </div>
                    <Badge variant={a.severity === "high" ? "destructive" : "secondary"}>{a.severity}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="explorer">
            <Card className="p-5 shadow-soft">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-64">
                  <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search customers…" className="pl-8" value={q} onChange={(e) => setQ(e.target.value)} />
                </div>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Trial">Trial</SelectItem>
                    <SelectItem value="Churned">Churned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>MRR</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Country</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTable.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>
                        <div className="font-medium">{r.customer}</div>
                        <div className="text-xs text-muted-foreground">{r.email}</div>
                      </TableCell>
                      <TableCell>{r.plan}</TableCell>
                      <TableCell>${r.mrr.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === "Active" ? "default" : r.status === "Trial" ? "secondary" : "destructive"}>{r.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{r.country}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
