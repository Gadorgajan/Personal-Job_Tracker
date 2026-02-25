import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { KanbanBoard } from "@/components/KanbanBoard";
import { mockApplications } from "@/lib/mock-data";
import { Application, ApplicationStage } from "@/lib/types";
import { AddApplicationDialog } from "@/components/AddApplicationDialog";
import { CsvImportDialog } from "@/components/CsvImportDialog";

const Pipeline = () => {
  const [applications, setApplications] = useState<Application[]>(mockApplications);

  const handleMove = (id: string, newStage: ApplicationStage) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id
          ? { ...app, stage: newStage, lastUpdated: new Date().toISOString().split("T")[0] }
          : app
      )
    );
  };

  const handleAdd = (app: Application) => {
    setApplications((prev) => [app, ...prev]);
  };

  const handleImport = (apps: Application[]) => {
    setApplications((prev) => [...apps, ...prev]);
  };

  return (
    <DashboardLayout
      title="Pipeline"
      subtitle="Drag applications between stages"
      actions={
        <div className="flex gap-2">
          <CsvImportDialog onImport={handleImport} />
          <AddApplicationDialog onAdd={handleAdd} />
        </div>
      }
    >
      <KanbanBoard applications={applications} onMove={handleMove} />
    </DashboardLayout>
  );
};

export default Pipeline;
