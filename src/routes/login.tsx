import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Log in — Prism AI" }, { name: "description", content: "Sign in to your Prism AI workspace." }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="hidden bg-sunset p-12 text-white md:flex md:flex-col md:justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5" />
          <span className="font-display font-bold">Prism AI</span>
        </Link>
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">
            "We replaced three BI tools with Prism AI in a week."
          </h2>
          <p className="mt-4 opacity-90">— Sara Chen, Head of Ops at Northwind</p>
        </div>
        <div className="text-xs opacity-70">© 2026 Prism AI</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <Card className="w-full max-w-sm p-8 shadow-soft">
          <h1 className="font-display text-2xl font-bold">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Log in to your workspace</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => { toast.success("Welcome back!"); navigate({ to: "/app/dashboard" }); }, 600);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-sunset text-white shadow-glow hover:opacity-90" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            No account? <Link to="/register" className="font-medium text-foreground hover:underline">Create one</Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
