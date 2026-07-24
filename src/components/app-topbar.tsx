import { Bell, Search } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { notifications } from "@/lib/mock-data";

export function AppTopbar({ title }: { title: string }) {
  const unread = notifications.filter((n) => n.unread).length;
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur">
      <SidebarTrigger />
      <div className="flex-1">
        <h1 className="font-display text-lg font-semibold">{title}</h1>
      </div>
      <div className="relative hidden md:block">
        <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Ask anything…" className="h-9 w-64 pl-8" />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {unread > 0 && (
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary shadow-glow" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0" align="end">
          <div className="border-b px-4 py-3 flex items-center justify-between">
            <div className="font-semibold text-sm">Notifications</div>
            <Badge variant="secondary">{unread} new</Badge>
          </div>
          <div className="max-h-80 overflow-auto">
            {notifications.map((n) => (
              <div key={n.id} className="border-b px-4 py-3 hover:bg-muted/50 cursor-pointer">
                <div className="flex items-start gap-2">
                  {n.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                    <div className="text-[10px] text-muted-foreground mt-1">{n.time}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <ThemeToggle />
      <Avatar className="h-8 w-8">
        <AvatarFallback className="bg-sunset text-white text-xs">AK</AvatarFallback>
      </Avatar>
    </header>
  );
}
