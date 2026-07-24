import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { AppTopbar } from "@/components/app-topbar";
import { KpiCard } from "@/components/kpi-card";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { kpis, revenueSeries, channelSplit, categoryPerformance, insights } from "@/lib/mock-data";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Prism AI" }, { name: "description", content: "Your data at a glance." }] }),
  component: Dashboard,
});

const CHART_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"];

function Dashboard() {
  return (
    <>
      <AppTopbar title="Dashboard" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => <KpiCard key={k.label} {...k} />)}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold">Revenue vs Forecast</h3>
                <p className="text-xs text-muted-foreground">Last 12 months</p>
              </div>
              <Badge variant="secondary">Monthly</Badge>
            </div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="var(--chart-2)" strokeWidth={3} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="forecast" stroke="var(--chart-4)" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 shadow-soft">
            <h3 className="font-display text-lg font-semibold">Traffic mix</h3>
            <p className="text-xs text-muted-foreground">By acquisition channel</p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={channelSplit} dataKey="value" innerRadius={50} outerRadius={90} paddingAngle={3}>
                    {channelSplit.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2">
              {channelSplit.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                    {c.name}
                  </div>
                  <span className="text-muted-foreground">{c.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2 shadow-soft">
            <h3 className="font-display text-lg font-semibold">Category performance</h3>
            <p className="text-xs text-muted-foreground">Sales vs returns</p>
            <div className="h-72 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="category" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="sales" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="returns" fill="var(--chart-2)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 shadow-soft">
            <div className="flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-sunset shadow-glow">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold">AI Insights</h3>
            </div>
            <div className="mt-4 space-y-3">
              {insights.map((i) => (
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
      </div>
    </>
  );
}
