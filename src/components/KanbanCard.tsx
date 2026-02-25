import { useDraggable } from "@dnd-kit/core";
import { Application } from "@/lib/types";
import { cn } from "@/lib/utils";
import { MapPin, Clock } from "lucide-react";

interface KanbanCardProps {
  application: Application;
  isDragging?: boolean;
}

export function KanbanCard({ application, isDragging }: KanbanCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: application.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const typeLabel = application.type === 'remote' ? '🌍 Remote' : application.type === 'hybrid' ? '🏢 Hybrid' : '📍 Onsite';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "rounded-lg border bg-card p-3.5 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow",
        isDragging && "opacity-50 shadow-lg rotate-2"
      )}
    >
      <p className="text-sm font-semibold text-foreground leading-tight">{application.jobTitle}</p>
      <p className="text-xs text-muted-foreground mt-1">{application.companyName}</p>
      <div className="flex items-center gap-3 mt-2.5 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {application.location}
        </span>
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{typeLabel}</span>
        {application.salary && (
          <span className="text-[10px] font-medium text-foreground">{application.salary}</span>
        )}
      </div>
    </div>
  );
}
