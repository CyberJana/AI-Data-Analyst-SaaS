import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { FileSpreadsheet, MoreHorizontal, Search, Trash2, Upload } from "lucide-react";
import { AppTopbar } from "@/components/app-topbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { datasets } from "@/lib/mock-data";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/datasets")({
  head: () => ({ meta: [{ title: "Datasets — Prism AI" }, { name: "description", content: "Manage your uploaded CSV and Excel files." }] }),
  component: Datasets,
});

function Datasets() {
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const filtered = datasets.filter((d) =>
    d.name.toLowerCase().includes(q.toLowerCase()) && (typeFilter === "all" || d.type === typeFilter)
  );

  return (
    <>
      <AppTopbar title="Datasets" />
      <div className="p-6 space-y-6">
        <Card className="p-8 shadow-soft border-dashed border-2 text-center bg-warm/5">
          <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sunset shadow-glow">
            <Upload className="h-6 w-6 text-white" />
          </div>
          <h3 className="font-display text-xl font-semibold">Upload your data</h3>
          <p className="mt-1 text-sm text-muted-foreground">Drag & drop CSV or Excel files — up to 100MB each.</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button className="bg-sunset text-white shadow-glow hover:opacity-90" onClick={() => toast.success("Upload started (demo)")}>
              <Upload className="mr-2 h-4 w-4" /> Choose files
            </Button>
            <Button variant="outline">Import from URL</Button>
          </div>
        </Card>

        <Card className="p-5 shadow-soft">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-64">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search datasets…" className="pl-8" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All types</SelectItem>
                <SelectItem value="CSV">CSV</SelectItem>
                <SelectItem value="XLSX">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Rows</TableHead>
                <TableHead>Columns</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((d) => (
                <TableRow key={d.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-warm/20 text-primary">
                        <FileSpreadsheet className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-medium">{d.name}</div>
                        <div className="text-xs text-muted-foreground">{d.type}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{d.rows.toLocaleString()}</TableCell>
                  <TableCell>{d.columns}</TableCell>
                  <TableCell>{d.size}</TableCell>
                  <TableCell>
                    <Badge variant={d.status === "ready" ? "default" : d.status === "processing" ? "secondary" : "destructive"}>
                      {d.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{d.uploadedAt}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-3 w-3" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </>
  );
}
