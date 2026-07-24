import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — Prism AI" }, { name: "description", content: "Start your free 14-day trial." }] }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="grid min-h-screen md:grid-cols-2">
      <div className="flex items-center justify-center p-6 order-2 md:order-1">
        <Card className="w-full max-w-sm p-8 shadow-soft">
          <h1 className="font-display text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Free for 14 days. No card required.</p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setLoading(true);
              setTimeout(() => { toast.success("Account created — welcome!"); navigate({ to: "/app/dashboard" }); }, 700);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" placeholder="Ada Lovelace" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="8+ characters" required />
            </div>
            <Button type="submit" className="w-full bg-sunset text-white shadow-glow hover:opacity-90" disabled={loading}>
              {loading ? "Creating account…" : "Create account"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="font-medium text-foreground hover:underline">Log in</Link>
          </div>
        </Card>
      </div>
      <div className="hidden bg-sunset p-12 text-white md:order-2 md:flex md:flex-col md:justify-between">
        <Link to="/" className="flex items-center gap-2 text-white">
          <Sparkles className="h-5 w-5" />
          <span className="font-display font-bold">Prism AI</span>
        </Link>
        <div>
          <h2 className="font-display text-4xl font-bold leading-tight">
            Ship insights, not spreadsheets.
          </h2>
          <p className="mt-4 opacity-90">Join 4,200+ teams already analyzing with Prism AI.</p>
        </div>
        <div className="text-xs opacity-70">© 2026 Prism AI</div>
      </div>
    </div>
  );
}
