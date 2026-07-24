import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Send, Sparkles, User } from "lucide-react";
import { AppTopbar } from "@/components/app-topbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { chatSamples } from "@/lib/mock-data";

type Msg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/app/chat")({
  head: () => ({ meta: [{ title: "AI Chat — Prism AI" }, { name: "description", content: "Ask questions of your data in plain English." }] }),
  component: Chat,
});

const SUGGESTIONS = [
  "Which product category grew fastest last quarter?",
  "Forecast revenue for next 3 months",
  "Show customers at risk of churn",
  "Compare CAC across channels",
];

function Chat() {
  const [messages, setMessages] = useState<Msg[]>(chatSamples);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, {
        role: "assistant",
        content: "Here's what I found in your data:\n\n- Revenue trending **+12.4%** YoY\n- Top segment: **Enterprise** (34% of MRR)\n- Anomaly: Electronics returns spiked on Nov 28\n\nWant me to generate a report with this breakdown?",
      }]);
      setThinking(false);
    }, 900);
  };

  return (
    <>
      <AppTopbar title="AI Chat" />
      <div className="flex h-[calc(100vh-3.5rem)] flex-col">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 animate-fade-up ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "assistant" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sunset shadow-glow">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className={m.role === "user" ? "max-w-[80%] rounded-2xl bg-sunset px-4 py-2.5 text-white shadow-glow" : "max-w-[80%]"}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
                </div>
                {m.role === "user" && (
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sunset shadow-glow">
                  <Sparkles className="h-4 w-4 text-white animate-pulse" />
                </div>
                <div className="text-sm text-muted-foreground">Analyzing your data…</div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t bg-background/80 backdrop-blur">
          <div className="mx-auto max-w-3xl p-4">
            {messages.length <= 2 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <Card key={s} onClick={() => send(s)} className="cursor-pointer px-3 py-2 text-xs shadow-soft hover:bg-accent hover:text-accent-foreground">
                    {s}
                  </Card>
                ))}
              </div>
            )}
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything about your data…"
                className="h-11"
              />
              <Button type="submit" className="h-11 bg-sunset text-white shadow-glow hover:opacity-90">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
