import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Bot, Database, LineChart, Sparkles, Zap, ShieldCheck, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prism AI — Turn data into decisions" },
      { name: "description", content: "Upload CSV or Excel, chat with your data, and get AI-generated insights, forecasts and reports." },
      { property: "og:title", content: "Prism AI — Turn data into decisions" },
      { property: "og:description", content: "AI-powered analytics for modern teams." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-warm opacity-20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[600px] rounded-full bg-sunset opacity-10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b bg-background/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sunset shadow-glow">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display text-lg font-bold">Prism AI</span>
          </div>
          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
            <a href="#insights" className="text-muted-foreground hover:text-foreground">Insights</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/login"><Button variant="ghost" size="sm">Log in</Button></Link>
            <Link to="/register"><Button size="sm" className="bg-sunset text-white shadow-glow hover:opacity-90">Get started</Button></Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-20 text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs backdrop-blur animate-fade-up">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>New — Natural language forecasting</span>
        </div>
        <h1 className="mx-auto mt-6 max-w-4xl font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl animate-fade-up">
          Turn spreadsheets into <span className="text-sunset">superpowers.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground animate-fade-up">
          Upload CSV or Excel, ask questions in plain English, and get AI-generated dashboards, forecasts, and executive-ready reports.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 animate-fade-up">
          <Link to="/register">
            <Button size="lg" className="bg-sunset text-white shadow-glow hover:opacity-90">
              Start free trial <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link to="/app/dashboard">
            <Button size="lg" variant="outline">View live demo</Button>
          </Link>
        </div>

        <div className="mt-16 mx-auto max-w-5xl animate-float-slow">
          <Card className="overflow-hidden border-2 shadow-glow">
            <div className="bg-warm p-1">
              <div className="rounded-md bg-card p-6">
                <div className="grid grid-cols-4 gap-4">
                  {["Revenue", "Customers", "AOV", "Anomalies"].map((k, i) => (
                    <div key={k} className="rounded-lg border bg-background p-4 text-left">
                      <div className="text-[10px] uppercase text-muted-foreground">{k}</div>
                      <div className="mt-1 font-display text-2xl font-bold">
                        {["$1.24M", "8,412", "$148", "6"][i]}
                      </div>
                      <div className="mt-1 text-xs text-emerald-500">+{[12.4, 4.1, 1.8, 2][i]}%</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-48 rounded-lg bg-gradient-to-br from-orange-500/10 via-pink-500/10 to-purple-500/10 flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-primary/40" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-bold">Everything you need to analyze data</h2>
          <p className="mt-3 text-muted-foreground">From upload to insight in under a minute.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { icon: Database, title: "Upload anything", desc: "CSV, Excel, or connect a source. We handle schema detection automatically." },
            { icon: Bot, title: "Chat with your data", desc: "Ask questions in plain English. Get charts, tables and explanations instantly." },
            { icon: LineChart, title: "Forecast the future", desc: "AI models project revenue, churn and demand with confidence intervals." },
            { icon: Zap, title: "Anomaly detection", desc: "Automatically flags outliers and unusual patterns before they hurt you." },
            { icon: FileText, title: "One-click reports", desc: "Export beautiful PDFs, Excel, or CSV branded for your stakeholders." },
            { icon: ShieldCheck, title: "Enterprise-grade", desc: "SOC2, SSO, and role-based access to keep your data safe." },
          ].map((f) => (
            <Card key={f.title} className="p-6 shadow-soft transition-transform hover:-translate-y-1">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-warm text-white shadow-glow">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-4xl px-6 py-24 text-center">
        <div className="rounded-3xl bg-sunset p-12 text-white shadow-glow">
          <BarChart3 className="mx-auto h-10 w-10" />
          <h2 className="mt-4 font-display text-4xl font-bold">Start analyzing in seconds</h2>
          <p className="mt-3 opacity-90">14-day free trial. No credit card required.</p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="mt-6">Get started free <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </div>
      </section>

      <footer className="border-t">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 text-sm text-muted-foreground">
          <div>© 2026 Prism AI</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
