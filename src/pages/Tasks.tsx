import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { TaskItem } from "@/components/TaskItem";
import { mockTasks } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Tasks = () => {
  const [tasks, setTasks] = useState(mockTasks);
  const [showCompleted, setShowCompleted] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  const pending = tasks.filter((t) => !t.isCompleted).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const completed = tasks.filter((t) => t.isCompleted);

  return (
    <DashboardLayout
      title="Tasks & Reminders"
      subtitle={`${pending.length} pending tasks`}
      actions={
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4 mr-1.5" />
          New Task
        </Button>
      }
    >
      <div className="max-w-2xl space-y-3">
        {pending.map((task) => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} />
        ))}
      </div>

      {completed.length > 0 && (
        <div className="mt-8 max-w-2xl">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
          >
            {showCompleted ? "Hide" : "Show"} completed ({completed.length})
          </button>
          {showCompleted && (
            <div className="space-y-3">
              {completed.map((task) => (
                <TaskItem key={task.id} task={task} onToggle={toggleTask} />
              ))}
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Tasks;
