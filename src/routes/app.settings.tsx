import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppTopbar } from "@/components/app-topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/lib/theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — Prism AI" }, { name: "description", content: "Manage workspace and preferences." }] }),
  component: Settings,
});

function Settings() {
  const { theme, toggle } = useTheme();
  return (
    <>
      <AppTopbar title="Settings" />
      <div className="p-6 max-w-4xl">
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card className="p-6 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-semibold">Workspace</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label>Workspace name</Label><Input defaultValue="Acme Analytics" /></div>
                <div className="space-y-2"><Label>Slug</Label><Input defaultValue="acme" /></div>
              </div>
              <Separator />
              <Button className="bg-sunset text-white shadow-glow hover:opacity-90" onClick={() => toast.success("Settings saved")}>Save changes</Button>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="p-6 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-semibold">Appearance</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Dark mode</div>
                  <div className="text-sm text-muted-foreground">Switch between light and dark themes</div>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={toggle} />
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-semibold">Notifications</h3>
              {["Anomaly alerts", "Weekly digest", "New reports", "Product updates"].map((n) => (
                <div key={n} className="flex items-center justify-between">
                  <div className="font-medium text-sm">{n}</div>
                  <Switch defaultChecked />
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="p-6 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-semibold">Billing</h3>
              <div className="rounded-xl bg-sunset p-6 text-white shadow-glow">
                <div className="text-xs uppercase opacity-80">Current plan</div>
                <div className="mt-1 font-display text-2xl font-bold">Business — $89/mo</div>
                <div className="mt-1 text-sm opacity-90">Renews Jan 15, 2026</div>
              </div>
              <Button variant="outline">Manage subscription</Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
