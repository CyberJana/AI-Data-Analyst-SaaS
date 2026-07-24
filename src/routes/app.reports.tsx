import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { FileText, FileSpreadsheet, FileType2, Plus, Download } from "lucide-react";
import { AppTopbar } from "@/components/app-topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { reports } from "@/lib/mock-data";

export const Route = createFileRoute("/app/reports")({
  head: () => ({ meta: [{ title: "Reports — Prism AI" }, { name: "description", content: "Generate and export analytics reports." }] }),
  component: Reports,
});

const TEMPLATES = [
  { name: "Executive Summary", desc: "One-page overview of KPIs, trends and anomalies", icon: FileText },
  { name: "Cohort Analysis", desc: "Retention, LTV, and expansion by cohort", icon: FileSpreadsheet },
  { name: "Forecast Report", desc: "Revenue & demand projection with scenarios", icon: FileType2 },
];

function Reports() {
  const download = (fmt: string) => toast.success(`Exporting to ${fmt}…`);
  return (
    <>
      <AppTopbar title="Reports" />
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {TEMPLATES.map((t) => (
            <Card key={t.name} className="p-5 shadow-soft transition-transform hover:-translate-y-1">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-warm text-white shadow-glow">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{t.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
              <Button size="sm" className="mt-4 bg-sunset text-white shadow-glow hover:opacity-90" onClick={() => toast.success(`Generating ${t.name}…`)}>
                <Plus className="mr-1.5 h-3.5 w-3.5" />Generate
              </Button>
            </Card>
          ))}
        </div>

        <Card className="p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-semibold">Recent reports</h3>
              <p className="text-xs text-muted-foreground">Export in PDF, Excel or CSV</p>
            </div>
          </div>
          <div className="mt-4 divide-y">
            {reports.map((r) => (
              <div key={r.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warm/20 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.period} · Generated {r.generated}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{r.format}</Badge>
                  <Button size="sm" variant="outline" onClick={() => download("PDF")}><Download className="mr-1.5 h-3.5 w-3.5" />PDF</Button>
                  <Button size="sm" variant="outline" onClick={() => download("Excel")}><Download className="mr-1.5 h-3.5 w-3.5" />Excel</Button>
                  <Button size="sm" variant="outline" onClick={() => download("CSV")}><Download className="mr-1.5 h-3.5 w-3.5" />CSV</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
