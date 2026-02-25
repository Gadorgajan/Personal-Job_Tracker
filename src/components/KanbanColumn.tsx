import { useDroppable } from "@dnd-kit/core";
import { ApplicationStage } from "@/lib/types";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  stage: ApplicationStage;
  label: string;
  count: number;
  children: React.ReactNode;
}

const stageDotColors: Record<ApplicationStage, string> = {
  draft: "bg-muted-foreground",
  applied: "bg-[hsl(var(--stage-applied))]",
  interview: "bg-[hsl(var(--stage-interview))]",
  offer: "bg-[hsl(var(--stage-offer))]",
  rejected: "bg-[hsl(var(--stage-rejected))]",
};

export function KanbanColumn({ stage, label, count, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex-shrink-0 w-72 flex flex-col rounded-xl bg-muted/50 p-3 transition-colors",
        isOver && "bg-accent/10 ring-2 ring-accent/30"
      )}
    >
      <div className="flex items-center gap-2 px-1 pb-3">
        <div className={cn("h-2.5 w-2.5 rounded-full", stageDotColors[stage])} />
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-2 min-h-[120px]">
        {children}
      </div>
    </div>
  );
}
