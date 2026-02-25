import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from "@dnd-kit/core";
import { Application, ApplicationStage, STAGE_ORDER, STAGE_LABELS } from "@/lib/types";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanCard } from "./KanbanCard";

interface KanbanBoardProps {
  applications: Application[];
  onMove: (id: string, newStage: ApplicationStage) => void;
}

export function KanbanBoard({ applications, onMove }: KanbanBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const columns = STAGE_ORDER.map((stage) => ({
    stage,
    label: STAGE_LABELS[stage],
    items: applications.filter((app) => app.stage === stage),
  }));

  const activeApp = activeId ? applications.find((a) => a.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    // handled on end
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const overId = over.id as string;
    // Over ID is either a stage name or an application id
    let targetStage: ApplicationStage | undefined;

    if (STAGE_ORDER.includes(overId as ApplicationStage)) {
      targetStage = overId as ApplicationStage;
    } else {
      const overApp = applications.find((a) => a.id === overId);
      targetStage = overApp?.stage;
    }

    if (targetStage) {
      onMove(active.id as string, targetStage);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <KanbanColumn key={col.stage} stage={col.stage} label={col.label} count={col.items.length}>
            {col.items.map((app) => (
              <KanbanCard key={app.id} application={app} />
            ))}
          </KanbanColumn>
        ))}
      </div>

      <DragOverlay>
        {activeApp ? <KanbanCard application={activeApp} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
