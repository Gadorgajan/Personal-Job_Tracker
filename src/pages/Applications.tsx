import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StageBadge } from "@/components/StageBadge";
import { mockApplications } from "@/lib/mock-data";
import { Application, ApplicationStage, STAGE_LABELS, STAGE_ORDER } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AddApplicationDialog } from "@/components/AddApplicationDialog";
import { CsvImportDialog } from "@/components/CsvImportDialog";

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [search, setSearch] = useState("");
  const [filterStage, setFilterStage] = useState<ApplicationStage | "all">("all");

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(search.toLowerCase()) ||
      app.companyName.toLowerCase().includes(search.toLowerCase());
    const matchesStage = filterStage === "all" || app.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const handleAdd = (app: Application) => {
    setApplications((prev) => [app, ...prev]);
  };

  const handleImport = (apps: Application[]) => {
    setApplications((prev) => [...apps, ...prev]);
  };

  return (
    <DashboardLayout
      title="Applications"
      subtitle={`${filtered.length} applications`}
      actions={
        <div className="flex gap-2">
          <CsvImportDialog onImport={handleImport} />
          <AddApplicationDialog onAdd={handleAdd} />
        </div>
      }
    >
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={filterStage === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilterStage("all")}
          >
            All
          </Button>
          {STAGE_ORDER.map((stage) => (
            <Button
              key={stage}
              variant={filterStage === stage ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterStage(stage)}
            >
              {STAGE_LABELS[stage]}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30 text-left text-muted-foreground">
                <th className="px-5 py-3 font-medium">Position</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Location</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Salary</th>
                <th className="px-5 py-3 font-medium">Stage</th>
                <th className="px-5 py-3 font-medium">Applied</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((app) => (
                <tr key={app.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors cursor-pointer">
                  <td className="px-5 py-4 font-medium text-foreground">{app.jobTitle}</td>
                  <td className="px-5 py-4 text-muted-foreground">{app.companyName}</td>
                  <td className="px-5 py-4 text-muted-foreground">{app.location}</td>
                  <td className="px-5 py-4 text-muted-foreground capitalize">{app.type}</td>
                  <td className="px-5 py-4 text-muted-foreground">{app.salary || "—"}</td>
                  <td className="px-5 py-4"><StageBadge stage={app.stage} /></td>
                  <td className="px-5 py-4 text-muted-foreground">
                    {app.appliedDate ? new Date(app.appliedDate).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Applications;
