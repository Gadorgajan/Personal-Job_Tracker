import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { StageBadge } from "@/components/StageBadge";
import { TaskItem } from "@/components/TaskItem";
import { mockApplications, mockTasks, mockAnalytics } from "@/lib/mock-data";
import { Briefcase, TrendingUp, Clock, Award, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const Index = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(mockTasks);

  const upcomingTasks = tasks.filter((t) => !t.isCompleted).slice(0, 3);
  const recentApps = mockApplications
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, 5);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    );
  };

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Your job search at a glance"
      actions={
        <Button onClick={() => navigate("/pipeline")} className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4 mr-1.5" />
          New Application
        </Button>
      }
    >
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Applications" value={mockAnalytics.totalApplications} subtitle="All time" icon={Briefcase} />
        <StatCard label="Interview Rate" value={`${mockAnalytics.interviewRate}%`} subtitle="Applications → Interviews" icon={TrendingUp} trend={{ value: 5, positive: true }} />
        <StatCard label="Avg. Time to Interview" value={`${mockAnalytics.avgTimeToInterview}d`} subtitle="Days from apply" icon={Clock} />
        <StatCard label="Offer Rate" value={`${mockAnalytics.offerRate}%`} subtitle="Applications → Offers" icon={Award} trend={{ value: 2, positive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Weekly Applications</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockAnalytics.weeklyApplications}>
              <XAxis dataKey="week" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Upcoming tasks */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-foreground">Daily Focus</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/tasks")} className="text-xs text-muted-foreground">
              View all
            </Button>
          </div>
          <div className="space-y-3">
            {upcomingTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} />
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Recent Applications</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-muted-foreground">
                <th className="pb-3 font-medium">Position</th>
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Location</th>
                <th className="pb-3 font-medium">Stage</th>
                <th className="pb-3 font-medium">Updated</th>
              </tr>
            </thead>
            <tbody>
              {recentApps.map((app) => (
                <tr key={app.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-3 font-medium text-foreground">{app.jobTitle}</td>
                  <td className="py-3 text-muted-foreground">{app.companyName}</td>
                  <td className="py-3 text-muted-foreground">{app.location}</td>
                  <td className="py-3"><StageBadge stage={app.stage} /></td>
                  <td className="py-3 text-muted-foreground">{new Date(app.lastUpdated).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
