import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Check, Calendar, Briefcase } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

const typeColors: Record<string, string> = {
  interview: "border-l-[hsl(var(--stage-interview))]",
  "follow-up": "border-l-[hsl(var(--stage-applied))]",
  preparation: "border-l-[hsl(var(--chart-5))]",
  other: "border-l-muted-foreground",
};

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const isOverdue = !task.isCompleted && new Date(task.dueDate) < new Date();

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-l-4 bg-card p-4 transition-all hover:shadow-sm",
        typeColors[task.type],
        task.isCompleted && "opacity-50"
      )}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={cn(
          "mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          task.isCompleted
            ? "border-accent bg-accent text-accent-foreground"
            : "border-muted-foreground/30 hover:border-accent"
        )}
      >
        {task.isCompleted && <Check className="h-3 w-3" />}
      </button>
      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium text-foreground", task.isCompleted && "line-through")}>
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
        )}
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          {task.companyName && (
            <span className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {task.companyName}
            </span>
          )}
          <span className={cn("flex items-center gap-1", isOverdue && "text-destructive font-medium")}>
            <Calendar className="h-3 w-3" />
            {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </span>
        </div>
      </div>
    </div>
  );
}
