import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Application, ApplicationStage } from "@/lib/types";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CsvImportDialogProps {
  onImport: (apps: Application[]) => void;
}

const REQUIRED_HEADERS = ["jobTitle", "companyName", "location"];
const VALID_STAGES: ApplicationStage[] = ["draft", "applied", "interview", "offer", "rejected"];
const VALID_TYPES = ["remote", "hybrid", "onsite"];

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

export function CsvImportDialog({ onImport }: CsvImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState<Application[] | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [fileName, setFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const resetState = () => {
    setPreview(null);
    setErrors([]);
    setFileName("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      const lines = text.split(/\r?\n/).filter((l) => l.trim());
      if (lines.length < 2) {
        setErrors(["CSV must have a header row and at least one data row."]);
        setPreview(null);
        return;
      }

      const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase().replace(/\s+/g, ""));
      const headerMap: Record<string, number> = {};
      headers.forEach((h, i) => (headerMap[h] = i));

      const missing = REQUIRED_HEADERS.filter((h) => !(h.toLowerCase() in headerMap));
      if (missing.length) {
        setErrors([`Missing required columns: ${missing.join(", ")}. Required: jobTitle, companyName, location`]);
        setPreview(null);
        return;
      }

      const apps: Application[] = [];
      const errs: string[] = [];

      for (let i = 1; i < lines.length; i++) {
        const cols = parseCsvLine(lines[i]);
        const get = (key: string) => cols[headerMap[key.toLowerCase()]]?.trim() || "";

        const jobTitle = get("jobtitle");
        const companyName = get("companyname");
        const location = get("location");

        if (!jobTitle || !companyName || !location) {
          errs.push(`Row ${i + 1}: Missing required field(s)`);
          continue;
        }

        let stage: ApplicationStage = "draft";
        const rawStage = get("stage")?.toLowerCase();
        if (rawStage && VALID_STAGES.includes(rawStage as ApplicationStage)) {
          stage = rawStage as ApplicationStage;
        }

        let type: "remote" | "hybrid" | "onsite" = "remote";
        const rawType = get("type")?.toLowerCase();
        if (rawType && VALID_TYPES.includes(rawType)) {
          type = rawType as typeof type;
        }

        const now = new Date().toISOString().split("T")[0];
        apps.push({
          id: crypto.randomUUID(),
          jobId: crypto.randomUUID(),
          companyId: crypto.randomUUID(),
          stage,
          appliedDate: get("applieddate") || (stage !== "draft" ? now : undefined),
          lastUpdated: now,
          createdAt: now,
          jobTitle,
          companyName,
          location,
          salary: get("salary") || undefined,
          type,
        });
      }

      setPreview(apps);
      setErrors(errs);
    };
    reader.readAsText(file);
  };

  const handleImport = () => {
    if (!preview?.length) return;
    onImport(preview);
    toast({ title: "Import successful", description: `${preview.length} application(s) imported.` });
    setOpen(false);
    resetState();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetState(); }}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-1.5" />
          Import CSV
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Import Applications from CSV</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
            <input ref={fileRef} type="file" accept=".csv" onChange={handleFile} className="hidden" id="csv-upload" />
            <label htmlFor="csv-upload" className="cursor-pointer flex flex-col items-center gap-2">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {fileName || "Click to select a CSV file"}
              </span>
            </label>
          </div>

          <div className="text-xs text-muted-foreground rounded-md bg-muted p-3">
            <p className="font-medium mb-1">Required columns:</p>
            <code>jobTitle, companyName, location</code>
            <p className="mt-1">Optional: <code>stage, type, salary, appliedDate</code></p>
          </div>

          {errors.length > 0 && (
            <div className="text-sm space-y-1">
              {errors.map((err, i) => (
                <div key={i} className="flex items-start gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{err}</span>
                </div>
              ))}
            </div>
          )}

          {preview && preview.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-foreground">
                <CheckCircle2 className="h-4 w-4 text-accent" />
                <span>{preview.length} application(s) ready to import</span>
              </div>
              <div className="max-h-40 overflow-auto rounded-md border text-xs">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50 text-muted-foreground">
                      <th className="px-2 py-1 text-left">Title</th>
                      <th className="px-2 py-1 text-left">Company</th>
                      <th className="px-2 py-1 text-left">Stage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.slice(0, 10).map((app) => (
                      <tr key={app.id} className="border-b last:border-0">
                        <td className="px-2 py-1">{app.jobTitle}</td>
                        <td className="px-2 py-1">{app.companyName}</td>
                        <td className="px-2 py-1 capitalize">{app.stage}</td>
                      </tr>
                    ))}
                    {preview.length > 10 && (
                      <tr><td colSpan={3} className="px-2 py-1 text-muted-foreground">...and {preview.length - 10} more</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => { setOpen(false); resetState(); }}>Cancel</Button>
            <Button onClick={handleImport} disabled={!preview?.length} className="bg-accent text-accent-foreground hover:bg-accent/90">
              Import {preview?.length ? `(${preview.length})` : ""}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
