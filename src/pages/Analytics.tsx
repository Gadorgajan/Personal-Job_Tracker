import { DashboardLayout } from "@/components/DashboardLayout";
import { StatCard } from "@/components/StatCard";
import { mockAnalytics } from "@/lib/mock-data";
import { STAGE_LABELS, STAGE_ORDER, ApplicationStage } from "@/lib/types";
import { Briefcase, TrendingUp, Clock, Award } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const stageChartColors: Record<ApplicationStage, string> = {
  draft: "hsl(220 14% 80%)",
  applied: "hsl(217 91% 60%)",
  interview: "hsl(262 83% 58%)",
  offer: "hsl(142 71% 45%)",
  rejected: "hsl(0 72% 51%)",
};

const Analytics = () => {
  const pieData = STAGE_ORDER.map((stage) => ({
    name: STAGE_LABELS[stage],
    value: mockAnalytics.stageDistribution[stage],
    color: stageChartColors[stage],
  }));

  return (
    <DashboardLayout title="Analytics" subtitle="Insights into your job search">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Applications" value={mockAnalytics.totalApplications} icon={Briefcase} />
        <StatCard label="Interview Rate" value={`${mockAnalytics.interviewRate}%`} icon={TrendingUp} trend={{ value: 5, positive: true }} />
        <StatCard label="Avg. Time to Interview" value={`${mockAnalytics.avgTimeToInterview}d`} icon={Clock} />
        <StatCard label="Offer Rate" value={`${mockAnalytics.offerRate}%`} icon={Award} trend={{ value: 2, positive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly throughput */}
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Weekly Throughput</h2>
          <ResponsiveContainer width="100%" height={280}>
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

        {/* Stage distribution */}
        <div className="rounded-xl border bg-card p-5">
          <h2 className="text-sm font-semibold text-foreground mb-4">Stage Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend
                formatter={(value) => <span className="text-xs text-muted-foreground">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Funnel */}
      <div className="mt-6 rounded-xl border bg-card p-5">
        <h2 className="text-sm font-semibold text-foreground mb-4">Conversion Funnel</h2>
        <div className="flex items-end gap-2 h-32">
          {STAGE_ORDER.filter(s => s !== 'rejected').map((stage) => {
            const count = mockAnalytics.stageDistribution[stage];
            const maxCount = Math.max(...Object.values(mockAnalytics.stageDistribution));
            const height = maxCount > 0 ? (count / maxCount) * 100 : 0;
            return (
              <div key={stage} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-foreground">{count}</span>
                <div
                  className="w-full rounded-t-md transition-all"
                  style={{
                    height: `${height}%`,
                    minHeight: "8px",
                    backgroundColor: stageChartColors[stage],
                  }}
                />
                <span className="text-xs text-muted-foreground">{STAGE_LABELS[stage]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
