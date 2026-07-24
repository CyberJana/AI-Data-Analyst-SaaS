import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppTopbar } from "@/components/app-topbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/profile")({
  head: () => ({ meta: [{ title: "Profile — Prism AI" }, { name: "description", content: "Manage your profile." }] }),
  component: Profile,
});

function Profile() {
  return (
    <>
      <AppTopbar title="Profile" />
      <div className="p-6 max-w-3xl space-y-6">
        <Card className="p-6 shadow-soft">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-sunset text-white font-display text-xl">AK</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-display text-xl font-semibold">Alex Kim</h2>
              <p className="text-sm text-muted-foreground">alex@acme.com</p>
              <div className="mt-2 flex gap-2">
                <Badge className="bg-sunset text-white">Business plan</Badge>
                <Badge variant="secondary">Admin</Badge>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 shadow-soft space-y-4">
          <h3 className="font-display text-lg font-semibold">Personal information</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>First name</Label><Input defaultValue="Alex" /></div>
            <div className="space-y-2"><Label>Last name</Label><Input defaultValue="Kim" /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Email</Label><Input defaultValue="alex@acme.com" type="email" /></div>
            <div className="space-y-2 sm:col-span-2"><Label>Job title</Label><Input defaultValue="Head of Analytics" /></div>
          </div>
          <Button className="bg-sunset text-white shadow-glow hover:opacity-90" onClick={() => toast.success("Profile updated")}>Save changes</Button>
        </Card>

        <Card className="p-6 shadow-soft space-y-4">
          <h3 className="font-display text-lg font-semibold">Change password</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2"><Label>Current password</Label><Input type="password" /></div>
            <div className="space-y-2"><Label>New password</Label><Input type="password" /></div>
          </div>
          <Button variant="outline" onClick={() => toast.success("Password updated")}>Update password</Button>
        </Card>
      </div>
    </>
  );
}
