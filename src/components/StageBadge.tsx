import { ApplicationStage, STAGE_LABELS } from "@/lib/types";
import { cn } from "@/lib/utils";

const stageStyles: Record<ApplicationStage, string> = {
  draft: "bg-[hsl(var(--stage-draft))] text-[hsl(var(--stage-draft-foreground))]",
  applied: "bg-[hsl(var(--stage-applied))] text-[hsl(var(--stage-applied-foreground))]",
  interview: "bg-[hsl(var(--stage-interview))] text-[hsl(var(--stage-interview-foreground))]",
  offer: "bg-[hsl(var(--stage-offer))] text-[hsl(var(--stage-offer-foreground))]",
  rejected: "bg-[hsl(var(--stage-rejected))] text-[hsl(var(--stage-rejected-foreground))]",
};

interface StageBadgeProps {
  stage: ApplicationStage;
  className?: string;
}

export function StageBadge({ stage, className }: StageBadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", stageStyles[stage], className)}>
      {STAGE_LABELS[stage]}
    </span>
  );
}
