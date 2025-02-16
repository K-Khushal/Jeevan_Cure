import { ActivityChart } from "@/components/dashboard/charts/activity-chart";
import { HealthChart } from "@/components/dashboard/charts/health-chart";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 min-h-[100vh]">
      <div>
        <HealthChart />
      </div>
      <div>
        <ActivityChart />
      </div>
    </div>
  );
}
